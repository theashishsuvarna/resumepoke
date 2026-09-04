import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAT = {
  wood: '#a8805a',
  woodDark: '#6b4e35',
  stone: '#b8b0a0',
  stoneDark: '#8a8275',
  grass: '#5fba7d',
  grassDark: '#3b9e5f',
  water: '#3b82f6',
  glass: '#7dd3fc',
  gold: '#ffcb05',
};

/** A rich stylized tree with layered canopy and wind sway */
export function Tree({ position, scale = 1, color = '#4a9e5f', trunkColor = '#6b4e35' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
  trunkColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness: 0.85, flatShading: true }), [color]);
  const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: trunkColor, roughness: 0.9 }), [trunkColor]);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.rotation.z = Math.sin(t * 0.5 + position[0] * 0.3) * 0.02;
      ref.current.children.forEach((child, i) => {
        if (i > 0) child.position.x = Math.sin(t * 0.8 + i) * 0.015;
      });
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh castShadow position={[0, 0.6, 0]} material={trunkMat}>
        <cylinderGeometry args={[0.1, 0.18, 1.2, 6]} />
      </mesh>
      <mesh castShadow position={[0, 1.4, 0]} material={leafMat}>
        <icosahedronGeometry args={[0.65, 1]} />
      </mesh>
      <mesh castShadow position={[0.25, 1.9, 0.1]} material={leafMat}>
        <icosahedronGeometry args={[0.4, 1]} />
      </mesh>
      <mesh castShadow position={[-0.2, 1.85, -0.1]} material={leafMat}>
        <icosahedronGeometry args={[0.35, 1]} />
      </mesh>
    </group>
  );
}

/** A detailed house with porch, chimney, and warm windows */
export function House({ position, rotation = 0, color = '#f5e6d3', roofColor = '#c0392b' }: {
  position: [number, number, number];
  rotation?: number;
  color?: string;
  roofColor?: string;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Walls */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <boxGeometry args={[1.8, 1.2, 1.4]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 1.55, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.5, 0.7, 4]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} flatShading />
      </mesh>
      {/* Chimney */}
      <mesh castShadow position={[0.5, 1.7, -0.3]}>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color={MAT.stoneDark} roughness={0.9} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.4, 0.71]}>
        <boxGeometry args={[0.35, 0.7, 0.03]} />
        <meshStandardMaterial color={MAT.woodDark} roughness={0.8} />
      </mesh>
      {/* Door knob */}
      <mesh position={[0.12, 0.4, 0.73]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color={MAT.gold} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Windows with warm glow */}
      {[[-0.55, 0.7], [0.55, 0.7]].map(([x, y], i) => (
        <group key={i} position={[x, y, 0.71]}>
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.02]} />
            <meshStandardMaterial color={MAT.glass} emissive={MAT.glass} emissiveIntensity={0.4} />
          </mesh>
          <mesh position={[0, 0, -0.01]}>
            <planeGeometry args={[0.28, 0.28]} />
            <meshStandardMaterial color="#fff8e0" emissive="#ffcb05" emissiveIntensity={0.15} />
          </mesh>
        </group>
      ))}
      {/* Porch step */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0.85]}>
        <boxGeometry args={[0.6, 0.1, 0.2]} />
        <meshStandardMaterial color={MAT.stone} roughness={0.9} />
      </mesh>
    </group>
  );
}

/** A rock formation with variation */
export function Rock({ position, scale = 1, color = '#8a8275' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <mesh castShadow receiveShadow position={position} scale={scale}>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
  );
}

/** Animated water plane with realistic ripples */
export function WaterPlane({ position, size = [20, 20], color = '#3b82f6' }: {
  position: [number, number, number];
  size?: [number, number];
  color?: string;
}) {
  const geo = useMemo(() => new THREE.PlaneGeometry(size[0], size[1], 24, 24), [size]);
  const original = useMemo(() => Float32Array.from(geo.attributes.position.array), [geo]);

  useFrame((state) => {
    const pos = geo.attributes.position;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = original[i * 3];
      const y = original[i * 3 + 1];
      pos.setZ(i, Math.sin(x * 1.5 + t * 1.5) * 0.08 + Math.cos(y * 1.8 + t * 1.2) * 0.06);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  return (
    <mesh geometry={geo} position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color={color} transparent opacity={0.75} roughness={0.15} metalness={0.6} />
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
      ref.current.rotation.y = state.clock.elapsedTime * 0.8;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.85} flatShading roughness={0.2} metalness={0.3} />
      </mesh>
      <pointLight color={color} intensity={2} distance={4} />
    </group>
  );
}

/** A modern glass building with lit windows */
export function Building({ position, height = 3, color = '#3b82f6', rotation = 0 }: {
  position: [number, number, number];
  height?: number;
  color?: string;
  rotation?: number;
}) {
  const windowCount = Math.floor(height * 2);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[1.2, height, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Glass top */}
      {height > 2 && (
        <mesh castShadow position={[0, height + 0.15, 0]}>
          <boxGeometry args={[0.8, 0.3, 0.8]} />
          <meshStandardMaterial color={MAT.glass} transparent opacity={0.5} emissive={MAT.glass} emissiveIntensity={0.2} roughness={0.1} metalness={0.8} />
        </mesh>
      )}
      {/* Lit windows on all 4 sides */}
      {Array.from({ length: windowCount }).map((_, i) => {
        const y = 0.5 + (i / windowCount) * (height - 0.5);
        const lit = (i + Math.floor(position[0])) % 3 !== 0;
        return (
          <group key={i}>
            {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((a, j) => (
              <mesh key={j} position={[Math.sin(a) * 0.61, y, Math.cos(a) * 0.61]} rotation={[0, a, 0]}>
                <planeGeometry args={[0.5, 0.25]} />
                <meshStandardMaterial color={lit ? '#ffcb05' : '#1a1a2e'} emissive={lit ? '#ffcb05' : '#000'} emissiveIntensity={lit ? 0.4 : 0} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

/** A premium gym structure with columns and emblem */
export function Gym({ position, color = '#ee1515', rotation = 0 }: {
  position: [number, number, number];
  color?: string;
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Stone platform */}
      <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.3, 8]} />
        <meshStandardMaterial color={MAT.stone} roughness={0.9} flatShading />
      </mesh>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[1.6, 1.8, 1.4, 8]} />
        <meshStandardMaterial color="#f0e8d8" roughness={0.7} flatShading />
      </mesh>
      {/* Columns */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} castShadow position={[Math.cos(a) * 1.4, 1.4, Math.sin(a) * 1.4]}>
            <cylinderGeometry args={[0.08, 0.1, 1.6, 6]} />
            <meshStandardMaterial color="#fdf9ee" roughness={0.6} />
          </mesh>
        );
      })}
      {/* Dome roof */}
      <mesh castShadow position={[0, 2.3, 0]}>
        <sphereGeometry args={[1.8, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} roughness={0.5} flatShading />
      </mesh>
      {/* Emblem */}
      <mesh position={[0, 1.2, 1.75]}>
        <circleGeometry args={[0.25, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
      {/* Steps */}
      <mesh castShadow receiveShadow position={[0, 0.05, 2]}>
        <boxGeometry args={[1.5, 0.1, 0.5]} />
        <meshStandardMaterial color={MAT.stoneDark} roughness={0.9} />
      </mesh>
    </group>
  );
}

/** A simple NPC with subtle movement */
export function NPC({ position, color = '#5fba7d' }: {
  position: [number, number, number];
  color?: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.3) * 1.5;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
    }
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.22, 0.4, 4, 6]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.2, 12, 12]} />
        <meshStandardMaterial color="#fdd9b5" roughness={0.6} />
      </mesh>
    </group>
  );
}

/** A floating firefly particle */
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
      <sphereGeometry args={[0.06, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

/** A wooden bridge with planks and railings */
export function Bridge({ position, rotation = 0, length = 4 }: {
  position: [number, number, number];
  rotation?: number;
  length?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[length, 0.15, 1.4]} />
        <meshStandardMaterial color={MAT.wood} roughness={0.8} flatShading />
      </mesh>
      {/* Plank lines */}
      {Array.from({ length: Math.floor(length) }).map((_, i) => (
        <mesh key={i} position={[-length / 2 + i + 0.5, 0.08, 0]}>
          <boxGeometry args={[0.04, 0.02, 1.3]} />
          <meshStandardMaterial color={MAT.woodDark} roughness={0.9} />
        </mesh>
      ))}
      {/* Railings */}
      {[0.6, -0.6].map((z, i) => (
        <mesh key={i} position={[0, 0.35, z]}>
          <boxGeometry args={[length, 0.5, 0.06]} />
          <meshStandardMaterial color={MAT.woodDark} roughness={0.8} />
        </mesh>
      ))}
      {/* Railing posts */}
      {[-length / 2 + 0.5, length / 2 - 0.5].map((x, i) => [0.6, -0.6].map((z, j) => (
        <mesh key={`${i}-${j}`} position={[x, 0.25, z]}>
          <boxGeometry args={[0.08, 0.5, 0.08]} />
          <meshStandardMaterial color={MAT.woodDark} roughness={0.85} />
        </mesh>
      )))}
    </group>
  );
}

/** A signpost */
export function Signpost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 1.2, 6]} />
        <meshStandardMaterial color={MAT.woodDark} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 1.0, 0.08]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[0.7, 0.3, 0.05]} />
        <meshStandardMaterial color={MAT.stone} roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}

/** A lamp post with warm glow */
export function LampPost({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 1.8, 6]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={MAT.gold} emissive={MAT.gold} emissiveIntensity={1.2} />
      </mesh>
      <pointLight position={[0, 1.85, 0]} intensity={2} distance={6} color="#ffcb05" />
    </group>
  );
}

/** A fountain with animated water */
export function Fountain({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.y = position[1] + 0.55 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
  });
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0.15, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.3, 16]} />
        <meshStandardMaterial color={MAT.stone} roughness={0.85} flatShading />
      </mesh>
      <mesh receiveShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.85, 0.95, 0.15, 16]} />
        <meshStandardMaterial color={MAT.stoneDark} roughness={0.9} />
      </mesh>
      <mesh ref={ref} position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.35, 0.55, 0.5, 12]} />
        <meshStandardMaterial color={MAT.water} transparent opacity={0.7} roughness={0.1} metalness={0.7} />
      </mesh>
      <pointLight position={[0, 1, 0]} color={MAT.water} intensity={0.5} distance={3} />
    </group>
  );
}

/** A mountain with snow cap */
export function Mountain({ position, scale = 1, color = '#6b7a8a' }: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <coneGeometry args={[3, 5, 8]} />
        <meshStandardMaterial color={color} roughness={0.9} flatShading />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[1, 1.5, 8]} />
        <meshStandardMaterial color="#e8f0f5" roughness={0.6} flatShading />
      </mesh>
    </group>
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
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.1} transparent opacity={0.8} />
    </points>
  );
}

/** A simple original creature */
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
        <meshStandardMaterial color={color} flatShading roughness={0.6} />
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

/** A windmill with rotating blades */
export function Windmill({ position, rotation = 0 }: {
  position: [number, number, number];
  rotation?: number;
}) {
  const bladeRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (bladeRef.current) bladeRef.current.rotation.z = state.clock.elapsedTime * 0.5;
  });
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Tower */}
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 2, 8]} />
        <meshStandardMaterial color="#e8d5b7" roughness={0.85} flatShading />
      </mesh>
      {/* Roof */}
      <mesh castShadow position={[0, 2.2, 0]}>
        <coneGeometry args={[0.55, 0.5, 8]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.7} flatShading />
      </mesh>
      {/* Blades */}
      <group ref={bladeRef} position={[0, 1.8, 0.4]}>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} castShadow rotation={[0, 0, (i / 4) * Math.PI * 2]}>
            <boxGeometry args={[0.08, 1.2, 0.15]} />
            <meshStandardMaterial color="#fdf9ee" roughness={0.7} />
          </mesh>
        ))}
        <mesh>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={MAT.woodDark} />
        </mesh>
      </group>
    </group>
  );
}

/** A lighthouse */
export function Lighthouse({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (lightRef.current) lightRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <group position={position}>
      {/* Base */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 1, 12]} />
        <meshStandardMaterial color={MAT.stone} roughness={0.9} flatShading />
      </mesh>
      {/* Tower */}
      <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 3, 12]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.6} flatShading />
      </mesh>
      {/* Red stripes */}
      {[1.5, 2.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.52, 0.6, 0.4, 12]} />
          <meshStandardMaterial color="#ee1515" roughness={0.6} />
        </mesh>
      ))}
      {/* Light room */}
      <mesh castShadow position={[0, 4.2, 0]}>
        <cylinderGeometry args={[0.6, 0.55, 0.6, 12]} />
        <meshStandardMaterial color={MAT.glass} transparent opacity={0.4} emissive={MAT.glass} emissiveIntensity={0.3} />
      </mesh>
      {/* Rotating light */}
      <group ref={lightRef} position={[0, 4.2, 0]}>
        <pointLight intensity={3} distance={15} color="#ffcb05" />
        <mesh position={[0, 0, 0.4]}>
          <boxGeometry args={[0.1, 0.3, 0.1]} />
          <meshStandardMaterial color="#ffcb05" emissive="#ffcb05" emissiveIntensity={2} />
        </mesh>
      </group>
      {/* Top */}
      <mesh castShadow position={[0, 4.7, 0]}>
        <coneGeometry args={[0.6, 0.4, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
    </group>
  );
}

/** A wooden dock */
export function Dock({ position, rotation = 0, length = 4 }: {
  position: [number, number, number];
  rotation?: number;
  length?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[length, 0.1, 1]} />
        <meshStandardMaterial color={MAT.wood} roughness={0.85} flatShading />
      </mesh>
      {/* Posts */}
      {[-length / 2 + 0.3, length / 2 - 0.3].map((x, i) => [0.4, -0.4].map((z, j) => (
        <mesh key={`${i}-${j}`} castShadow position={[x, -0.3, z]}>
          <boxGeometry args={[0.1, 0.8, 0.1]} />
          <meshStandardMaterial color={MAT.woodDark} roughness={0.9} />
        </mesh>
      )))}
    </group>
  );
}

/** A wooden fence segment */
export function Fence({ position, rotation = 0, length = 3 }: {
  position: [number, number, number];
  rotation?: number;
  length?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Rails */}
      {[0.3, 0.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[length, 0.05, 0.04]} />
          <meshStandardMaterial color={MAT.wood} roughness={0.85} />
        </mesh>
      ))}
      {/* Posts */}
      {Array.from({ length: Math.floor(length) + 1 }).map((_, i) => (
        <mesh key={i} castShadow position={[-length / 2 + i, 0.4, 0]}>
          <boxGeometry args={[0.06, 0.8, 0.06]} />
          <meshStandardMaterial color={MAT.woodDark} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

/** A flower patch */
export function Flower({ position, color = '#ff5a3c' }: {
  position: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 4]} />
        <meshStandardMaterial color="#3b9e5f" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

/** A drifting cloud */
export function Cloud({ position, scale = 1 }: {
  position: [number, number, number];
  scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.05) * 3;
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} />
      </mesh>
      <mesh position={[0.8, 0, 0.2]}>
        <sphereGeometry args={[0.7, 8, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} />
      </mesh>
      <mesh position={[-0.7, 0, -0.1]}>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial color="#f0f0f5" transparent opacity={0.6} roughness={1} />
      </mesh>
      <mesh position={[0.2, 0.3, 0.3]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} />
      </mesh>
    </group>
  );
}

/** A waterfall */
export function Waterfall({ position, height = 3, width = 2 }: {
  position: [number, number, number];
  height?: number;
  width?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      (ref.current.material as THREE.MeshStandardMaterial).opacity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });
  return (
    <group position={position}>
      <mesh ref={ref} position={[0, -height / 2, 0]}>
        <planeGeometry args={[width, height, 4, 8]} />
        <meshStandardMaterial color="#a0d8f0" transparent opacity={0.5} roughness={0.1} metalness={0.3} side={THREE.DoubleSide} />
      </mesh>
      {/* Mist particles */}
      <points position={[0, -height, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array([
            0, 0, 0, 0.3, 0.1, 0, -0.2, 0.2, 0.1, 0.1, -0.1, -0.1, -0.3, 0, 0.2
          ]), 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.15} transparent opacity={0.3} />
      </points>
    </group>
  );
}

/** A cabin */
export function Cabin({ position, rotation = 0 }: {
  position: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.4, 1, 1.2]} />
        <meshStandardMaterial color="#5a3e2a" roughness={0.9} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.25, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.1, 0.5, 4]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 0.35, 0.61]}>
        <boxGeometry args={[0.3, 0.6, 0.03]} />
        <meshStandardMaterial color="#2a1a0a" />
      </mesh>
      <mesh position={[0.45, 0.6, 0.61]}>
        <boxGeometry args={[0.25, 0.25, 0.02]} />
        <meshStandardMaterial color={MAT.glass} emissive={MAT.glass} emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
