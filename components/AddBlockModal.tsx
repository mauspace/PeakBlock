import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useBlockStore, BlockType } from '../store/blockStore';

const PRESET_ICONS = [
  { icon: 'bullseye-arrow', color: '#6D5BFF' },
  { icon: 'timer-outline', color: '#2A3A4A' },
  { icon: 'cake-variant-outline', color: '#FF6B6B' },
  { icon: 'book-open-outline', color: '#69DB7C' },
  { icon: 'dumbbell', color: '#FF8787' },
  { icon: 'moon-waning-crescent', color: '#CC5DE8' },
  { icon: 'coffee-outline', color: '#FFC078' },
  { icon: 'music-note-outline', color: '#4DABF7' },
];

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function AddBlockModal({ visible, onClose }: Props) {
  const { addBlock } = useBlockStore();
  const [name, setName] = useState('');
  const [schedule, setSchedule] = useState('Every day');
  const [selectedIcon, setSelectedIcon] = useState(0);

  const handleAdd = () => {
    if (!name.trim()) return;
    addBlock({
      type: 'custom',
      name: name.trim(),
      icon: PRESET_ICONS[selectedIcon].icon,
      iconColor: PRESET_ICONS[selectedIcon].color,
      schedule,
      tagline: 'Stay on track.',
      enabled: true,
      gradientColors: 
        PRESET_ICONS[selectedIcon].icon === 'bullseye-arrow' ? ['#6D5BFF', '#A27DFF'] :
        PRESET_ICONS[selectedIcon].icon === 'cake-variant-outline' ? ['#FF6B6B', '#FFA94D'] :
        undefined
    });
    setName('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>New Block</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Deep Work"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
            autoFocus
          />

          <Text style={styles.label}>Schedule</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Weekdays, 9:00 AM – 5:00 PM"
            placeholderTextColor="#ccc"
            value={schedule}
            onChangeText={setSchedule}
          />

          <Text style={styles.label}>Icon</Text>
          <View style={styles.iconGrid}>
            {PRESET_ICONS.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.iconOption,
                  selectedIcon === i && {
                    borderColor: item.color,
                    backgroundColor: item.color + '15',
                  },
                ]}
                onPress={() => setSelectedIcon(i)}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={24}
                  color={selectedIcon === i ? item.color : '#bbb'}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.addBtn, !name.trim() && styles.addBtnDisabled]}
            onPress={handleAdd}
            disabled={!name.trim()}
          >
            <Text style={styles.addBtnText}>Add Block</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: '#eee',
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
  title: {
    color: '#1a1a1a',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 24,
  },
  label: {
    color: '#999',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fb',
    borderRadius: 16,
    padding: 16,
    color: '#1a1a1a',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 24,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  iconOption: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#f0f0f0',
    backgroundColor: '#f8f9fb',
  },
  addBtn: {
    backgroundColor: '#6D5BFF',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6D5BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addBtnDisabled: {
    opacity: 0.4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#999',
    fontSize: 15,
    fontWeight: '600',
  },
});
