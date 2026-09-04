import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Tree, House, Rock, WaterPlane, Crystal, Building, Gym, NPC, Firefly,
  Bridge, Signpost, LampPost, Fountain, Mountain, SnowParticles, Creature, Beacon,
  Windmill, Lighthouse, Dock, Fence, Flower, Cloud, Waterfall, Cabin,
} from './Environment';
import { PROJECTS, SKILL_GROUPS, BADGES, CERTS, REGIONS, type RegionId } from './gameData';
import { useGame, type InteractableInfo } from './GameContext';

const GROUND_SIZE = 200;

type Props = {
  playerPosition: React.MutableRefObject<THREE.Vector3>;
};

export function World({ playerPosition }: Props) {
  const { discoverRegion, setNearbyInteractable, setCurrentRegion } = useGame();
  const lastRegion = useRef<RegionId | null>(null);
  const nearbyRef = useRef<InteractableInfo | null>(null);

  const interactables = useMemo(() => {
    const items: InteractableInfo[] = [];
    PROJECTS.forEach((p, i) => {
      const angle = (i / PROJECTS.length) * Math.PI * 2;
      const r = 7;
      items.push({ type: 'project', id: p.id, label: p.name, position: [40 + Math.cos(angle) * r, 0, 15 + Math.sin(angle) * r] });
    });
    SKILL_GROUPS.forEach((s, i) => {
      const angle = (i / SKILL_GROUPS.length) * Math.PI * 2;
      const r = 6;
      items.push({ type: 'skill', id: s.title, label: s.title, position: [10 + Math.cos(angle) * r, 0, 35 + Math.sin(angle) * r] });
    });
    BADGES.forEach((b, i) => {
      const angle = (i / BADGES.length) * Math.PI * 2;
      const r = 7;
      items.push({ type: 'badge', id: b.id, label: b.title, position: [-30 + Math.cos(angle) * r, 0, 25 + Math.sin(angle) * r] });
    });
    CERTS.forEach((c, i) => {
      const angle = (i / CERTS.length) * Math.PI * 2;
      const r = 5;
      items.push({ type: 'cert', id: c.title, label: c.title, position: [-35 + Math.cos(angle) * r, 0, -15 + Math.sin(angle) * r] });
    });
    items.push({ type: 'trainer', id: 'trainer', label: 'TRAINER PROFILE', position: [0, 20, -60] });
    return items;
  }, []);

  useFrame(() => {
    const pp = playerPosition.current;
    if (!pp) return;
    let nearestRegion: RegionId | null = null;
    let nearestDist = Infinity;
    for (const r of REGIONS) {
      const d = Math.hypot(pp.x - r.position[0], pp.z - r.position[2]);
      if (d < 14 && d < nearestDist) { nearestDist = d; nearestRegion = r.id; }
    }
    if (nearestRegion && nearestRegion !== lastRegion.current) {
      lastRegion.current = nearestRegion;
      setCurrentRegion(nearestRegion);
      discoverRegion(nearestRegion);
    } else if (!nearestRegion && lastRegion.current) {
      lastRegion.current = null;
      setCurrentRegion(null);
    }
    let nearest: InteractableInfo | null = null;
    let nearestIntDist = Infinity;
    for (const item of interactables) {
      const d = Math.hypot(pp.x - item.position[0], pp.z - item.position[2]);
      if (d < 3.5 && d < nearestIntDist) { nearestIntDist = d; nearest = item; }
    }
    if (nearest?.id !== nearbyRef.current?.id) {
      nearbyRef.current = nearest;
      setNearbyInteractable(nearest);
    }
  });

  // Seeded random for stable layout
  const rng = useMemo(() => {
    let s = 42;
    return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
  }, []);

  return (
    <>
      {/* Ground with subtle terrain variation */}
      <TerrainGround />

      {/* Paths */}
      <PathNetwork />

      {/* Clouds */}
      <Cloud position={[-20, 25, -30]} scale={2} />
      <Cloud position={[30, 28, -50]} scale={2.5} />
      <Cloud position={[10, 30, 20]} scale={1.5} />
      <Cloud position={[-40, 26, 10]} scale={2} />

      {/* === STARTER VILLAGE === */}
      <group position={[0, 0, 0]}>
        <House position={[-4, 0, -3]} color="#f5e6d3" roofColor="#c0392b" />
        <House position={[4, 0, -4]} color="#e8d5b7" roofColor="#3b82f6" rotation={Math.PI / 6} />
        <House position={[-5, 0, 3]} color="#f0dcc0" roofColor="#27ae60" rotation={-Math.PI / 8} />
        <House position={[5, 0, 2]} color="#f5e6d3" roofColor="#e67e22" rotation={Math.PI / 4} />
        <Fountain position={[0, 0, 0]} />
        <Windmill position={[-7, 0, -5]} />
        <LampPost position={[-3, 0, 3]} />
        <LampPost position={[3, 0, -1]} />
        <LampPost position={[0, 0, 7]} />
        <Signpost position={[0, 0, 6]} />
        {/* Fences */}
        <Fence position={[-5, 0, -1]} rotation={Math.PI / 2} length={3} />
        <Fence position={[5, 0, 0]} rotation={Math.PI / 2} length={2} />
        {/* Trees */}
        <Tree position={[-8, 0, 1]} scale={1.3} />
        <Tree position={[8, 0, 2]} scale={1} />
        <Tree position={[-6, 0, -6]} scale={1.1} />
        <Tree position={[7, 0, -6]} scale={1.2} />
        <Tree position={[-9, 0, -3]} scale={0.9} />
        {/* Flowers */}
        {Array.from({ length: 8 }).map((_, i) => (
          <Flower key={i} position={[(rng() - 0.5) * 12, 0, (rng() - 0.5) * 12]} color={['#ff5a3c', '#ffcb05', '#e74ce7', '#ff8c69'][i % 4]} />
        ))}
        {/* NPCs */}
        <NPC position={[2, 0, 2]} color="#3b82f6" />
        <NPC position={[-2.5, 0, -2]} color="#e74c3c" />
        <NPC position={[1, 0, 5]} color="#9b59b6" />
        {/* Creatures */}
        <Creature position={[0, 0.5, 8]} color="#ffcb05" type="wander" />
        <Creature position={[6, 1, -2]} color="#7dd3fc" type="fly" />
        <Bridge position={[0, 0, 9]} length={4} />
      </group>

      {/* === FOREST ROUTE === */}
      <group position={[0, 0, -40]}>
        {Array.from({ length: 35 }).map((_, i) => {
          const a = (i / 35) * Math.PI * 2 + rng() * 0.3;
          const r = 3 + rng() * 10;
          return <Tree key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]} scale={0.7 + rng() * 0.8} color="#2d7a4f" />;
        })}
        {/* Inner clearing */}
        <Tree position={[0, 0, 0]} scale={1.5} color="#2d7a4f" />
        <Rock position={[2, 0, 2]} scale={0.8} />
        <Rock position={[-3, 0, -1]} scale={1.2} />
        <Rock position={[1, 0, -3]} scale={0.6} />
        <Rock position={[-2, 0, 4]} scale={0.9} />
        <Bridge position={[0, 0, 7]} length={3} />
        <Waterfall position={[5, 3, -2]} height={3} width={1.5} />
        {Array.from({ length: 8 }).map((_, i) => (
          <Firefly key={i} position={[(rng() - 0.5) * 12, 1 + rng() * 2, (rng() - 0.5) * 12]} color="#5fba7d" />
        ))}
        <Creature position={[3, 0.5, -2]} color="#5fba7d" type="wander" />
        <Creature position={[-4, 1, 3]} color="#a78bfa" type="fly" />
        <Crystal position={[-2, 1, 0]} color="#5fba7d" />
        <Signpost position={[0, 0, 8]} />
      </group>

      {/* === RIVER VALLEY === */}
      <group position={[35, 0, -30]}>
        <WaterPlane position={[0, 0.05, 0]} size={[20, 20]} color="#3b82f6" />
        <Bridge position={[0, 0, 0]} length={8} rotation={Math.PI / 2} />
        <Dock position={[6, 0, 4]} rotation={-Math.PI / 4} length={3} />
        <Dock position={[-6, 0, -3]} rotation={Math.PI / 3} length={3} />
        <Waterfall position={[-8, 3, 2]} height={3} width={2} />
        <Rock position={[-5, 0, -3]} scale={1} />
        <Rock position={[5, 0, 3]} scale={0.8} />
        <Rock position={[3, 0, -5]} scale={1.1} />
        <Tree position={[-7, 0, 2]} scale={1.2} color="#4a9e5f" />
        <Tree position={[7, 0, -2]} scale={1} color="#4a9e5f" />
        <Tree position={[-4, 0, 6]} scale={0.9} />
        <Tree position={[6, 0, 6]} scale={1.1} color="#4a9e5f" />
        <NPC position={[4, 0, 4]} color="#3b82f6" />
        <Creature position={[3, 0.3, -3]} color="#7dd3fc" type="wander" />
        <Creature position={[0, 1, 5]} color="#67e8f9" type="fly" />
      </group>

      {/* === COASTAL CITY (Projects) === */}
      <group position={[40, 0, 15]}>
        <WaterPlane position={[12, 0.05, 12]} size={[24, 24]} color="#1e6bb8" />
        <Lighthouse position={[15, 0, 15]} />
        <Dock position={[10, 0, 5]} length={4} />
        <Dock position={[14, 0, 8]} rotation={Math.PI / 2} length={3} />
        {PROJECTS.map((p, i) => {
          const angle = (i / PROJECTS.length) * Math.PI * 2;
          const r = 7;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={p.id}>
              <Building position={[px, 0, pz]} height={2.5 + (i % 3) * 0.8} color={p.color} rotation={angle} />
              <Beacon position={[px, 0, pz]} color={p.color} />
            </group>
          );
        })}
        <LampPost position={[-4, 0, 0]} />
        <LampPost position={[4, 0, -3]} />
        <LampPost position={[0, 0, 5]} />
        <NPC position={[0, 0, 3]} color="#ff5a3c" />
        <NPC position={[-2, 0, -2]} color="#ffcb05" />
        <NPC position={[3, 0, 4]} color="#3b82f6" />
        {/* Palm-like trees */}
        <Tree position={[-6, 0, 4]} scale={0.8} color="#4a9e5f" />
        <Tree position={[6, 0, -5]} scale={0.7} color="#4a9e5f" />
      </group>

      {/* === TECH CITY (Skills) === */}
      <group position={[10, 0, 35]}>
        {SKILL_GROUPS.map((s, i) => {
          const angle = (i / SKILL_GROUPS.length) * Math.PI * 2;
          const r = 6;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={s.title}>
              <Building position={[px, 0, pz]} height={3.5 + (i % 2)} color={s.color} rotation={angle} />
              <Crystal position={[px, 1.5, pz]} color={s.color} />
              <Beacon position={[px, 0, pz]} color={s.color} />
            </group>
          );
        })}
        {/* Central tower */}
        <Building position={[0, 0, 0]} height={6} color="#1a1a2e" />
        <LampPost position={[-5, 0, 5]} />
        <LampPost position={[5, 0, -5]} />
        <LampPost position={[5, 0, 5]} />
        <NPC position={[2, 0, 2]} color="#3b82f6" />
        <NPC position={[-3, 0, -2]} color="#5fba7d" />
      </group>

      {/* === GYM DISTRICT (Badges) === */}
      <group position={[-30, 0, 25]}>
        {BADGES.map((b, i) => {
          const angle = (i / BADGES.length) * Math.PI * 2;
          const r = 7;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={b.id}>
              <Gym position={[px, 0, pz]} color={b.color} rotation={angle} />
              <Beacon position={[px, 0, pz]} color={b.color} />
            </group>
          );
        })}
        <Signpost position={[0, 0, 9]} />
        <LampPost position={[-4, 0, 4]} />
        <LampPost position={[4, 0, -4]} />
        <NPC position={[3, 0, 3]} color="#ee1515" />
        <NPC position={[-3, 0, -2]} color="#3b82f6" />
        <Tree position={[0, 0, -5]} scale={1.1} />
      </group>

      {/* === MOUNTAIN REGION (Certs) === */}
      <group position={[-35, 0, -15]}>
        <Mountain position={[0, 0, 0]} scale={2.5} color="#7a6a57" />
        <Mountain position={[6, 0, -3]} scale={2} color="#6b5b47" />
        <Mountain position={[-5, 0, 3]} scale={1.5} color="#8b7a67" />
        <Cabin position={[3, 0, 4]} rotation={Math.PI / 6} />
        <Cabin position={[-4, 0, -5]} rotation={-Math.PI / 4} />
        {CERTS.map((c, i) => {
          const angle = (i / CERTS.length) * Math.PI * 2;
          const r = 5;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={c.title}>
              <Crystal position={[px, 1, pz]} color="#ffcb05" />
              <Beacon position={[px, 0, pz]} color="#ffcb05" />
            </group>
          );
        })}
        <Rock position={[2, 0, 3]} scale={1.5} />
        <Rock position={[-2, 0, -3]} scale={1.2} />
        <Rock position={[4, 0, -1]} scale={1} />
        <Bridge position={[0, 0, 7]} length={3} />
        <Waterfall position={[7, 4, -2]} height={4} width={1.5} />
      </group>

      {/* === ICE REGION === */}
      <group position={[-20, 0, -40]}>
        <SnowParticles area={[30, 20, 30]} count={100} />
        <Tree position={[-4, 0, 0]} scale={1} color="#d0e8ff" trunkColor="#a0c0d0" />
        <Tree position={[4, 0, -2]} scale={1.2} color="#c0d8f0" trunkColor="#a0c0d0" />
        <Tree position={[0, 0, 4]} scale={0.9} color="#d0e8ff" trunkColor="#a0c0d0" />
        <Tree position={[-5, 0, -4]} scale={1.1} color="#c0d8f0" trunkColor="#a0c0d0" />
        <Rock position={[2, 0, 2]} scale={1} color="#b0d0e0" />
        <Rock position={[-2, 0, -3]} scale={1.3} color="#a0c0d0" />
        <WaterPlane position={[0, 0.05, 0]} size={[10, 10]} color="#7dd3fc" />
        <Mountain position={[6, 0, -6]} scale={2} color="#b0d0e0" />
        <Cabin position={[3, 0, 3]} />
        <Creature position={[2, 0.5, 2]} color="#e0f0ff" type="wander" />
        <Firefly position={[0, 2, 0]} color="#7dd3fc" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Firefly key={i} position={[(rng() - 0.5) * 15, 1 + rng() * 2, (rng() - 0.5) * 15]} color="#a0d8f0" />
        ))}
      </group>

      {/* === FINAL SUMMIT === */}
      <group position={[0, 20, -60]}>
        <mesh receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[5, 6, 0.5, 16]} />
          <meshStandardMaterial color="#d4c5a9" roughness={0.8} flatShading />
        </mesh>
        <Mountain position={[0, -3, 0]} scale={4} color="#6b5b47" />
        <Beacon position={[0, 0, 0]} color="#ffcb05" />
        <Crystal position={[0, 2.5, 0]} color="#ffcb05" />
        {Array.from({ length: 12 }).map((_, i) => (
          <Firefly key={i} position={[(rng() - 0.5) * 8, 1 + rng() * 4, (rng() - 0.5) * 8]} color="#ffcb05" />
        ))}
      </group>

      {/* Background mountains */}
      <Mountain position={[-60, 0, -55]} scale={4} color="#5a6a7a" />
      <Mountain position={[60, 0, -55]} scale={3.5} color="#5a6a7a" />
      <Mountain position={[65, 0, 45]} scale={3} color="#6a7a8a" />
      <Mountain position={[-65, 0, 45]} scale={3.5} color="#5a6a7a" />
      <Mountain position={[0, 0, -75]} scale={5} color="#4a5a6a" />

      {/* Ambient creatures */}
      <Creature position={[15, 0.5, 10]} color="#ffcb05" type="wander" />
      <Creature position={[-15, 1, -20]} color="#7dd3fc" type="fly" />
      <Creature position={[20, 1.5, -10]} color="#ff5a3c" type="fly" />
      <Creature position={[-10, 0.5, 15]} color="#a78bfa" type="wander" />
    </>
  );
}

function TerrainGround() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(GROUND_SIZE, GROUND_SIZE, 60, 60);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.hypot(x, y);
      const noise = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 0.3;
      const mountainFactor = Math.max(0, (dist - 50) / 30);
      pos.setZ(i, noise + mountainFactor * mountainFactor * 3);
    }
    pos.needsUpdate = true;
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color="#5fba7d" roughness={0.95} flatShading />
    </mesh>
  );
}

function PathNetwork() {
  const paths = useMemo(() => {
    const points: [THREE.Vector3, THREE.Vector3][] = [
      [new THREE.Vector3(0, 0.02, 6), new THREE.Vector3(0, 0.02, -32)],
      [new THREE.Vector3(5, 0.02, 6), new THREE.Vector3(10, 0.02, 28)],
      [new THREE.Vector3(-5, 0.02, 6), new THREE.Vector3(-25, 0.02, 22)],
      [new THREE.Vector3(0, 0.02, -35), new THREE.Vector3(32, 0.02, -25)],
      [new THREE.Vector3(35, 0.02, -20), new THREE.Vector3(38, 0.02, 10)],
      [new THREE.Vector3(35, 0.02, 18), new THREE.Vector3(15, 0.02, 32)],
      [new THREE.Vector3(-30, 0.02, 22), new THREE.Vector3(-33, 0.02, -8)],
      [new THREE.Vector3(-35, 0.02, -18), new THREE.Vector3(-22, 0.02, -35)],
    ];
    return points;
  }, []);

  return (
    <group>
      {paths.map(([a, b], i) => {
        const mid = a.clone().lerp(b, 0.5);
        const dist = a.distanceTo(b);
        const angle = Math.atan2(b.x - a.x, b.z - a.z);
        return (
          <mesh key={i} position={[mid.x, 0.03, mid.z]} rotation={[-Math.PI / 2, 0, -angle]}>
            <planeGeometry args={[2, dist]} />
            <meshStandardMaterial color="#c4a87a" transparent opacity={0.5} roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}
