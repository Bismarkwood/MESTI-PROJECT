/* eslint-disable react-hooks/purity, react-hooks/immutability */
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Server Rack (large, visible, dark metallic) ───
function ServerRack({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const lightsRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light, i) => {
        const mat = (light as THREE.Mesh).material as THREE.MeshBasicMaterial
        mat.opacity = 0.5 + Math.sin(clock.getElapsedTime() * 2.5 + i * 1.8) * 0.5
      })
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Main rack body */}
      <mesh>
        <boxGeometry args={[0.35, 0.9, 0.25]} />
        <meshStandardMaterial color="#0f1520" metalness={0.95} roughness={0.2} />
      </mesh>
      {/* Rack front panel */}
      <mesh position={[0, 0, 0.126]}>
        <boxGeometry args={[0.33, 0.88, 0.005]} />
        <meshStandardMaterial color="#1a2030" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Server unit slots */}
      {[-0.3, -0.18, -0.06, 0.06, 0.18, 0.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0.13]}>
          <boxGeometry args={[0.3, 0.08, 0.01]} />
          <meshStandardMaterial color="#0a0f18" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Glowing status lights */}
      <group ref={lightsRef}>
        {[-0.3, -0.18, -0.06, 0.06, 0.18, 0.3].map((y, i) => (
          <mesh key={i} position={[0.12, y, 0.14]}>
            <boxGeometry args={[0.015, 0.015, 0.005]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#ff9900' : i % 3 === 1 ? '#22c55e' : '#38bdf8'}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
      {/* Orange edge glow lines */}
      <mesh position={[0.175, 0, 0.13]}>
        <boxGeometry args={[0.003, 0.88, 0.003]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.4} />
      </mesh>
      <mesh position={[-0.175, 0, 0.13]}>
        <boxGeometry args={[0.003, 0.88, 0.003]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// ─── Cloud Core (large glowing particle cloud above servers) ───
function CloudCore() {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 0.4 + Math.random() * 0.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.5
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      positions[i * 3 + 2] = r * Math.cos(phi) * 1.0

      const c = Math.random()
      if (c < 0.45) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.6; colors[i * 3 + 2] = 0.0
      } else if (c < 0.75) {
        colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.75; colors[i * 3 + 2] = 0.15
      } else {
        colors[i * 3] = 0.22; colors[i * 3 + 1] = 0.74; colors[i * 3 + 2] = 0.94
      }
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.1
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.6) * 0.06
      pointsRef.current.scale.setScalar(scale)
    }
  })

  return (
    <points ref={pointsRef} position={[0, 0.8, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={600} array={particles.positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={600} array={particles.colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation />
    </points>
  )
}

// ─── Data Streams (flowing upward from servers to cloud) ───
function DataStreams() {
  const streamsRef = useRef<THREE.Points>(null)

  const { positions, speeds } = useMemo(() => {
    const count = 120
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.0
      pos[i * 3 + 1] = -1.0 + Math.random() * 2.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.0
      spd[i] = 0.008 + Math.random() * 0.015
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame(() => {
    if (!streamsRef.current) return
    const posArray = streamsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < posArray.length / 3; i++) {
      posArray[i * 3 + 1] += speeds[i]
      // Converge toward center as they rise
      posArray[i * 3] *= 0.999
      posArray[i * 3 + 2] *= 0.999
      // Reset at top
      if (posArray[i * 3 + 1] > 1.8) {
        posArray[i * 3] = (Math.random() - 0.5) * 2.0
        posArray[i * 3 + 1] = -1.0
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 1.0
      }
    }
    streamsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={streamsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={120} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ff9900" size={0.025} transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

// ─── Database / Storage Cylinders ───
function DatabaseCylinder({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.35, 20]} />
        <meshStandardMaterial color="#0f1520" metalness={0.9} roughness={0.2} />
      </mesh>
      {[-0.1, 0, 0.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.125, 0.008, 8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      ))}
      {/* Top glow */}
      <mesh position={[0, 0.18, 0]}>
        <circleGeometry args={[0.12, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ─── Availability Zone Rings ───
function AvailabilityRings() {
  const r1 = useRef<THREE.Mesh>(null)
  const r2 = useRef<THREE.Mesh>(null)
  const r3 = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (r1.current) { r1.current.rotation.x = Math.PI * 0.5; r1.current.rotation.z = t * 0.1 }
    if (r2.current) { r2.current.rotation.x = Math.PI * 0.35; r2.current.rotation.y = t * 0.07 }
    if (r3.current) { r3.current.rotation.x = Math.PI * 0.65; r3.current.rotation.z = -t * 0.06 }
  })

  return (
    <group position={[0, 0.8, 0]}>
      <mesh ref={r1}>
        <torusGeometry args={[1.2, 0.008, 8, 128]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.4} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[1.5, 0.006, 8, 128]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.3} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[1.8, 0.005, 8, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// ─── Security Shield ───
function SecurityShield() {
  const shieldRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (shieldRef.current) {
      const t = (clock.getElapsedTime() % 6) / 6
      shieldRef.current.rotation.y = t * Math.PI * 2
      const mat = shieldRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.08 + Math.sin(t * Math.PI) * 0.06
    }
  })

  return (
    <group position={[0, 0.8, 0]}>
      {/* Shield sphere */}
      <mesh>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.025} wireframe />
      </mesh>
      {/* Scanning wedge */}
      <mesh ref={shieldRef}>
        <sphereGeometry args={[1.42, 12, 12, 0, Math.PI * 0.4, 0, Math.PI]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ─── Deployment Pipeline (cubes moving into cloud) ───
function DeploymentPipeline() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((cube, i) => {
      const t = (clock.getElapsedTime() * 0.3 + i * 0.5) % 2.5
      const progress = t / 2.5
      cube.position.set(
        -2.0 + progress * 2.0,
        -0.8 + progress * 1.6,
        0.5 - i * 0.2
      )
      cube.scale.setScalar(0.8 * (1 - progress * 0.6))
      const mat = (cube as THREE.Mesh).material as THREE.MeshStandardMaterial
      mat.opacity = 1 - progress
    })
  })

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.5}
            transparent
            opacity={0.9}
            metalness={0.4}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── Floor grid ───
function FloorGrid() {
  return (
    <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 8, 20, 20]} />
      <meshBasicMaterial color="#1a3060" wireframe transparent opacity={0.06} />
    </mesh>
  )
}

// ─── Background particles ───
function BackgroundParticles() {
  const ref = useRef<THREE.Points>(null)
  const particles = useMemo(() => {
    const count = 150
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.002
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={150} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.008} transparent opacity={0.12} sizeAttenuation />
    </points>
  )
}

// ─── Camera Rig ───
function CameraRig() {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.01
    camera.position.y += (pointer.y * 0.3 + 0.5 - camera.position.y) * 0.01
    camera.lookAt(0, 0.3, 0)
  })
  return null
}

// ─── Main Scene Export ───
export default function CloudArchitectureScene() {
  return (
    <group>
      {/* Lighting - warm orange dominant */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 3, 3]} intensity={2.5} color="#ff9900" distance={12} />
      <pointLight position={[-2, 2, -2]} intensity={1.0} color="#38bdf8" distance={10} />
      <pointLight position={[0, -1, 2]} intensity={0.6} color="#22c55e" distance={8} />
      <pointLight position={[3, 0, -1]} intensity={0.8} color="#fbbf24" distance={8} />
      <directionalLight position={[0, 5, 3]} intensity={0.4} color="#ffffff" />

      {/* Server Racks at bottom */}
      <ServerRack position={[-1.2, -0.8, 0.3]} scale={0.9} />
      <ServerRack position={[-0.6, -0.8, 0.5]} scale={1.0} />
      <ServerRack position={[0, -0.8, 0.6]} scale={1.1} />
      <ServerRack position={[0.6, -0.8, 0.5]} scale={1.0} />
      <ServerRack position={[1.2, -0.8, 0.3]} scale={0.9} />
      <ServerRack position={[-0.3, -0.8, -0.3]} scale={0.85} />
      <ServerRack position={[0.3, -0.8, -0.3]} scale={0.85} />

      {/* Cloud Core above servers */}
      <CloudCore />

      {/* Data streams flowing upward */}
      <DataStreams />

      {/* Database / Storage */}
      <DatabaseCylinder position={[-1.8, 0.2, -0.3]} color="#38bdf8" />
      <DatabaseCylinder position={[1.8, 0.3, -0.2]} color="#ff9900" />
      <DatabaseCylinder position={[0, 0.1, -1.2]} color="#22c55e" />

      {/* Infrastructure rings */}
      <AvailabilityRings />
      <SecurityShield />

      {/* Deployment pipeline */}
      <DeploymentPipeline />

      {/* Background */}
      <FloorGrid />
      <BackgroundParticles />
      <CameraRig />
    </group>
  )
}
