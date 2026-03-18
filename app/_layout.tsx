import { Stack } from 'expo-router';
import { View, Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {
  useFonts,
  Syne_800ExtraBold,
  Syne_600SemiBold
} from '@expo-google-fonts/syne';
import {
  DMSans_400Regular,
  DMSans_500Medium
} from '@expo-google-fonts/dm-sans';

import { useBlockStore } from '../store/blockStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const syncFromCloud = useBlockStore((state) => state.syncFromCloud);
  const [loaded, error] = useFonts({
    SyneExtraBold: Syne_800ExtraBold,
    SyneSemiBold: Syne_600SemiBold,
    DMSansRegular: DMSans_400Regular,
    DMSansMedium: DMSans_500Medium,
  });

  useEffect(() => {
    syncFromCloud();
  }, [syncFromCloud]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F4F3FF' },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
