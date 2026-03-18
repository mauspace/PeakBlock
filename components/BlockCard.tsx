import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Block, useBlockStore } from '../store/blockStore';
import AppPickerModal from './AppPickerModal';
import { useBlockTimer } from '../hooks/useBlockTimer';

interface Props {
  block: Block;
}

export default function BlockCard({ block }: Props) {
  const { toggleBlock, toggleBlockedApp } = useBlockStore();
  const [showAppPicker, setShowAppPicker] = useState(false);
  const isActive = useBlockTimer(block);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    toggleBlock(block.id);
  };

  const usagePercent =
    block.usageLimit && block.usedMinutes
      ? (block.usedMinutes / block.usageLimit) * 100
      : null;

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <View style={[styles.card, !block.enabled && styles.cardDisabled]}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.iconContainer}>
            {block.gradientColors ? (
              <LinearGradient
                colors={block.gradientColors as [string, string, ...string[]]}
                style={styles.iconBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <MaterialCommunityIcons
                  name={block.icon as any}
                  size={24}
                  color="#fff"
                />
              </LinearGradient>
            ) : (
              <View style={[styles.iconBg, { backgroundColor: block.iconColor }]}>
                <MaterialCommunityIcons
                  name={block.icon as any}
                  size={24}
                  color="#fff"
                />
              </View>
            )}
            {isActive && (
              <View style={styles.liveDot}>
                <View style={styles.liveDotInner} />
              </View>
            )}
          </View>
          
          <View style={styles.topActions}>
            {isActive && (
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.appsBtn}
              onPress={() => setShowAppPicker(true)}
            >
              <MaterialCommunityIcons name="apps" size={18} color="#999" />
              {block.blockedApps && block.blockedApps.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{block.blockedApps.length}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionBtn, block.enabled && styles.actionBtnActive]} 
              onPress={handlePress}
            >
              <MaterialCommunityIcons 
                name="plus" 
                size={18} 
                color={block.enabled ? "#4A9EFF" : "#888"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.name, !block.enabled && styles.textDisabled]}>
            {block.name}
          </Text>
          <Text style={styles.schedule}>{block.schedule}</Text>
          <Text style={styles.tagline}>{block.tagline}</Text>
        </View>

        {/* Usage bar */}
        {usagePercent !== null && (
          <View style={styles.usageRow}>
            <View style={styles.usageBarBg}>
              <View
                style={[
                  styles.usageBarFill,
                  {
                    width: `${usagePercent}%` as any,
                    backgroundColor: usagePercent > 80 ? '#FF6B6B' : '#6D5BFF',
                  },
                ]}
              />
            </View>
            <Text style={styles.usageText}>
              {block.usedMinutes}m / {block.usageLimit}m
            </Text>
          </View>
        )}
      </View>

      <AppPickerModal
        visible={showAppPicker}
        onClose={() => setShowAppPicker(false)}
        selectedApps={block.blockedApps || []}
        onToggleApp={(appName) => toggleBlockedApp(block.id, appName)}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }
    } as any),
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardDisabled: {
    opacity: 0.8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  topActions: {
    flexDirection: 'row',
    gap: 8,
  },
  liveBadge: {
    backgroundColor: '#69DB7C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'center',
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  liveDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#69DB7C',
  },
  appsBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#6D5BFF',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '800',
  },
  iconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  actionBtnActive: {
    backgroundColor: '#eef7ff',
    borderColor: '#d0e8ff',
  },
  content: {
    marginTop: 4,
  },
  name: {
    color: '#1a1a1a',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  textDisabled: {
    color: '#888',
  },
  schedule: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  tagline: {
    color: '#888',
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  usageRow: {
    marginTop: 20,
  },
  usageBarBg: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  usageBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  usageText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'right',
    fontWeight: '500',
  },
});
