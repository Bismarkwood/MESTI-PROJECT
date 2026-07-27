import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ParticleWaveBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Wait for layout
    const width = mount.clientWidth || window.innerWidth
    const height = mount.clientHeight || window.innerHeight

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000)
    camera.position.set(0, 16, 28)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const countX = 200
    const countZ = 160
    const spacing = 0.35
    const particlesCount = countX * countZ

    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    let index = 0
    for (let x = 0; x < countX; x++) {
      for (let z = 0; z < countZ; z++) {
        const xPos = (x - countX / 2) * spacing
        const zPos = (z - countZ / 2) * spacing

        positions[index * 3] = xPos
        positions[index * 3 + 1] = 0
        positions[index * 3 + 2] = zPos

        // Gradient: red on left, yellow in center, green on right
        const t = x / countX
        const color = new THREE.Color()
        if (t < 0.5) {
          color.setRGB(1, t * 2, 0)
        } else {
          color.setRGB(1 - (t - 0.5) * 2, 1, (t - 0.5) * 0.8)
        }

        colors[index * 3] = color.r
        colors[index * 3 + 1] = color.g
        colors[index * 3 + 2] = color.b

        index++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    particles.rotation.x = -0.55
    particles.position.y = -2
    scene.add(particles)

    let frameId: number
    const startTime = performance.now()

    const animate = () => {
      const time = (performance.now() - startTime) * 0.001
      const positionArray = geometry.attributes.position.array as Float32Array

      let i = 0
      for (let x = 0; x < countX; x++) {
        for (let z = 0; z < countZ; z++) {
          const px = positionArray[i * 3]
          const pz = positionArray[i * 3 + 2]

          const wave =
            Math.sin(px * 0.45 + time * 1.1) * 0.6 +
            Math.cos(pz * 0.6 + time * 0.8) * 0.5 +
            Math.sin((px + pz) * 0.22 + time * 1.4) * 0.4

          positionArray[i * 3 + 1] = wave
          i++
        }
      }

      geometry.attributes.position.needsUpdate = true

      particles.rotation.z = Math.sin(time * 0.12) * 0.03
      particles.position.x = Math.sin(time * 0.18) * 0.7

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!mount) return
      const w = mount.clientWidth || window.innerWidth
      const h = mount.clientHeight || window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="particle-wave-bg" />
}

export default ParticleWaveBackground
