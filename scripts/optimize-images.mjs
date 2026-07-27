/**
 * Image optimizer — quality-preserving.
 *
 * Resizes oversized raster images down to a retina-friendly max dimension and
 * re-encodes them at HIGH quality, IN PLACE (so existing imports keep working).
 * The true high-resolution originals live in git history, so this is always
 * re-runnable from source: `git restore --source=HEAD -- '*.jpg' '*.png'` then
 * run this again.
 *
 * Design goals: keep images crisp on modern/hi-DPI screens while cutting payload
 * from multi-MB originals to a few hundred KB. Notably it does NOT palette-reduce
 * PNGs (which caused visible banding) and runs a single pass (no double
 * compression from a build plugin).
 *
 * Usage:  node scripts/optimize-images.mjs           (optimize)
 *         node scripts/optimize-images.mjs --dry      (report only)
 */
import { readdir, stat, readFile, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'
import sharp from 'sharp'

const ROOTS = ['src/assets', 'public/assets']
const MAX_DIM = 2048 // max width/height in px — crisp on hi-DPI without shipping originals
const JPEG_QUALITY = 85
const DRY = process.argv.includes('--dry')

const exts = new Set(['.jpg', '.jpeg', '.png'])

async function walk(dir) {
  const out = []
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (exts.has(extname(e.name).toLowerCase())) out.push(p)
  }
  return out
}

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

async function main() {
  const files = []
  for (const root of ROOTS) files.push(...(await walk(root)))

  let totalBefore = 0
  let totalAfter = 0
  let changed = 0

  for (const file of files) {
    const beforeBytes = (await stat(file)).size
    const input = await readFile(file)
    const meta = await sharp(input, { failOn: 'none' }).metadata()

    const needsResize =
      (meta.width && meta.width > MAX_DIM) || (meta.height && meta.height > MAX_DIM)

    let pipeline = sharp(input, { failOn: 'none' }).rotate() // respect EXIF orientation
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    }

    if (extname(file).toLowerCase() === '.png') {
      // Full-colour PNG (NO palette) so photos/gradients stay crisp.
      pipeline = pipeline.png({ compressionLevel: 9, effort: 9, palette: false })
    } else {
      pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    }

    const output = await pipeline.toBuffer()

    // Only rewrite if we actually saved meaningful space (>3%).
    if (output.length < beforeBytes * 0.97) {
      totalBefore += beforeBytes
      totalAfter += output.length
      changed++
      const dims = needsResize ? ` (${meta.width}x${meta.height} -> max ${MAX_DIM})` : ''
      console.log(`${DRY ? '[dry] ' : ''}${file}: ${fmtKB(beforeBytes)} -> ${fmtKB(output.length)}${dims}`)
      if (!DRY) await writeFile(file, output)
    }
  }

  console.log('\n--- Summary ---')
  console.log(`Files scanned: ${files.length}`)
  console.log(`Files optimized: ${changed}`)
  console.log(
    `Total: ${fmtKB(totalBefore)} -> ${fmtKB(totalAfter)} ` +
      `(saved ${fmtKB(totalBefore - totalAfter)}, ` +
      `${totalBefore ? (100 * (1 - totalAfter / totalBefore)).toFixed(1) : 0}%)`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
