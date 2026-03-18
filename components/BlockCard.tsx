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
      <View style={[styles.card, !block.isEnabled && styles.cardDisabled]}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={(block.gradientColors || ['#5B5BD6', '#8B5CF6']) as any}
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
              style={[styles.actionBtn, block.isEnabled && styles.actionBtnActive]} 
              onPress={handlePress}
            >
              <MaterialCommunityIcons 
                name={block.isEnabled ? 'pause' : 'play'} 
                size={20} 
                color={block.isEnabled ? '#5B5BD6' : '#8B85CC'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={[styles.name, !block.isEnabled && styles.textDisabled]}>
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
                    backgroundColor: usagePercent > 80 ? '#FF6B6B' : '#5B5BD6',
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
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 8px 16px rgba(0,0,0,0.04)',
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
    marginBottom: 20,
  },
  topActions: {
    flexDirection: 'row',
    gap: 10,
  },
  appsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBFF',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#5B5BD6',
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
    fontFamily: 'DMSansMedium',
  },
  iconContainer: {
    shadowColor: '#5B5BD6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  iconBg: {
    width: 54,
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  liveBadge: {
    backgroundColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'center',
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'DMSansMedium',
    letterSpacing: 0.5,
  },
  liveDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  liveDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EBEBFF',
  },
  actionBtnActive: {
    backgroundColor: '#EBEBFF',
    borderColor: '#5B5BD6',
  },
  content: {
    marginTop: 0,
  },
  name: {
    color: '#111111',
    fontSize: 20,
    fontFamily: 'SyneSemiBold',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  textDisabled: {
    color: '#999',
  },
  schedule: {
    color: '#8B85CC',
    fontSize: 13,
    fontFamily: 'DMSansMedium',
    marginBottom: 12,
  },
  tagline: {
    color: '#555555',
    fontSize: 14,
    fontFamily: 'DMSansRegular',
    lineHeight: 22,
  },
  usageRow: {
    marginTop: 24,
  },
  usageBarBg: {
    height: 6,
    backgroundColor: '#EBEBFF',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  usageBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  usageText: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'DMSansRegular',
    textAlign: 'right',
    fontWeight: '500',
  },
});
