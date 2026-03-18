# PeakBlock — Expo + Zustand

A premium, modern screen-time blocker app featuring the **Focus Without Limits** identity.

## Stack
- **Expo** (SDK 52) + **Expo Router** v4
- **Zustand** for state management
- **@expo/vector-icons** (MaterialCommunityIcons)
- **TypeScript**

## Getting Started

```bash
cd appblock
npm install
npx expo start
```

Then press:
- `i` for iOS Simulator
- `a` for Android Emulator
- Scan QR with **Expo Go** app on your phone

## File Structure

```
appblock/
├── app/
│   ├── _layout.tsx          # Root layout (SafeAreaProvider)
│   └── (tabs)/
│       ├── _layout.tsx      # Tabs slot
│       └── index.tsx        # Blocking screen (main)
├── components/
│   ├── BlockCard.tsx        # Individual block card with toggle
│   ├── AddBlockModal.tsx    # Bottom sheet to create a new block
│   ├── StatsHeader.tsx      # Screen time stats row
│   └── TabBar.tsx           # Custom bottom tab bar
├── store/
│   └── blockStore.ts        # Zustand store (blocks state)
└── app.json
```

## Features
- Toggle blocks on/off with animated Switch
- Usage bar for App Limit blocks
- Add custom blocks via bottom sheet modal
- Stats header (active blocks, total screen time)
- Dark theme throughout
- Zustand global state — no prop drilling
