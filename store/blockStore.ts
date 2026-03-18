import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BlockType = 'focus' | 'app_limit' | 'custom' | 'relaxation';

export interface Block {
  id: string;
  type: BlockType;
  name: string;
  icon: string;
  iconColor: string;
  gradientColors?: string[];
  schedule: string;
  tagline: string;
  enabled: boolean;
  usageLimit?: number; // minutes
  usedMinutes?: number;
  blockedApps?: string[];
}

interface BlockStore {
  blocks: Block[];
  totalScreenTime: number; // minutes today
  addBlock: (block: Omit<Block, 'id'>) => void;
  toggleBlock: (id: string) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  toggleBlockedApp: (blockId: string, appName: string) => void;
}

const initialBlocks: Block[] = [
  {
    id: '1',
    type: 'focus',
    name: 'Deep Work',
    icon: 'bullseye-arrow',
    iconColor: '#6D5BFF',
    gradientColors: ['#6D5BFF', '#A27DFF'],
    schedule: 'Mon–Fri, 9:00–12:00',
    tagline: 'Stay focused on your most important tasks.',
    enabled: true,
    usageLimit: 120,
    usedMinutes: 45,
    blockedApps: ['Slack', 'Chrome', 'Mail'],
  },
  {
    id: '2',
    type: 'relaxation',
    name: 'Evening Chill',
    icon: 'cake-variant-outline',
    iconColor: '#FF6B6B',
    gradientColors: ['#FF6B6B', '#FFA94D'],
    schedule: 'Daily, 20:00–22:00',
    tagline: 'Time to disconnect and recharge.',
    enabled: true,
    blockedApps: ['Instagram', 'TikTok', 'X'],
  },
  {
    id: '3',
    type: 'app_limit',
    name: 'App Limit',
    icon: 'timer-outline',
    iconColor: '#2A3A4A',
    schedule: 'Every day, Usage limit: 30m',
    tagline: 'Free yourself from nonstop scrolling.',
    enabled: true,
    usageLimit: 30,
    usedMinutes: 18,
  },
  {
    id: '4', // Changed ID to avoid duplicate
    type: 'custom',
    name: 'Time for Myself',
    icon: 'cake-variant-outline',
    iconColor: '#FF6B6B',
    gradientColors: ['#FF6B6B', '#FFA94D'],
    schedule: 'Weekdays, 5:00 PM – 6:00 PM',
    tagline: 'Dedicated time for self-care and relaxation.',
    enabled: false,
  },
];

export const useBlockStore = create<BlockStore>()(
  persist(
    (set) => ({
      totalScreenTime: 63,
      blocks: initialBlocks,
      addBlock: (blockData) =>
        set((state) => ({
          blocks: [
            ...state.blocks,
            { ...blockData, id: Math.random().toString(36).substring(7) },
          ],
        })),
      toggleBlock: (id) =>
        set((state) => ({
          blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, enabled: !b.enabled } : b
          ),
        })),
      removeBlock: (id) =>
        set((state) => ({ blocks: state.blocks.filter((b) => b.id !== id) })),
      updateBlock: (id, updates) =>
        set((state) => ({
          blocks: state.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
        })),
      toggleBlockedApp: (blockId, appName) =>
        set((state) => ({
          blocks: state.blocks.map((b) => {
            if (b.id !== blockId) return b;
            const currentApps = b.blockedApps || [];
            const newApps = currentApps.includes(appName)
              ? currentApps.filter((a) => a !== appName)
              : [...currentApps, appName];
            return { ...b, blockedApps: newApps };
          }),
        })),
    }),
    {
      name: 'block-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
