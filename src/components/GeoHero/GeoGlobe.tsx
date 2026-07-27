/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Ghana center: lat 7.9465, lon -1.0232
// Ghana-focused cities with lat/lon
const cities = [
  { name: 'Accra', lat: 5.6037, lon: -0.1870 },
  { name: 'Kumasi', lat: 6.6885, lon: -1.6244 },
  { name: 'Tamale', lat: 9.4034, lon: -0.8424 },
  { name: 'Takoradi', lat: 4.8845, lon: -1.7554 },
  { name: 'Tema', lat: 5.6698, lon: -0.0166 },
  { name: 'Cape Coast', lat: 5.1315, lon: -1.2795 },
  { name: 'Ho', lat: 6.6000, lon: 0.4700 },
  { name: 'Sunyani', lat: 7.3393, lon: -2.3287 },
]

// Ghana boundary polygon (simplified outline)
const ghanaBoundary = [
  { lat: 4.7, lon: -3.3 }, { lat: 5.0, lon: -3.1 }, { lat: 5.4, lon: -2.8 },
  { lat: 5.8, lon: -2.6 }, { lat: 6.1, lon: -2.5 }, { lat: 6.9, lon: -2.8 },
  { lat: 7.5, lon: -2.9 }, { lat: 8.3, lon: -2.5 }, { lat: 9.0, lon: -2.5 },
  { lat: 9.8, lon: -2.7 }, { lat: 10.3, lon: -2.3 }, { lat: 11.0, lon: -1.2 },
  { lat: 11.2, lon: -0.2 }, { lat: 11.0, lon: 0.3 }, { lat: 10.5, lon: 0.5 },
  { lat: 9.8, lon: 0.2 }, { lat: 8.5, lon: 0.6 }, { lat: 7.5, lon: 0.5 },
  { lat: 6.5, lon: 0.7 }, { lat: 6.1, lon: 1.2 }, { lat: 5.5, lon: 0.5 },
  { lat: 5.0, lon: 0.0 }, { lat: 4.7, lon: -1.6 }, { lat: 4.7, lon: -3.3 },
]

// Connection arcs (city index pairs)
const arcConnections = [
  [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 5], [2, 7],
]

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Atmosphere glow shader
function Atmosphere() {
  const vertexShader = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  const fragmentShader = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.55 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
      gl_FragColor = vec4(0.1, 0.5, 1.0, 1.0) * intensity * 0.7;
    }
  `

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[2, 48, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
      />
    </mesh>
  )
}

// Main Earth globe with texture
function EarthGlobe() {
  const texture = useTexture('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg')
  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <mesh>
      <sphereGeometry args={[2, 48, 48]} />
      <meshPhongMaterial
        map={texture}
        bumpScale={0.02}
        specular={new THREE.Color('#1a3d6b')}
        shininess={6}
      />
    </mesh>
  )
}

// Ghana boundary glow outline - using tube geometry for visibility
function GhanaBoundary() {
  const tubeRef = useRef<THREE.Mesh>(null)

  const curve = useMemo(() => {
    const points = ghanaBoundary.map(p => latLonToVec3(p.lat, p.lon, 2.03))
    return new THREE.CatmullRomCurve3(points, true)
  }, [])

  useFrame(({ clock }) => {
    if (tubeRef.current) {
      const mat = tubeRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.6 + Math.sin(clock.getElapsedTime() * 1.5) * 0.2
    }
  })

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[curve, 64, 0.008, 8, true]} />
      <meshBasicMaterial color="#2ea872" transparent opacity={0.7} />
    </mesh>
  )
}

// Ghana glow - larger visible green glow over Ghana region
function GhanaGlow() {
  const meshRef = useRef<THREE.Mesh>(null)
  const ghanaCenter = latLonToVec3(7.9, -1.0, 2.02)
  const normal = ghanaCenter.clone().normalize()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 0.7) * 0.04
    }
  })

  return (
    <mesh ref={meshRef} position={ghanaCenter} lookAt={normal.clone().multiplyScalar(10)}>
      <circleGeometry args={[0.45, 32]} />
      <meshBasicMaterial color="#2ea872" transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

// Pulsing city GIS data points - larger and brighter
function GISPoints() {
  const groupRef = useRef<THREE.Group>(null)
  const positions = useMemo(() => cities.map(c => latLonToVec3(c.lat, c.lon, 2.05)), [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + i * 0.9) * 0.6
        child.scale.setScalar(scale)
      })
    }
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#4dff91" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// Data arcs connecting cities - using tubes for visibility
function DataArcs() {
  const arcs = useMemo(() => {
    return arcConnections.map(([fromIdx, toIdx]) => {
      const from = latLonToVec3(cities[fromIdx].lat, cities[fromIdx].lon, 2.05)
      const to = latLonToVec3(cities[toIdx].lat, cities[toIdx].lon, 2.05)
      const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(2.35)
      return new THREE.QuadraticBezierCurve3(from, mid, to)
    })
  }, [])

  return (
    <group>
      {arcs.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 32, 0.005, 6, false]} />
          <meshBasicMaterial color="#2ea872" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

// Radar scanning ring over Ghana - properly oriented
function RadarScan() {
  const groupRef = useRef<THREE.Group>(null)
  const ghanaCenter = latLonToVec3(7.9, -1.0, 2.04)
  const normal = ghanaCenter.clone().normalize()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      const cycle = (t % 2.5) / 2.5
      const scale = 0.3 + cycle * 1.2
      groupRef.current.scale.setScalar(scale)
      const children = groupRef.current.children
      if (children[0]) {
        const mat = (children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial
        mat.opacity = 0.5 * (1 - cycle)
      }
    }
  })

  return (
    <group ref={groupRef} position={ghanaCenter} lookAt={normal.multiplyScalar(10)}>
      <mesh>
        <ringGeometry args={[0.2, 0.22, 64]} />
        <meshBasicMaterial color="#2ea872" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Scanning orbital rings
function ScanRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = Math.PI * 0.35
      ring1Ref.current.rotation.z = clock.getElapsedTime() * 0.12
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI * 0.6
      ring2Ref.current.rotation.y = clock.getElapsedTime() * 0.08
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <ringGeometry args={[2.35, 2.37, 128]} />
        <meshBasicMaterial color="#1a6baa" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref}>
        <ringGeometry args={[2.55, 2.565, 128]} />
        <meshBasicMaterial color="#1a6baa" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

// Subtle wireframe grid overlay
function WireframeGrid() {
  return (
    <mesh>
      <sphereGeometry args={[2.015, 30, 30]} />
      <meshBasicMaterial color="#1a8cff" wireframe transparent opacity={0.025} />
    </mesh>
  )
}

// Background particles
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3)
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.003
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#1a8cff" size={0.012} transparent opacity={0.25} sizeAttenuation />
    </points>
  )
}

// Rain droplets
function RainDroplets() {
  const rainRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const count = 150
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = Math.random() * 10 - 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 + 2
      vel[i] = 0.015 + Math.random() * 0.025
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    if (!rainRef.current) return
    const posArray = rainRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < posArray.length / 3; i++) {
      posArray[i * 3 + 1] -= velocities[i]
      if (posArray[i * 3 + 1] < -5) posArray[i * 3 + 1] = 5
    }
    rainRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#4a9eff" size={0.015} transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

export default function GeoGlobe() {
  return (
    <group position={[0, 0, 0]}>
      {/* Lighting */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#4a9eff" />
      <pointLight position={[3, -2, 4]} intensity={0.4} color="#ffffff" />

      {/* Globe group — all rotates together via OrbitControls */}
      <group rotation={[0, 3.5, 0]}>
        <EarthGlobe />
        <WireframeGrid />
        <GhanaBoundary />
        <GhanaGlow />
        <GISPoints />
        <DataArcs />
        <RadarScan />
      </group>

      {/* Non-rotating elements */}
      <Atmosphere />
      <ScanRings />
      <ParticleField />
      <RainDroplets />
    </group>
  )
}
