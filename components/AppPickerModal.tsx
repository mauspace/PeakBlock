import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AVAILABLE_APPS = [
  { name: 'Instagram', icon: 'instagram', color: '#E4405F' },
  { name: 'TikTok', icon: 'tiktok', color: '#000000' },
  { name: 'X', icon: 'twitter', color: '#1DA1F2' },
  { name: 'YouTube', icon: 'youtube', color: '#FF0000' },
  { name: 'Slack', icon: 'slack', color: '#4A154B' },
  { name: 'Mail', icon: 'email-outline', color: '#EA4335' },
  { name: 'Chrome', icon: 'google-chrome', color: '#4285F4' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedApps: string[];
  onToggleApp: (appName: string) => void;
}

export default function AppPickerModal({ visible, onClose, selectedApps, onToggleApp }: Props) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Select Apps to Block</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.doneBtn}>Done</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {AVAILABLE_APPS.map((app) => {
              const isSelected = selectedApps.includes(app.name);
              return (
                <TouchableOpacity
                  key={app.name}
                  style={styles.appRow}
                  onPress={() => onToggleApp(app.name)}
                >
                  <View style={styles.appInfo}>
                    <View style={[styles.iconContainer, { backgroundColor: app.color + '15' }]}>
                      <MaterialCommunityIcons name={app.icon as any} size={24} color={app.color} />
                    </View>
                    <Text style={styles.appName}>{app.name}</Text>
                  </View>
                  <MaterialCommunityIcons
                    name={isSelected ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                    size={24}
                    color={isSelected ? "#6D5BFF" : "#ddd"}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a1a',
  },
  doneBtn: {
    color: '#6D5BFF',
    fontSize: 16,
    fontWeight: '700',
  },
  appRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fb',
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});
