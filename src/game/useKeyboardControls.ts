import { useEffect, useRef } from 'react';
import type { PlayerControls } from './Player';

export function useKeyboardControls(controlsRef: React.MutableRefObject<PlayerControls>) {
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const update = () => {
      const k = keys.current;
      const x = (k['d'] || k['arrowright'] ? 1 : 0) - (k['a'] || k['arrowleft'] ? 1 : 0);
      const y = (k['s'] || k['arrowdown'] ? 1 : 0) - (k['w'] || k['arrowup'] ? 1 : 0);
      controlsRef.current.move = { x, y };
      controlsRef.current.sprint = !!k['shift'];
      controlsRef.current.jump = !!k[' '];
    };

    const onKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true;
      update();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false;
      update();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [controlsRef]);
}
