import { useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Player, type PlayerControls } from './Player';
import { World } from './World';
import { useGame } from './GameContext';
import { REGIONS } from './gameData';

type Props = {
  controlsRef: React.MutableRefObject<PlayerControls>;
  onInteract: () => void;
};

export function GameScene({ controlsRef, onInteract }: Props) {
  const { fastTravelTarget, clearFastTravel, discoverRegion } = useGame();
  const playerPosition = useRef(new THREE.Vector3(0, 1.2, 5));
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  useMemo(() => {
    // Detect device capability
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    if (isMobile || cores <= 4) {
      setQuality('medium');
    }
    if (isMobile && cores <= 2) {
      setQuality('low');
    }
  }, []);

  return (
    <Canvas
      shadows={quality !== 'low'}
      dpr={quality === 'high' ? [1, 2] : quality === 'medium' ? [1, 1.5] : 1}
      camera={{ fov: 60, near: 0.1, far: 200, position: [0, 6, 15] }}
      gl={{ antialias: quality !== 'low', powerPreference: 'high-performance' }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.Fog('#a8d8ea', 30, 120);
      }}
    >
      <Lighting quality={quality} />

      <World playerPosition={playerPosition} />

      <Player
        controlsRef={controlsRef}
        onMove={(pos) => {
          playerPosition.current.copy(pos);
        }}
        onInteract={onInteract}
      />

      {/* Fast travel */}
      {fastTravelTarget && (
        <FastTravel
          target={fastTravelTarget}
          onComplete={() => {
            clearFastTravel();
          }}
          playerPosition={playerPosition}
        />
      )}
    </Canvas>
  );
}

function Lighting({ quality }: { quality: 'high' | 'medium' | 'low' }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[20, 30, 10]}
        intensity={1.2}
        castShadow={quality !== 'low'}
        shadow-mapSize={quality === 'high' ? 2048 : 1024}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.001}
      />
      <hemisphereLight args={['#a8d8ea', '#5fba7d', 0.4]} />
    </>
  );
}

function FastTravel({
  target,
  onComplete,
  playerPosition,
}: {
  target: string;
  onComplete: () => void;
  playerPosition: React.MutableRefObject<THREE.Vector3>;
}) {
  const region = REGIONS.find((r) => r.id === target);
  if (!region) {
    onComplete();
    return null;
  }

  // Teleport player
  useMemo(() => {
    playerPosition.current.set(region.position[0], 1.2, region.position[2] + 3);
  }, [region, playerPosition]);

  return null;
}
