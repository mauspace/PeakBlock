import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot,
  query,
  getDocs
} from 'firebase/firestore';

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
  addBlock: (block: Omit<Block, 'id'>) => Promise<void>;
  toggleBlock: (id: string) => Promise<void>;
  removeBlock: (id: string) => Promise<void>;
  updateBlock: (id: string, updates: Partial<Block>) => Promise<void>;
  toggleBlockedApp: (blockId: string, appName: string) => Promise<void>;
  completeOnboarding: () => void;
  syncFromCloud: () => void;
  isLoading: boolean;
}

const COLLECTION_NAME = 'blocks';

export const useBlockStore = create<BlockStore>()(
  persist(
    (set, get) => ({
      totalScreenTime: 63,
      blocks: [],
      hasCompletedOnboarding: false,
      isLoading: false,
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      
      syncFromCloud: () => {
        set({ isLoading: true });
        const q = query(collection(db, COLLECTION_NAME));
        return onSnapshot(q, 
          (snapshot) => {
            const blocks = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Block));
            set({ blocks, isLoading: false });
          },
          (error) => {
            console.error('Firestore sync error:', error);
            set({ isLoading: false });
          }
        );
      },

      addBlock: async (blockData) => {
        const docRef = doc(collection(db, COLLECTION_NAME));
        const newBlock: Block = {
          ...blockData,
          id: docRef.id,
          blockedApps: blockData.blockedApps || [],
        };
        
        // Optimistic update
        set((state) => ({ blocks: [...state.blocks, newBlock] }));
        
        try {
          await setDoc(docRef, newBlock);
        } catch (error) {
          console.error('Error adding block to Firestore:', error);
          // Rollback if needed, but let's keep it simple for now
        }
      },

      toggleBlock: async (id) => {
        const block = get().blocks.find(b => b.id === id);
        if (!block) return;
        
        const updatedBlock = { ...block, isEnabled: !block.isEnabled };
        
        set((state) => ({
          blocks: state.blocks.map((b) => b.id === id ? updatedBlock : b),
        }));
        
        try {
          await setDoc(doc(db, COLLECTION_NAME, id), updatedBlock);
        } catch (error) {
          console.error('Error toggling block in Firestore:', error);
        }
      },

      removeBlock: async (id) => {
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== id),
        }));
        try {
          await deleteDoc(doc(db, COLLECTION_NAME, id));
        } catch (error) {
          console.error('Error removing block from Firestore:', error);
        }
      },

      updateBlock: async (id, updates) => {
        const block = get().blocks.find(b => b.id === id);
        if (!block) return;
        
        const updatedBlock = { ...block, ...updates };
        
        set((state) => ({
          blocks: state.blocks.map((b) => b.id === id ? updatedBlock : b),
        }));
        
        try {
          await setDoc(doc(db, COLLECTION_NAME, id), updatedBlock);
        } catch (error) {
          console.error('Error updating block in Firestore:', error);
        }
      },

      toggleBlockedApp: async (blockId, appName) => {
        const block = get().blocks.find(b => b.id === blockId);
        if (!block) return;

        const currentApps = block.blockedApps || [];
        const exists = currentApps.includes(appName);
        const updatedApps = exists
          ? currentApps.filter((a) => a !== appName)
          : [...currentApps, appName];
        
        const updatedBlock = { ...block, blockedApps: updatedApps };
        
        set((state) => ({
          blocks: state.blocks.map((b) => b.id === blockId ? updatedBlock : b),
        }));
        
        try {
          await setDoc(doc(db, COLLECTION_NAME, blockId), updatedBlock);
        } catch (error) {
          console.error('Error updating blocked apps in Firestore:', error);
        }
      },
    }),
    {
      name: 'peakblock-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
