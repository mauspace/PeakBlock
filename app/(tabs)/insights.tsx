import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BarChart from '../../components/BarChart';
import MostUsedApps from '../../components/MostUsedApps';

export default function InsightsScreen() {
  // Placeholder for totalScreenTime, as it's used in the new code but not defined in the snippet.
  // In a real app, this would likely come from state or props.
  const totalScreenTime = '12.5h';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerSubtitle}>Weekly Overview</Text>
          <View style={styles.totalRow}>
            <Text style={styles.totalValue}>{totalScreenTime}</Text>
            <Text style={styles.totalLabel}>HOURS SAVED</Text>
          </View>
        </View>

        <View style={styles.statCards}>
          <View style={[styles.statCard, { borderLeftColor: '#22C55E' }]}>
            <View style={styles.statIconWrap}>
              <MaterialCommunityIcons name="trending-down" size={20} color="#22C55E" />
            </View>
            <View>
              <Text style={styles.statCardValue}>-23%</Text>
              <Text style={styles.statCardLabel}>This Week</Text>
            </View>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#5B5BD6' }]}>
            <View style={styles.statIconWrap}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#5B5BD6" />
            </View>
            <View>
              <Text style={styles.statCardValue}>3.5h</Text>
              <Text style={styles.statCardLabel}>Daily Avg</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activity</Text>
            <TouchableOpacity>
              <Text style={styles.seeMore}>This Week</Text>
            </TouchableOpacity>
          </View>
          <BarChart />
        </View>

        <View style={styles.appsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Used Apps</Text>
          </View>
          <MostUsedApps />
        </View>
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
    marginBottom: 32,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 8,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  totalValue: {
    fontSize: 56,
    fontFamily: 'SyneExtraBold',
    color: '#111',
    letterSpacing: -2,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'SyneSemiBold',
    color: '#5B5BD6',
  },
  statCards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    ...Platform.select({
      ios: { shadowColor: '#5B5BD6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 10 },
      android: { elevation: 2 },
    } as any),
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F4F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardValue: {
    fontSize: 18,
    fontFamily: 'SyneExtraBold',
    color: '#111',
  },
  statCardLabel: {
    fontSize: 12,
    fontFamily: 'DMSansRegular',
    color: '#8B85CC',
  },
  chartSection: {
    marginBottom: 32,
  },
  appsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  seeMore: {
    fontSize: 13,
    fontFamily: 'DMSansMedium',
    color: '#5B5BD6',
  },
});
