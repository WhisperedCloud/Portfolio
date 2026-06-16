import { create } from 'zustand';

interface AppState {
  isVoiceEnabled: boolean;
  setVoiceEnabled: (val: boolean) => void;
  hoveredElement: string | null;
  setHoveredElement: (val: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isVoiceEnabled: false,
  setVoiceEnabled: (val) => set({ isVoiceEnabled: val }),
  hoveredElement: null,
  setHoveredElement: (val) => set({ hoveredElement: val }),
}));
