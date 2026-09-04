import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
  const { fastTravelTarget, clearFastTravel } = useGame();
  const playerPosition = useRef(new THREE.Vector3(0, 1.2, 5));
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  useMemo(() => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    if (isMobile || cores <= 4) setQuality('medium');
    if (isMobile && cores <= 2) setQuality('low');
  }, []);

  return (
    <Canvas
      shadows={quality !== 'low'}
      dpr={quality === 'high' ? [1, 2] : quality === 'medium' ? [1, 1.5] : 1}
      camera={{ fov: 60, near: 0.1, far: 300, position: [0, 6, 15] }}
      gl={{ antialias: quality !== 'low', powerPreference: 'high-performance' }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2('#b8d4e8', 0.006);
      }}
    >
      <SkyAndLighting quality={quality} />
      <World playerPosition={playerPosition} />
      <Player
        controlsRef={controlsRef}
        onMove={(pos) => playerPosition.current.copy(pos)}
        onInteract={onInteract}
      />
      {fastTravelTarget && (
        <FastTravel target={fastTravelTarget} onComplete={clearFastTravel} playerPosition={playerPosition} />
      )}
    </Canvas>
  );
}

function SkyAndLighting({ quality }: { quality: 'high' | 'medium' | 'low' }) {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const hemiRef = useRef<THREE.HemisphereLight>(null);
  const skyRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0.25);

  useFrame((_, dt) => {
    timeRef.current += dt * 0.008;
    const t = timeRef.current;
    const phase = t % 1;
    const sunAngle = phase * Math.PI * 2;
    const sunY = Math.sin(sunAngle);
    const sunX = Math.cos(sunAngle);

    if (lightRef.current) {
      lightRef.current.position.set(sunX * 40, Math.max(5, sunY * 35), 20);
      const intensity = Math.max(0.1, sunY) * 1.3 + 0.2;
      lightRef.current.intensity = intensity;
      const warmth = sunY > 0.3 ? 1 : sunY > 0 ? 0.7 : 0.3;
      lightRef.current.color.setRGB(1, warmth * 0.9, warmth * 0.7);
    }

    if (hemiRef.current) {
      const dayFactor = Math.max(0.2, sunY);
      hemiRef.current.intensity = dayFactor * 0.5 + 0.15;
      const skyColor = new THREE.Color().setHSL(0.55, 0.5, 0.3 + dayFactor * 0.3);
      hemiRef.current.color = skyColor;
    }

    if (skyRef.current) {
      const mat = skyRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms) {
        mat.uniforms.sunY.value = sunY;
        mat.uniforms.phase.value = phase;
      }
    }
  });

  const skyShader = useMemo(() => ({
    uniforms: {
      sunY: { value: 0.5 },
      phase: { value: 0.25 },
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vWorldPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float sunY;
      uniform float phase;
      varying vec3 vWorldPos;
      void main() {
        vec3 dir = normalize(vWorldPos);
        float h = max(dir.y, 0.0);
        float sunFactor = max(sunY, 0.0);

        vec3 dayTop = vec3(0.25, 0.5, 0.8);
        vec3 dayBot = vec3(0.6, 0.8, 0.95);
        vec3 sunsetTop = vec3(0.2, 0.15, 0.35);
        vec3 sunsetBot = vec3(0.9, 0.4, 0.2);
        vec3 nightTop = vec3(0.02, 0.02, 0.08);
        vec3 nightBot = vec3(0.05, 0.05, 0.15);

        vec3 topColor, botColor;
        if (sunY > 0.3) {
          topColor = dayTop;
          botColor = dayBot;
        } else if (sunY > -0.1) {
          float t = smoothstep(-0.1, 0.3, sunY);
          topColor = mix(sunsetTop, dayTop, t);
          botColor = mix(sunsetBot, dayBot, t);
        } else {
          topColor = nightTop;
          botColor = nightBot;
        }

        vec3 col = mix(botColor, topColor, pow(h, 0.5));

        if (sunY < 0.1 && sunY > -0.2) {
          float sunset = 1.0 - abs(sunY - 0.0) / 0.2;
          col = mix(col, vec3(0.95, 0.5, 0.2), sunset * 0.3 * (1.0 - h));
        }

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  }), []);

  return (
    <>
      <mesh ref={skyRef} scale={[-1, 1, 1]}>
        <sphereGeometry args={[250, 32, 16]} />
        <shaderMaterial args={[skyShader]} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      <ambientLight intensity={0.35} />
      <directionalLight
        ref={lightRef}
        position={[20, 30, 10]}
        intensity={1.2}
        castShadow={quality !== 'low'}
        shadow-mapSize={quality === 'high' ? 2048 : 1024}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-camera-near={0.5}
        shadow-camera-far={120}
        shadow-bias={-0.0005}
      />
      <hemisphereLight ref={hemiRef} args={['#b8d4e8', '#5fba7d', 0.4]} />
    </>
  );
}

function FastTravel({ target, onComplete, playerPosition }: {
  target: string;
  onComplete: () => void;
  playerPosition: React.MutableRefObject<THREE.Vector3>;
}) {
  const region = REGIONS.find((r) => r.id === target);
  useEffect(() => {
    if (region) {
      playerPosition.current.set(region.position[0], 1.2, region.position[2] + 3);
    }
    onComplete();
  }, [region, playerPosition, onComplete]);
  return null;
}
