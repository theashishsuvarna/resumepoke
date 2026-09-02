import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { RegionId } from './gameData';

type GameState = {
  discovered: Set<RegionId>;
  badges: Set<string>;
  currentRegion: RegionId | null;
  nearbyInteractable: InteractableInfo | null;
  activePanel: InteractableInfo | null;
  paused: boolean;
  loading: boolean;
  accessibleMode: boolean;
  discoverRegion: (id: RegionId) => void;
  earnBadge: (id: string) => void;
  setCurrentRegion: (id: RegionId | null) => void;
  setNearbyInteractable: (info: InteractableInfo | null) => void;
  setActivePanel: (info: InteractableInfo | null) => void;
  setPaused: (v: boolean) => void;
  setLoading: (v: boolean) => void;
  setAccessibleMode: (v: boolean) => void;
  fastTravel: (id: RegionId) => void;
  fastTravelTarget: RegionId | null;
  clearFastTravel: () => void;
};

export type InteractableInfo = {
  type: 'project' | 'skill' | 'badge' | 'cert' | 'trainer';
  id: string;
  label: string;
  position: [number, number, number];
};

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [discovered, setDiscovered] = useState<Set<RegionId>>(new Set());
  const [badges, setBadges] = useState<Set<string>>(new Set());
  const [currentRegion, setCurrentRegionState] = useState<RegionId | null>(null);
  const [nearbyInteractable, setNearbyInteractable] = useState<InteractableInfo | null>(null);
  const [activePanel, setActivePanel] = useState<InteractableInfo | null>(null);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessibleMode, setAccessibleMode] = useState(false);
  const [fastTravelTarget, setFastTravelTarget] = useState<RegionId | null>(null);

  const discoverRegion = useCallback((id: RegionId) => {
    setDiscovered((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const earnBadge = useCallback((id: string) => {
    setBadges((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const setCurrentRegion = useCallback((id: RegionId | null) => {
    setCurrentRegionState(id);
  }, []);

  const fastTravel = useCallback((id: RegionId) => {
    setFastTravelTarget(id);
  }, []);

  const clearFastTravel = useCallback(() => {
    setFastTravelTarget(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        discovered,
        badges,
        currentRegion,
        nearbyInteractable,
        activePanel,
        paused,
        loading,
        accessibleMode,
        discoverRegion,
        earnBadge,
        setCurrentRegion,
        setNearbyInteractable,
        setActivePanel,
        setPaused,
        setLoading,
        setAccessibleMode,
        fastTravel,
        fastTravelTarget,
        clearFastTravel,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
