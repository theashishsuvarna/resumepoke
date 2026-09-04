import { useRef, useEffect, useState } from 'react';
import type { PlayerControls } from './Player';

type Props = {
  controlsRef: React.MutableRefObject<PlayerControls>;
  onInteract: () => void;
};

const joyCenter = { current: { x: 0, y: 0 } };

export function MobileControls({ controlsRef, onInteract }: Props) {
  const [isTouch, setIsTouch] = useState(false);
  const joystickRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const joyId = useRef<number | null>(null);
  const camId = useRef<number | null>(null);
  const camStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (!isTouch) return;

    const onJoyStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      joyId.current = t.identifier;
      const rect = joystickRef.current?.getBoundingClientRect();
      if (rect) joyCenter.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };
    const onJoyMove = (e: TouchEvent) => {
      e.preventDefault();
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        if (t.identifier === joyId.current) {
          const dx = t.clientX - joyCenter.current.x;
          const dy = t.clientY - joyCenter.current.y;
          const dist = Math.hypot(dx, dy);
          const max = 50;
          const clampedDist = Math.min(dist, max);
          const angle = Math.atan2(dy, dx);
          const kx = Math.cos(angle) * clampedDist;
          const ky = Math.sin(angle) * clampedDist;
          if (knobRef.current) knobRef.current.style.transform = `translate(${kx}px, ${ky}px)`;
          const nx = (clampedDist / max) * (dx / (dist || 1));
          const ny = (clampedDist / max) * (dy / (dist || 1));
          controlsRef.current.move = { x: nx, y: ny };
        }
      }
    };
    const onJoyEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === joyId.current) {
          joyId.current = null;
          if (knobRef.current) knobRef.current.style.transform = '';
          controlsRef.current.move = { x: 0, y: 0 };
        }
      }
    };

    const onCamStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      camId.current = t.identifier;
      camStart.current = { x: t.clientX, y: t.clientY };
    };
    const onCamMove = (e: TouchEvent) => {
      e.preventDefault();
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        if (t.identifier === camId.current) {
          const dx = t.clientX - camStart.current.x;
          const dy = t.clientY - camStart.current.y;
          camStart.current = { x: t.clientX, y: t.clientY };
          window.dispatchEvent(new MouseEvent('mousemove', { clientX: t.clientX + dx * 3, clientY: t.clientY + dy * 3 }));
        }
      }
    };
    const onCamEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === camId.current) camId.current = null;
      }
    };

    const joy = joystickRef.current;
    const cam = document.getElementById('cam-zone');
    joy?.addEventListener('touchstart', onJoyStart, { passive: false });
    joy?.addEventListener('touchmove', onJoyMove, { passive: false });
    joy?.addEventListener('touchend', onJoyEnd);
    joy?.addEventListener('touchcancel', onJoyEnd);
    cam?.addEventListener('touchstart', onCamStart, { passive: false });
    cam?.addEventListener('touchmove', onCamMove, { passive: false });
    cam?.addEventListener('touchend', onCamEnd);
    cam?.addEventListener('touchcancel', onCamEnd);

    return () => {
      joy?.removeEventListener('touchstart', onJoyStart);
      joy?.removeEventListener('touchmove', onJoyMove);
      joy?.removeEventListener('touchend', onJoyEnd);
      joy?.removeEventListener('touchcancel', onJoyEnd);
      cam?.removeEventListener('touchstart', onCamStart);
      cam?.removeEventListener('touchmove', onCamMove);
      cam?.removeEventListener('touchend', onCamEnd);
      cam?.removeEventListener('touchcancel', onCamEnd);
    };
  }, [isTouch, controlsRef]);

  if (!isTouch) return null;

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none select-none md:hidden">
      <div id="cam-zone" className="absolute top-0 right-0 w-1/2 h-full pointer-events-auto" />
      <div ref={joystickRef} className="absolute bottom-6 left-6 w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 pointer-events-auto">
        <div ref={knobRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/30 border border-white/40" />
      </div>
      <div className="absolute bottom-6 right-6 flex flex-col gap-3 items-end pointer-events-auto">
        <button onPointerDown={() => { controlsRef.current.jump = true; }} onPointerUp={() => { controlsRef.current.jump = false; }} className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white font-bold text-xs flex items-center justify-center active:bg-white/30">JUMP</button>
        <button onPointerDown={() => { controlsRef.current.sprint = true; }} onPointerUp={() => { controlsRef.current.sprint = false; }} className="w-14 h-14 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/40 text-white font-bold text-xs flex items-center justify-center active:bg-emerald-500/50">RUN</button>
        <button onPointerDown={onInteract} className="w-16 h-16 rounded-full bg-amber-400/40 backdrop-blur-md border border-amber-400/50 text-white font-bold text-sm flex items-center justify-center active:bg-amber-400/60">E</button>
      </div>
    </div>
  );
}
