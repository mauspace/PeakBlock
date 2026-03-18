import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function StrictModeScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  const features = [
    {
      id: 'strict',
      title: 'Enable Strict Mode',
      subtitle: 'No breaks allowed',
      icon: 'alert-circle-outline',
      iconColor: '#FF6B6B',
      bgColor: '#fff5f5',
      hasSwitch: true,
    },
    {
      id: 'distractions',
      title: 'Block All Distractions',
      subtitle: 'Completely disable access to blocked apps and websites during focus time.',
      icon: 'cellphone-lock',
      iconColor: '#6D5BFF',
      bgColor: '#eef2ff',
    },
    {
      id: 'breaks',
      title: 'No Breaks Allowed',
      subtitle: "Once started, you can't pause or skip your focus sessions until they're complete.",
      icon: 'clock-outline',
      iconColor: '#4A9EFF',
      bgColor: '#eef7ff',
    },
    {
      id: 'locked',
      title: 'Settings Locked',
      subtitle: 'Your blocking schedules cannot be modified during active sessions.',
      icon: 'lock-outline',
      iconColor: '#FFA94D',
      bgColor: '#fff9db',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={['#5B5BD6', '#8B5CF6']}
            style={styles.mainIconBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialCommunityIcons name="shield-lock" size={48} color="#fff" />
          </LinearGradient>
          <Text style={styles.title}>Strict Mode</Text>
          <Text style={styles.subtitle}>
            Enable peak performance. Block the rest without exceptions.
          </Text>
        </View>

        {features.map((feature) => (
          <View key={feature.id} style={styles.card}>
            <View style={[styles.iconBox, { backgroundColor: feature.bgColor }]}>
              <MaterialCommunityIcons name={feature.icon as any} size={24} color={feature.iconColor} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                {feature.hasSwitch && (
                  <Switch
                    value={isEnabled}
                    onValueChange={setIsEnabled}
                    trackColor={{ false: '#EBEBFF', true: '#5B5BD6' }}
                    thumbColor="#fff"
                  />
                )}
              </View>
              <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F3FF',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  mainIconBg: {
    width: 80,
    height: 80,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#5B5BD6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: 'SyneExtraBold',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'DMSansRegular',
    color: '#8B85CC',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBFF',
    ...Platform.select({
      ios: {
        shadowColor: '#5B5BD6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10,
      },
      android: { elevation: 2 },
    } as any),
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'SyneSemiBold',
    color: '#111',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: 'DMSansRegular',
    color: '#555',
    lineHeight: 20,
  },
});
