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
const WORLD_BOUNDS = 70;

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

    // Movement relative to camera angle
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

    // Jump
    if (c.jump && onGround.current) {
      velocity.current.y = JUMP_FORCE;
      onGround.current = false;
    }

    // Gravity
    velocity.current.y -= GRAVITY * dt;

    // Apply
    mesh.position.x += velocity.current.x * dt;
    mesh.position.z += velocity.current.z * dt;
    mesh.position.y += velocity.current.y * dt;

    // Ground collision
    if (mesh.position.y <= PLAYER_HEIGHT) {
      mesh.position.y = PLAYER_HEIGHT;
      velocity.current.y = 0;
      onGround.current = true;
    }

    // World bounds
    const b = worldBounds;
    mesh.position.x = THREE.MathUtils.clamp(mesh.position.x, -b, b);
    mesh.position.z = THREE.MathUtils.clamp(mesh.position.z, -b, b);

    // Smooth rotation
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, facing.current, 0.15);

    // Walk animation
    const moving = Math.hypot(velocity.current.x, velocity.current.z);
    if (moving > 0.5) {
      setWalkPhase((p) => (p + dt * speed * 1.5) % (Math.PI * 2));
    }

    // Camera follow
    const targetPos = mesh.position;
    camTarget.current.lerp(targetPos, 0.1);

    const camX = camTarget.current.x + Math.sin(camAngle.current) * camDist.current;
    const camZ = camTarget.current.z + Math.cos(camAngle.current) * camDist.current;
    const camY = camTarget.current.y + camHeight.current;

    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.08);
    camera.lookAt(camTarget.current.x, camTarget.current.y + 1, camTarget.current.z);

    onMove?.(mesh.position);
  });

  return (
    <group ref={meshRef} position={[0, PLAYER_HEIGHT, 5]}>
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]}>
        <capsuleGeometry args={[0.35, 0.6, 4, 8]} />
        <meshStandardMaterial color="#ee1515" />
      </mesh>
      {/* Head */}
      <mesh castShadow position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#fdd9b5" />
      </mesh>
      {/* Hat brim */}
      <mesh castShadow position={[0, 0.82, 0.05]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.05, 16]} />
        <meshStandardMaterial color="#ee1515" />
      </mesh>
      {/* Hat cap */}
      <mesh castShadow position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ee1515" />
      </mesh>
      {/* Hat front panel */}
      <mesh position={[0, 0.88, 0.22]}>
        <boxGeometry args={[0.2, 0.12, 0.1]} />
        <meshStandardMaterial color="#3b9e5f" />
      </mesh>
      {/* Arms */}
      <mesh castShadow position={[0.4, 0.1, 0]} rotation={[0, 0, -0.3 + Math.sin(walkPhase) * 0.4]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 6]} />
        <meshStandardMaterial color="#fdd9b5" />
      </mesh>
      <mesh castShadow position={[-0.4, 0.1, 0]} rotation={[0, 0, 0.3 - Math.sin(walkPhase) * 0.4]}>
        <capsuleGeometry args={[0.12, 0.4, 4, 6]} />
        <meshStandardMaterial color="#fdd9b5" />
      </mesh>
      {/* Legs */}
      <mesh castShadow position={[0.18, -0.55, 0]} rotation={[Math.sin(walkPhase) * 0.5, 0, 0]}>
        <capsuleGeometry args={[0.14, 0.35, 4, 6]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh castShadow position={[-0.18, -0.55, 0]} rotation={[-Math.sin(walkPhase) * 0.5, 0, 0]}>
        <capsuleGeometry args={[0.14, 0.35, 4, 6]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      {/* Shadow blob */}
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 16]} />
        <meshBasicMaterial color="#000000" opacity={0.15} transparent />
      </mesh>
    </group>
  );
}
