import { useEffect, useRef, useState } from 'react';

const PIKACHU_IMG = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';

type CursorState = 'default' | 'hover' | 'click';

export default function PokeCursor() {
  const imgRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const enabled = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    enabled.current = mq.matches;
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      const el = e.target as HTMLElement;
      if (!el) return;
      if (el.closest('[data-cursor], a, button')) {
        setState('hover');
      } else {
        setState('default');
      }
    };

    const onDown = () => setState('click');
    const onUp = () => setState('default');

    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  if (!enabled.current) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-hidden>
      <style>{`
        @keyframes pikachu-run {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          50% { transform: translateY(0) rotate(-2deg); }
          75% { transform: translateY(-2px) rotate(3deg); }
        }
        @keyframes pikachu-bounce {
          0%, 100% { transform: translateY(0) scale(1.25); }
          50% { transform: translateY(-6px) scale(1.3); }
        }
        @keyframes pikachu-squish {
          0%, 100% { transform: scale(1.1, 0.9); }
          50% { transform: scale(1.3, 1.15); }
        }
      `}</style>
      <div
        ref={imgRef}
        className="fixed top-0 left-0 will-change-transform"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            animation: state === 'hover'
              ? 'pikachu-bounce 0.4s ease-in-out infinite'
              : state === 'click'
                ? 'pikachu-squish 0.2s ease-in-out infinite'
                : 'pikachu-run 0.35s ease-in-out infinite',
            filter: 'drop-shadow(2px 2px 0 rgba(10,10,10,0.2))',
          }}
        >
          <img
            src={PIKACHU_IMG}
            alt=""
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
