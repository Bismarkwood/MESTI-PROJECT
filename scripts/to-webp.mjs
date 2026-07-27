/**
 * Convert all raster images to WebP at high quality, then rewrite imports.
 *
 * Why WebP: it keeps full colour resolution (vibrant) and compresses better
 * than JPEG, so images look richer AND load fast. Standard JPEG throws away
 * half the colour detail (4:2:0 chroma), which is what made the previous
 * optimization look flat.
 *
 * Source of truth: for each image we pick the HIGHER-QUALITY source between the
 * current working file and the pre-optimization original in git (commit below).
 * That recovers the images we over-compressed while preserving any newer photos
 * the team added via merge.
 *
 * Usage:  node scripts/to-webp.mjs            (convert + rewrite imports)
 *         node scripts/to-webp.mjs --dry      (report only)
 */
import { readdir, stat, readFile, writeFile, rm } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'

const ASSET_ROOTS = ['src/assets', 'public/assets']
const CODE_ROOTS = ['src']
const ORIGINALS_COMMIT = '3d6c4da' // last commit holding the un-optimized originals
const MAX_DIM = 2048
// WebP keeps full colour resolution at any quality, so vibrancy comes from the
// format itself; 82 is the visual-quality sweet spot with much smaller files.
const QUALITY = 82
const DRY = process.argv.includes('--dry')

const rasterExts = new Set(['.jpg', '.jpeg', '.png'])
const codeExts = new Set(['.ts', '.tsx', '.css'])

async function walk(dir, keep) {
  const out = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.name === 'node_modules') continue
    if (e.isDirectory()) out.push(...(await walk(p, keep)))
    else if (keep(e.name)) out.push(p)
  }
  return out
}

const fmtKB = (b) => `${(b / 1024).toFixed(0)} KB`
const toGitPath = (p) => p.replace(/\\/g, '/')

/** Bytes of this path at the originals commit, or null if not present there. */
function gitOriginal(file) {
  try {
    return execFileSync('git', ['show', `${ORIGINALS_COMMIT}:${toGitPath(file)}`], {
      maxBuffer: 64 * 1024 * 1024,
    })
  } catch {
    return null
  }
}

async function convertImages() {
  const files = []
  for (const root of ASSET_ROOTS) files.push(...(await walk(root, (n) => rasterExts.has(extname(n).toLowerCase()))))

  let before = 0
  let after = 0
  let count = 0

  for (const file of files) {
    const current = await readFile(file)
    const original = gitOriginal(file)
    // Higher-quality source = larger byte size (originals are far bigger than
    // our over-compressed copies; newer merged photos win over stale originals).
    const source = original && original.length > current.length ? original : current
    const sourceLabel = source === original ? 'git-original' : 'current'

    const meta = await sharp(source, { failOn: 'none' }).metadata()
    const needsResize = (meta.width && meta.width > MAX_DIM) || (meta.height && meta.height > MAX_DIM)

    let pipeline = sharp(source, { failOn: 'none' }).rotate()
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    }
    const out = await pipeline.webp({ quality: QUALITY, effort: 6 }).toBuffer()

    const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp')
    before += current.length
    after += out.length
    count++
    console.log(`${DRY ? '[dry] ' : ''}${file} [${sourceLabel}]: ${fmtKB(current.length)} -> ${fmtKB(out.length)} webp`)

    if (!DRY) {
      await writeFile(webpPath, out)
      await rm(file)
    }
  }

  console.log(`\nImages: ${count} converted, ${fmtKB(before)} -> ${fmtKB(after)}`)
}

async function rewriteImports() {
  const files = []
  for (const root of CODE_ROOTS) files.push(...(await walk(root, (n) => codeExts.has(extname(n).toLowerCase()))))

  let changed = 0
  // Rewrite asset references ending in a raster extension. Quote-bounded so it
  // safely handles paths containing parentheses, e.g. ".../(SCiLeD)/....png".
  const re = /(['"][^'"]*assets\/[^'"]*?)\.(jpe?g|png)(['"])/gi

  for (const file of files) {
    const text = await readFile(file, 'utf8')
    if (!re.test(text)) continue
    re.lastIndex = 0
    const next = text.replace(re, (_m, p1, _ext, q) => `${p1}.webp${q}`)
    if (next !== text) {
      changed++
      console.log(`${DRY ? '[dry] ' : ''}rewrote imports in ${file}`)
      if (!DRY) await writeFile(file, next)
    }
  }
  console.log(`\nCode files with rewritten refs: ${changed}`)
}

await convertImages()
await rewriteImports()
console.log(DRY ? '\n(dry run — nothing written)' : '\nDone.')
