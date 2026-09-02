import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** A stylized low-poly tree with wind sway */
export function Tree({ position, scale = 1, color = '#4a9e5f', trunkColor = '#8b6f47' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  trunkColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.03;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1, 6]} />
        <meshStandardMaterial color={trunkColor} />
      </mesh>
      <mesh castShadow position={[0, 1.2, 0]}>
        <coneGeometry args={[0.6, 1, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.8, 0]}>
        <coneGeometry args={[0.45, 0.8, 7]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
    </group>
  );
}

/** A simple house */
export function House({ position, rotation = 0, color = '#f5e6d3', roofColor = '#ee1515' }: {
  position: [number, number, number];
  rotation?: number;
  color?: string;
  roofColor?: string;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 1, 1.2]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 1.3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.2, 0.6, 4]} />
        <meshStandardMaterial color={roofColor} flatShading />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.35, 0.61]}>
        <boxGeometry args={[0.3, 0.6, 0.02]} />
        <meshStandardMaterial color="#3d2b1f" />
      </mesh>
      {/* Window */}
      <mesh position={[0.5, 0.6, 0.61]}>
        <boxGeometry args={[0.25, 0.25, 0.02]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.5, 0.6, 0.61]}>
        <boxGeometry args={[0.25, 0.25, 0.02]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

/** A rock formation */
export function Rock({ position, scale = 1, color = '#8a8a8a' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh castShadow receiveShadow position={position} scale={scale}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

/** Animated water plane */
export function WaterPlane({ position, size = [20, 20], color = '#3b82f6' }: {
  position: [number, number, number];
  size?: [number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.PlaneGeometry(size[0], size[1], 20, 20), [size]);
  const original = useMemo(() => geo.attributes.position.array.slice(), [geo]);

  useFrame((state) => {
    const pos = geo.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = original[i * 3];
      const y = original[i * 3 + 1];
      pos.setZ(i, Math.sin(x * 2 + t * 2) * 0.05 + Math.cos(y * 2 + t * 1.5) * 0.05);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geo} position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color={color} transparent opacity={0.7} roughness={0.2} metalness={0.5} />
    </mesh>
  );
}

/** A floating glowing crystal (skill collectible) */
export function Crystal({ position, color = '#3b82f6' }: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} flatShading />
      </mesh>
      <pointLight color={color} intensity={2} distance={3} />
    </group>
  );
}

/** A building (tech city style) */
export function Building({ position, height = 3, color = '#3b82f6', rotation = 0 }: {
  position: [number, number, number];
  height?: number;
  color?: string;
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial color={color} flatShading metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Windows */}
      {Array.from({ length: Math.floor(height) }).map((_, i) => (
        <mesh key={i} position={[0, i + 0.5, 0.51]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshStandardMaterial color="#ffcb05" emissive="#ffcb05" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** A gym structure */
export function Gym({ position, color = '#ee1515', rotation = 0 }: {
  position: [number, number, number];
  color?: string;
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 1, 8]} />
        <meshStandardMaterial color="#d4c5a9" flatShading />
      </mesh>
      {/* Pillars */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} castShadow position={[Math.cos(a) * 1.2, 1.5, Math.sin(a) * 1.2]}>
            <cylinderGeometry args={[0.1, 0.1, 1, 6]} />
            <meshStandardMaterial color="#fdf9ee" />
          </mesh>
        );
      })}
      {/* Roof */}
      <mesh castShadow position={[0, 2.2, 0]}>
        <coneGeometry args={[2, 1, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {/* Emblem */}
      <mesh position={[0, 1.5, 1.6]}>
        <circleGeometry args={[0.3, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

/** A simple NPC */
export function NPC({ position, color = '#5fba7d' }: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 1.5;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <capsuleGeometry args={[0.2, 0.4, 4, 6]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh castShadow position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#fdd9b5" />
      </mesh>
    </group>
  );
}

/** A floating particle / firefly */
export function Firefly({ position, color = '#ffcb05' }: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.position.x = position[0] + Math.sin(t * 0.7) * 1.5;
      ref.current.position.y = position[1] + Math.cos(t * 0.5) * 0.8;
      ref.current.position.z = position[2] + Math.cos(t * 0.6) * 1.5;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.3 + Math.sin(t * 2) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.05, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

/** A bridge */
export function Bridge({ position, rotation = 0, length = 4 }: {
  position: [number, number, number];
  rotation?: number;
  length?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[length, 0.15, 1.2]} />
        <meshStandardMaterial color="#a8805a" flatShading />
      </mesh>
      {/* Railings */}
      <mesh position={[0, 0.3, 0.55]}>
        <boxGeometry args={[length, 0.4, 0.05]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      <mesh position={[0, 0.3, -0.55]}>
        <boxGeometry args={[length, 0.4, 0.05]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
    </group>
  );
}

/** A signpost */
export function Signpost({ position, label }: {
  position: [number, number, number];
  label?: string;
}) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 6]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      <mesh castShadow position={[0, 0.85, 0.1]}>
        <boxGeometry args={[0.6, 0.25, 0.05]} />
        <meshStandardMaterial color="#d4c5a9" flatShading />
      </mesh>
    </group>
  );
}

/** A lamp post */
export function LampPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.5, 6]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#ffcb05" emissive="#ffcb05" emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, 1.55, 0]} intensity={1.5} distance={5} color="#ffcb05" />
    </group>
  );
}

/** A fountain */
export function Fountain({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.2, 16]} />
        <meshStandardMaterial color="#a0a0a0" flatShading />
      </mesh>
      <mesh ref={ref} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.4, 12]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/** A mountain (background scenery) */
export function Mountain({ position, scale = 1, color = '#6b7a8a' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh position={position} scale={scale}>
      <coneGeometry args={[3, 5, 6]} />
      <meshStandardMaterial color={color} flatShading />
    </mesh>
  );
}

/** Snow particles */
export function SnowParticles({ area = [30, 30, 30], count = 100 }: {
  area?: [number, number, number];
  count?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * area[0];
      arr[i * 3 + 1] = Math.random() * area[1];
      arr[i * 3 + 2] = (Math.random() - 0.5) * area[2];
    }
    return arr;
  }, [count, area]);

  useFrame((_, dt) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.setY(i, pos.getY(i) - dt * 0.5);
      if (pos.getY(i) < 0) pos.setY(i, area[1]);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.08} transparent opacity={0.8} />
    </points>
  );
}

/** A simple original creature (low-poly, non-Pokemon) */
export function Creature({ position, color = '#ffcb05', type = 'wander' }: {
  position: [number, number, number];
  color?: string;
  type?: 'wander' | 'fly';
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    if (type === 'wander') {
      ref.current.position.x = position[0] + Math.sin(t * 0.3) * 2;
      ref.current.position.z = position[2] + Math.cos(t * 0.3) * 2;
      ref.current.position.y = position[1] + Math.abs(Math.sin(t * 3)) * 0.15;
    } else {
      ref.current.position.x = position[0] + Math.sin(t * 0.5) * 3;
      ref.current.position.y = position[1] + Math.cos(t * 0.7) * 1;
      ref.current.position.z = position[2] + Math.cos(t * 0.4) * 3;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {type === 'fly' && (
        <>
          <mesh position={[0, 0, 0.2]} rotation={[0, 0, Math.PI / 4]}>
            <planeGeometry args={[0.3, 0.15]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 0, -0.2]} rotation={[0, 0, -Math.PI / 4]}>
            <planeGeometry args={[0.3, 0.15]} />
            <meshStandardMaterial color={color} side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  );
}

/** A glowing interaction beacon */
export function Beacon({ position, color = '#ffcb05' }: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      ref.current.scale.set(s, 1, s);
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref} position={[0, 1.5, 0]}>
        <torusGeometry args={[0.4, 0.05, 8, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <pointLight position={[0, 1.5, 0]} color={color} intensity={1.5} distance={4} />
    </group>
  );
}
