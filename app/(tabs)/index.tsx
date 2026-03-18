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
  const { blocks } = useBlockStore();
  const [showModal, setShowModal] = useState(false);

  const handleRefresh = () => {
    // Simulate refresh
    console.log('Refreshing stats...');
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safe} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AppBlock</Text>
          <TouchableOpacity style={styles.refreshBtn} onPress={handleRefresh}>
            <MaterialCommunityIcons name="refresh" size={20} color="#4A9EFF" />
          </TouchableOpacity>
        </View>

        <StatsHeader />

        {/* Section header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Blocking</Text>
        </View>

        {/* Blocks list */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {blocks.map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}

          {/* Add new block */}
          <TouchableOpacity
            style={styles.addCard}
            onPress={() => setShowModal(true)}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#4A9EFF" />
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
    backgroundColor: '#f8f9fb',
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
  },
  headerTitle: {
    color: '#1a1a1a',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -1,
  },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
      }
    } as any),
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: '700',
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
  },
  addCardText: {
    color: '#4A9EFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
