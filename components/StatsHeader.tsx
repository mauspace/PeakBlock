import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBlockStore } from '../store/blockStore';

export default function StatsHeader() {
  const { totalScreenTime, blocks } = useBlockStore();
  const activeBlocks = blocks.filter((b) => b.enabled).length;
  const hours = Math.floor(totalScreenTime / 60);
  const mins = totalScreenTime % 60;

  return (
    <View style={styles.container}>
      {/* Screen time pill */}
      <View style={styles.timePill}>
        <View style={styles.pillDot} />
        <Text style={styles.pillText}>
          {hours}h {mins}m
        </Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{activeBlocks}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{blocks.length}</Text>
          <Text style={styles.statLabel}>Blocks</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: '#4A9EFF' }]}>
            {hours}h {mins}m
          </Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef7ff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#d0e8ff',
    gap: 8,
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A9EFF',
  },
  pillText: {
    color: '#1a1a1a',
    fontSize: 15,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      }
    } as any),
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  divider: {
    width: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
  },
});
