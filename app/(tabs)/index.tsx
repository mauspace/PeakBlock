import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBlockStore } from '../../store/blockStore';
import BlockCard from '../../components/BlockCard';
import AddBlockModal from '../../components/AddBlockModal';
import StatsHeader from '../../components/StatsHeader';

export default function BlockingScreen() {
  const { blocks, isLoading } = useBlockStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>PeakBlock</Text>
            <Text style={styles.headerTagline}>Focus Without Limits</Text>
          </View>
          <View style={styles.headerActions}>
            <MaterialCommunityIcons 
              name={isLoading ? "cloud-sync" : "cloud-check"} 
              size={20} 
              color={isLoading ? "#8B85CC" : "#5B5BD6"} 
            />
          </View>
        </View>

        {/* Blocks list */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Schedules</Text>
          </View>

          {blocks.map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}

          {/* Add new block */}
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => setShowModal(true)}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#5B5BD6" />
            <Text style={styles.addCardText}>Add a new block</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <AddBlockModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F4F3FF',
  },
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    marginBottom: 10,
  },
  headerActions: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 2 },
    } as any),
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: 'SyneExtraBold',
    color: '#5B5BD6',
    letterSpacing: -1.5,
  },
  headerTagline: {
    fontSize: 11,
    fontFamily: 'DMSansRegular',
    color: '#8B85CC',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: -4,
  },
  sectionHeader: {
    paddingHorizontal: 4,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderStyle: 'dashed',
    marginTop: 8,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8 },
      android: { elevation: 1 },
    } as any),
  },
  addCardText: {
    color: '#5B5BD6',
    fontFamily: 'DMSansMedium',
    fontSize: 16,
  },
});
