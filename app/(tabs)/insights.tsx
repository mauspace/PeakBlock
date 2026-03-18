import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BarChart from '../../components/BarChart';

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.header}>Activity Insights</Text>
        
        {/* Main Chart Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Time Saved (Minutes)</Text>
            <Text style={styles.cardSubtitle}>Last 7 Days</Text>
          </View>
          <BarChart />
          <View style={styles.summaryBox}>
            <MaterialCommunityIcons name="trending-up" size={20} color="#69DB7C" />
            <Text style={styles.summaryText}>
              You saved <Text style={styles.highlight}>12% more</Text> time than last week.
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={[styles.statIcon, { backgroundColor: '#eef7ff' }]}>
              <MaterialCommunityIcons name="clock-check" size={24} color="#4A9EFF" />
            </View>
            <Text style={styles.statValue}>6.4h</Text>
            <Text style={styles.statLabel}>Daily Average</Text>
          </View>

          <View style={[styles.statCard, { flex: 1 }]}>
            <View style={[styles.statIcon, { backgroundColor: '#fdf2f2' }]}>
              <MaterialCommunityIcons name="shield-check" size={24} color="#FF6B6B" />
            </View>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Blocks Prevented</Text>
          </View>
        </View>

        <View style={styles.bottomCard}>
          <View style={styles.bottomCardContent}>
            <Text style={styles.bottomTitle}>Weekly Goal</Text>
            <Text style={styles.bottomText}>85% focus reached this week.</Text>
          </View>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>85%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: -1,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10,
      },
      android: { elevation: 2 },
    } as any),
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
    marginTop: 2,
  },
  summaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6fbf7',
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
    gap: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  highlight: {
    color: '#69DB7C',
    fontWeight: '700',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  bottomCard: {
    backgroundColor: '#6D5BFF',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomCardContent: {
    flex: 1,
  },
  bottomTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bottomText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
});
