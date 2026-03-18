import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const APPS = [
  { name: 'Instagram', time: '2h 34m', percent: 85, color: '#E4405F', icon: 'instagram' },
  { name: 'YouTube', time: '1h 48m', percent: 60, color: '#FF0000', icon: 'youtube' },
];

export default function MostUsedApps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Used Apps</Text>
      <Text style={styles.subtitle}>Your top distractions this week</Text>

      {APPS.map((app) => (
        <View key={app.name} style={styles.appRow}>
          <View style={[styles.appIcon, { backgroundColor: app.color + '15' }]}>
            <MaterialCommunityIcons name={app.icon as any} size={22} color={app.color} />
          </View>
          <View style={styles.info}>
            <View style={styles.headerRow}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appUsage}>{app.time}</Text>
            </View>
            <View style={styles.barBg}>
              <View 
                style={[
                  styles.barFill, 
                  { width: `${app.percent}%`, backgroundColor: app.color }
                ]} 
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EBEBFF',
    ...Platform.select({
      ios: { shadowColor: '#5B5BD6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 12 },
      android: { elevation: 2 },
    } as any),
  },
  title: {
    fontSize: 10,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 20,
    marginLeft: 4,
  },
  subtitle: {
    display: 'none',
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appName: {
    fontSize: 16,
    fontFamily: 'SyneSemiBold',
    color: '#111',
  },
  appUsage: {
    fontSize: 12,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
  },
  barBg: {
    height: 6,
    backgroundColor: '#EBEBFF',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
