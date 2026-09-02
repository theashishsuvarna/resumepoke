import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import {
  Tree, House, Rock, WaterPlane, Crystal, Building, Gym, NPC, Firefly,
  Bridge, Signpost, LampPost, Fountain, Mountain, SnowParticles, Creature, Beacon,
} from './Environment';
import { PROJECTS, SKILL_GROUPS, BADGES, CERTS, REGIONS, type RegionId } from './gameData';
import { useGame, type InteractableInfo } from './GameContext';

const GROUND_SIZE = 160;

type Props = {
  playerPosition: React.MutableRefObject<THREE.Vector3>;
};

export function World({ playerPosition }: Props) {
  const { discoverRegion, setNearbyInteractable, setCurrentRegion } = useGame();
  const lastRegion = useRef<RegionId | null>(null);
  const nearbyRef = useRef<InteractableInfo | null>(null);

  // Build interactable positions
  const interactables = useMemo(() => {
    const items: InteractableInfo[] = [];

    // Projects in coastal city
    PROJECTS.forEach((p, i) => {
      const angle = (i / PROJECTS.length) * Math.PI * 2;
      const r = 6;
      items.push({
        type: 'project',
        id: p.id,
        label: p.name,
        position: [40 + Math.cos(angle) * r, 0, 15 + Math.sin(angle) * r],
      });
    });

    // Skills in tech city
    SKILL_GROUPS.forEach((s, i) => {
      const angle = (i / SKILL_GROUPS.length) * Math.PI * 2;
      const r = 5;
      items.push({
        type: 'skill',
        id: s.title,
        label: s.title,
        position: [10 + Math.cos(angle) * r, 0, 35 + Math.sin(angle) * r],
      });
    });

    // Badges in gym district
    BADGES.forEach((b, i) => {
      const angle = (i / BADGES.length) * Math.PI * 2;
      const r = 6;
      items.push({
        type: 'badge',
        id: b.id,
        label: b.title,
        position: [-30 + Math.cos(angle) * r, 0, 25 + Math.sin(angle) * r],
      });
    });

    // Certs in mountain region
    CERTS.forEach((c, i) => {
      const angle = (i / CERTS.length) * Math.PI * 2;
      const r = 5;
      items.push({
        type: 'cert',
        id: c.title,
        label: c.title,
        position: [-35 + Math.cos(angle) * r, 0, -15 + Math.sin(angle) * r],
      });
    });

    // Trainer at summit
    items.push({
      type: 'trainer',
      id: 'trainer',
      label: 'TRAINER PROFILE',
      position: [0, 20, -60],
    });

    return items;
  }, []);

  useFrame(() => {
    const pp = playerPosition.current;
    if (!pp) return;

    // Region detection
    let nearestRegion: RegionId | null = null;
    let nearestDist = Infinity;
    for (const r of REGIONS) {
      const dx = pp.x - r.position[0];
      const dz = pp.z - r.position[2];
      const d = Math.hypot(dx, dz);
      if (d < 12 && d < nearestDist) {
        nearestDist = d;
        nearestRegion = r.id;
      }
    }
    if (nearestRegion && nearestRegion !== lastRegion.current) {
      lastRegion.current = nearestRegion;
      setCurrentRegion(nearestRegion);
      discoverRegion(nearestRegion);
    } else if (!nearestRegion && lastRegion.current) {
      lastRegion.current = null;
      setCurrentRegion(null);
    }

    // Interactable detection
    let nearest: InteractableInfo | null = null;
    let nearestIntDist = Infinity;
    for (const item of interactables) {
      const dx = pp.x - item.position[0];
      const dz = pp.z - item.position[2];
      const d = Math.hypot(dx, dz);
      if (d < 3 && d < nearestIntDist) {
        nearestIntDist = d;
        nearest = item;
      }
    }
    if (nearest?.id !== nearbyRef.current?.id) {
      nearbyRef.current = nearest;
      setNearbyInteractable(nearest);
    }
  });

  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[GROUND_SIZE, GROUND_SIZE]} />
        <meshStandardMaterial color="#5fba7d" />
      </mesh>

      {/* Paths connecting regions (simplified flat roads) */}
      <PathNetwork />

      {/* === STARTER VILLAGE === */}
      <group position={[0, 0, 0]}>
        <House position={[-3, 0, -2]} color="#f5e6d3" roofColor="#ee1515" />
        <House position={[3, 0, -3]} color="#e8d5b7" roofColor="#3b82f6" rotation={Math.PI / 6} />
        <House position={[-4, 0, 3]} color="#f0dcc0" roofColor="#5fba7d" rotation={-Math.PI / 8} />
        <House position={[4, 0, 2]} color="#f5e6d3" roofColor="#ffcb05" rotation={Math.PI / 4} />
        <Fountain position={[0, 0, 0]} />
        <LampPost position={[-2, 0, 2]} />
        <LampPost position={[2, 0, -1]} />
        <Signpost position={[0, 0, 5]} />
        <Tree position={[-6, 0, 0]} scale={1.2} />
        <Tree position={[6, 0, 1]} scale={0.9} />
        <Tree position={[-5, 0, -4]} scale={1} />
        <Tree position={[5, 0, -5]} scale={1.1} />
        <NPC position={[1.5, 0, 1.5]} color="#3b82f6" />
        <NPC position={[-2, 0, -1]} color="#ff5a3c" />
        <Creature position={[0, 0.5, 4]} color="#ffcb05" type="wander" />
        <Bridge position={[0, 0, 8]} length={4} />
      </group>

      {/* === FOREST ROUTE === */}
      <group position={[0, 0, -40]}>
        {Array.from({ length: 25 }).map((_, i) => {
          const a = (i / 25) * Math.PI * 2;
          const r = 4 + (i % 3) * 3;
          return <Tree key={i} position={[Math.cos(a) * r, 0, Math.sin(a) * r]} scale={0.8 + (i % 3) * 0.3} color="#3b9e5f" />;
        })}
        <Rock position={[2, 0, 2]} scale={0.8} />
        <Rock position={[-3, 0, -1]} scale={1.2} />
        <Rock position={[1, 0, -3]} scale={0.6} />
        <Bridge position={[0, 0, 6]} length={3} />
        {Array.from({ length: 5 }).map((_, i) => (
          <Firefly key={i} position={[(Math.random() - 0.5) * 8, 1 + Math.random() * 2, (Math.random() - 0.5) * 8]} color="#5fba7d" />
        ))}
        <Creature position={[3, 0.5, -2]} color="#5fba7d" type="wander" />
        <Crystal position={[-2, 1, 0]} color="#5fba7d" />
      </group>

      {/* === RIVER VALLEY === */}
      <group position={[35, 0, -30]}>
        <WaterPlane position={[0, 0.05, 0]} size={[16, 16]} color="#3b82f6" />
        <Bridge position={[0, 0, 0]} length={8} rotation={Math.PI / 2} />
        <Rock position={[-5, 0, -3]} scale={1} />
        <Rock position={[5, 0, 3]} scale={0.8} />
        <Tree position={[-6, 0, 2]} scale={1.2} color="#4a9e5f" />
        <Tree position={[6, 0, -2]} scale={1} color="#4a9e5f" />
        <Tree position={[-4, 0, 5]} scale={0.9} />
        <NPC position={[4, 0, 4]} color="#3b82f6" />
        <Creature position={[3, 0.3, -3]} color="#7dd3fc" type="wander" />
      </group>

      {/* === COASTAL CITY (Projects) === */}
      <group position={[40, 0, 15]}>
        <WaterPlane position={[8, 0.05, 8]} size={[20, 20]} color="#1e6bb8" />
        {PROJECTS.map((p, i) => {
          const angle = (i / PROJECTS.length) * Math.PI * 2;
          const r = 6;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={p.id}>
              <Building position={[px, 0, pz]} height={2 + (i % 3)} color={p.color} rotation={angle} />
              <Beacon position={[px, 0, pz]} color={p.color} />
            </group>
          );
        })}
        <LampPost position={[-3, 0, 0]} />
        <LampPost position={[3, 0, -3]} />
        <NPC position={[0, 0, 3]} color="#ff5a3c" />
        <NPC position={[-2, 0, -2]} color="#ffcb05" />
      </group>

      {/* === TECH CITY (Skills) === */}
      <group position={[10, 0, 35]}>
        {SKILL_GROUPS.map((s, i) => {
          const angle = (i / SKILL_GROUPS.length) * Math.PI * 2;
          const r = 5;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={s.title}>
              <Building position={[px, 0, pz]} height={3 + (i % 2)} color={s.color} rotation={angle} />
              <Crystal position={[px, 1.5, pz]} color={s.color} />
              <Beacon position={[px, 0, pz]} color={s.color} />
            </group>
          );
        })}
        <Building position={[0, 0, 0]} height={5} color="#1a1a2e" />
        <LampPost position={[-4, 0, 4]} />
        <LampPost position={[4, 0, -4]} />
        <NPC position={[2, 0, 2]} color="#3b82f6" />
      </group>

      {/* === GYM DISTRICT (Badges) === */}
      <group position={[-30, 0, 25]}>
        {BADGES.map((b, i) => {
          const angle = (i / BADGES.length) * Math.PI * 2;
          const r = 6;
          const px = Math.cos(angle) * r;
          const pz = Math.sin(angle) * r;
          return (
            <group key={b.id}>
              <Gym position={[px, 0, pz]} color={b.color} rotation={angle} />
              <Beacon position={[px, 0, pz]} color={b.color} />
            </group>
          );
        })}
        <Signpost position={[0, 0, 8]} />
        <NPC position={[3, 0, 3]} color="#ee1515" />
      </group>

      {/* === MOUNTAIN REGION (Certs) === */}
      <group position={[-35, 0, -15]}>
        <Mountain position={[0, 0, 0]} scale={2} color="#8b6f47" />
        <Mountain position={[4, 0, -2]} scale={1.5} color="#7a6a57" />
        <Mountain position={[-3, 0, 2]} scale={1.2} color="#6b5b47" />
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
        <Bridge position={[0, 0, 6]} length={3} />
      </group>

      {/* === ICE REGION === */}
      <group position={[-20, 0, -40]}>
        <SnowParticles area={[25, 15, 25]} count={80} />
        <Tree position={[-3, 0, 0]} scale={1} color="#e0f0ff" trunkColor="#a0c0d0" />
        <Tree position={[3, 0, -2]} scale={1.2} color="#d0e8ff" trunkColor="#a0c0d0" />
        <Tree position={[0, 0, 3]} scale={0.9} color="#e0f0ff" trunkColor="#a0c0d0" />
        <Rock position={[2, 0, 2]} scale={1} color="#b0d0e0" />
        <Rock position={[-2, 0, -3]} scale={1.3} color="#a0c0d0" />
        <WaterPlane position={[0, 0.05, 0]} size={[8, 8]} color="#7dd3fc" />
        <Mountain position={[5, 0, -5]} scale={1.5} color="#b0d0e0" />
        <Creature position={[2, 0.5, 2]} color="#e0f0ff" type="wander" />
        <Firefly position={[0, 2, 0]} color="#7dd3fc" />
      </group>

      {/* === FINAL SUMMIT === */}
      <group position={[0, 20, -60]}>
        <mesh receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[4, 5, 0.5, 16]} />
          <meshStandardMaterial color="#d4c5a9" flatShading />
        </mesh>
        <Mountain position={[0, -2, 0]} scale={3} color="#8b6f47" />
        <Beacon position={[0, 0, 0]} color="#ffcb05" />
        <Crystal position={[0, 2, 0]} color="#ffcb05" />
        {Array.from({ length: 10 }).map((_, i) => (
          <Firefly key={i} position={[(Math.random() - 0.5) * 6, 1 + Math.random() * 3, (Math.random() - 0.5) * 6]} color="#ffcb05" />
        ))}
      </group>

      {/* Background mountains */}
      <Mountain position={[-50, 0, -50]} scale={3} color="#6b7a8a" />
      <Mountain position={[50, 0, -50]} scale={2.5} color="#6b7a8a" />
      <Mountain position={[55, 0, 40]} scale={2} color="#7a8a9a" />
      <Mountain position={[-55, 0, 40]} scale={2.5} color="#6b7a8a" />

      {/* Ambient creatures */}
      <Creature position={[15, 0.5, 10]} color="#ffcb05" type="wander" />
      <Creature position={[-15, 1, -20]} color="#7dd3fc" type="fly" />
      <Creature position={[20, 1.5, -10]} color="#ff5a3c" type="fly" />
    </>
  );
}

function PathNetwork() {
  const pathGeo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // Village to forest
    points.push(new THREE.Vector3(0, 0.02, 5), new THREE.Vector3(0, 0.02, -30));
    // Village to tech city
    points.push(new THREE.Vector3(5, 0.02, 5), new THREE.Vector3(10, 0.02, 25));
    // Village to gym
    points.push(new THREE.Vector3(-5, 0.02, 5), new THREE.Vector3(-25, 0.02, 20));
    // Forest to river
    points.push(new THREE.Vector3(0, 0.02, -35), new THREE.Vector3(30, 0.02, -25));
    // River to coastal
    points.push(new THREE.Vector3(35, 0.02, -20), new THREE.Vector3(40, 0.02, 10));
    // Coastal to tech
    points.push(new THREE.Vector3(35, 0.02, 15), new THREE.Vector3(15, 0.02, 30));
    // Gym to mountain
    points.push(new THREE.Vector3(-30, 0.02, 20), new THREE.Vector3(-33, 0.02, -10));
    // Mountain to ice
    points.push(new THREE.Vector3(-35, 0.02, -18), new THREE.Vector3(-22, 0.02, -35));
    return points;
  }, []);

  return (
    <group>
      {Array.from({ length: pathGeo.length / 2 }).map((_, i) => {
        const a = pathGeo[i * 2];
        const b = pathGeo[i * 2 + 1];
        const mid = a.clone().lerp(b, 0.5);
        const dist = a.distanceTo(b);
        const angle = Math.atan2(b.x - a.x, b.z - a.z);
        return (
          <mesh key={i} position={[mid.x, 0.03, mid.z]} rotation={[-Math.PI / 2, 0, -angle]}>
            <planeGeometry args={[1.5, dist]} />
            <meshStandardMaterial color="#d4c5a9" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
