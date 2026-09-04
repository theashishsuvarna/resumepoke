import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export type PlayerControls = {
  move: { x: number; y: number };
  sprint: boolean;
  jump: boolean;
  interact: boolean;
};

type Props = {
  controlsRef: React.MutableRefObject<PlayerControls>;
  onMove?: (pos: THREE.Vector3) => void;
  onInteract?: () => void;
  worldBounds?: number;
};

const PLAYER_HEIGHT = 1.2;
const PLAYER_SPEED = 8;
const SPRINT_SPEED = 14;
const JUMP_FORCE = 8;
const GRAVITY = 20;
const WORLD_BOUNDS = 80;

export function Player({ controlsRef, onMove, onInteract, worldBounds = WORLD_BOUNDS }: Props) {
  const meshRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3());
  const onGround = useRef(true);
  const facing = useRef(0);
  const { camera } = useThree();
  const [walkPhase, setWalkPhase] = useState(0);
  const interactPressed = useRef(false);
  const camAngle = useRef(0);
  const camDist = useRef(10);
  const camHeight = useRef(5);
  const camTarget = useRef(new THREE.Vector3());
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && !interactPressed.current) {
        interactPressed.current = true;
        onInteract?.();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyE') interactPressed.current = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    const onDown = (e: MouseEvent) => {
      dragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onUp = () => { dragging.current = false; };
    const onMove2 = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      camAngle.current -= dx * 0.005;
      camHeight.current = THREE.MathUtils.clamp(camHeight.current + dy * 0.02, 3, 12);
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onWheel = (e: WheelEvent) => {
      camDist.current = THREE.MathUtils.clamp(camDist.current + e.deltaY * 0.01, 6, 18);
    };

    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove2);
    window.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove2);
      window.removeEventListener('wheel', onWheel);
    };
  }, [onInteract]);

  useFrame((_, dt) => {
    const c = controlsRef.current;
    const mesh = meshRef.current;
    if (!mesh) return;

    const speed = c.sprint ? SPRINT_SPEED : PLAYER_SPEED;
    const moveX = c.move.x;
    const moveY = c.move.y;
    const len = Math.hypot(moveX, moveY);
    if (len > 0.01) {
      const angle = camAngle.current;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const wx = moveX * cos - moveY * sin;
      const wz = moveX * sin + moveY * cos;
      const norm = Math.min(1, len);
      velocity.current.x = (wx / len) * speed * norm;
      velocity.current.z = (wz / len) * speed * norm;
      facing.current = Math.atan2(wx, wz);
    } else {
      velocity.current.x *= 0.85;
      velocity.current.z *= 0.85;
    }

    if (c.jump && onGround.current) {
      velocity.current.y = JUMP_FORCE;
      onGround.current = false;
    }
    velocity.current.y -= GRAVITY * dt;

    mesh.position.x += velocity.current.x * dt;
    mesh.position.z += velocity.current.z * dt;
    mesh.position.y += velocity.current.y * dt;

    if (mesh.position.y <= PLAYER_HEIGHT) {
      mesh.position.y = PLAYER_HEIGHT;
      velocity.current.y = 0;
      onGround.current = true;
    }

    const b = worldBounds;
    mesh.position.x = THREE.MathUtils.clamp(mesh.position.x, -b, b);
    mesh.position.z = THREE.MathUtils.clamp(mesh.position.z, -b, b);

    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, facing.current, 0.15);

    const moving = Math.hypot(velocity.current.x, velocity.current.z);
    if (moving > 0.5) {
      setWalkPhase((p) => (p + dt * speed * 1.5) % (Math.PI * 2));
    }

    camTarget.current.lerp(mesh.position, 0.1);
    const camX = camTarget.current.x + Math.sin(camAngle.current) * camDist.current;
    const camZ = camTarget.current.z + Math.cos(camAngle.current) * camDist.current;
    const camY = camTarget.current.y + camHeight.current;
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.08);
    camera.lookAt(camTarget.current.x, camTarget.current.y + 1, camTarget.current.z);

    onMove?.(mesh.position);
  });

  return (
    <group ref={meshRef} position={[0, PLAYER_HEIGHT, 5]}>
      {/* Backpack */}
      <mesh castShadow position={[0, 0.15, -0.25]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.45, 0.55, 0.25]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.7} />
      </mesh>
      {/* Backpack strap */}
      <mesh position={[0.22, 0.15, -0.12]}>
        <boxGeometry args={[0.04, 0.5, 0.04]} />
        <meshStandardMaterial color="#1a4a35" roughness={0.8} />
      </mesh>
      <mesh position={[-0.22, 0.15, -0.12]}>
        <boxGeometry args={[0.04, 0.5, 0.04]} />
        <meshStandardMaterial color="#1a4a35" roughness={0.8} />
      </mesh>
      {/* Body / jacket */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.32, 0.55, 4, 8]} />
        <meshStandardMaterial color="#1a4c7a" roughness={0.6} />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshStandardMaterial color="#e8c4a0" roughness={0.5} />
      </mesh>
      {/* Hair */}
      <mesh castShadow position={[0, 0.78, -0.02]} rotation={[0.1, 0, 0]}>
        <sphereGeometry args={[0.27, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.8} />
      </mesh>
      {/* Headphones */}
      <mesh castShadow position={[0.24, 0.68, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh castShadow position={[-0.24, 0.68, 0]}>
        <boxGeometry args={[0.08, 0.12, 0.08]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Headphone band */}
      <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.025, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Arms */}
      <mesh castShadow position={[0.38, 0.1, 0]} rotation={[0, 0, -0.3 + Math.sin(walkPhase) * 0.4]}>
        <capsuleGeometry args={[0.1, 0.35, 4, 6]} />
        <meshStandardMaterial color="#1a4c7a" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[-0.38, 0.1, 0]} rotation={[0, 0, 0.3 - Math.sin(walkPhase) * 0.4]}>
        <capsuleGeometry args={[0.1, 0.35, 4, 6]} />
        <meshStandardMaterial color="#1a4c7a" roughness={0.6} />
      </mesh>
      {/* Legs */}
      <mesh castShadow position={[0.16, -0.55, 0]} rotation={[Math.sin(walkPhase) * 0.5, 0, 0]}>
        <capsuleGeometry args={[0.13, 0.3, 4, 6]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[-0.16, -0.55, 0]} rotation={[-Math.sin(walkPhase) * 0.5, 0, 0]}>
        <capsuleGeometry args={[0.13, 0.3, 4, 6]} />
        <meshStandardMaterial color="#2a2a3e" roughness={0.7} />
      </mesh>
      {/* Boots */}
      <mesh castShadow position={[0.16, -0.85, 0.05]} rotation={[Math.sin(walkPhase) * 0.5, 0, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh castShadow position={[-0.16, -0.85, 0.05]} rotation={[-Math.sin(walkPhase) * 0.5, 0, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Shadow blob */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 16]} />
        <meshBasicMaterial color="#000000" opacity={0.12} transparent />
      </mesh>
    </group>
  );
}
