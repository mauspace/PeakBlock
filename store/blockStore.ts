import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BlockType = 'focus' | 'app_limit' | 'custom' | 'relaxation';

export interface Block {
  id: string;
  type: BlockType;
  name: string;
  icon: string;
  gradientColors: string[];
  schedule: string;
  tagline: string;
  isEnabled: boolean;
  usageLimit?: number; // minutes
  usedMinutes?: number;
  blockedApps: string[];
}

interface BlockStore {
  blocks: Block[];
  totalScreenTime: number;
  hasCompletedOnboarding: boolean;
  addBlock: (block: Omit<Block, 'id'>) => void;
  toggleBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  toggleBlockedApp: (blockId: string, appName: string) => void;
  completeOnboarding: () => void;
}

const initialBlocks: Block[] = [
  {
    id: '1',
    type: 'focus',
    name: 'Deep Work',
    icon: 'bullseye-arrow',
    gradientColors: ['#5B5BD6', '#8B5CF6'],
    schedule: 'Mon–Fri, 9:00–12:00',
    tagline: 'Stay focused on your most important tasks.',
    isEnabled: true,
    usageLimit: 120,
    blockedApps: ['Instagram', 'TikTok', 'Twitter'],
  },
  {
    id: '2',
    name: 'App Limit',
    icon: 'timer-outline',
    gradientColors: ['#0D0C1D', '#4040B8'],
    schedule: 'Every day, Usage limit: 30m',
    tagline: 'Free yourself from nonstop scrolling.',
    type: 'app_limit',
    isEnabled: false,
    usageLimit: 30,
    blockedApps: ['Facebook', 'YouTube'],
  },
  {
    id: '3',
    name: 'Time for Myself',
    icon: 'cake-variant-outline',
    gradientColors: ['#FF6B6B', '#FFA94D'],
    schedule: 'Weekdays, 5:00 PM – 6:00 PM',
    tagline: 'Dedicated time for self-care and relaxation.',
    type: 'relaxation',
    isEnabled: true,
    blockedApps: ['Work Mail', 'Slack'],
  },
];

export const useBlockStore = create<BlockStore>()(
  persist(
    (set) => ({
      totalScreenTime: 63,
      blocks: initialBlocks,
      hasCompletedOnboarding: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      addBlock: (blockData) =>
        set((state) => ({
          blocks: [
            ...state.blocks,
            {
              ...blockData,
              id: Math.random().toString(36).substring(7),
              blockedApps: blockData.blockedApps || [], // Ensure blockedApps is an array
            },
          ],
        })),
      toggleBlock: (id) =>
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, isEnabled: !b.isEnabled } : b
          ),
        })),
      removeBlock: (id) =>
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id),
        })),
      updateBlock: (id, updates) =>
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        })),
      toggleBlockedApp: (blockId, appName) =>
        set((state) => ({
          blocks: state.blocks.map((b) => {
            if (b.id !== blockId) return b;
            const currentApps = b.blockedApps || []; // Ensure currentApps is an array
            const exists = currentApps.includes(appName);
            return {
              ...b,
              blockedApps: exists
                ? currentApps.filter((a) => a !== appName)
                : [...currentApps, appName],
            };
          }),
        })),
    }),
    {
      name: 'peakblock-storage', // Updated storage name
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
