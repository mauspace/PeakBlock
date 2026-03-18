import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const stats = [
    { label: 'Days\nActive', value: '18' },
    { label: 'Time\nSaved', value: '42h' },
    { label: 'Active\nRules', value: '3' },
  ];

  const settings = [
    { id: 'notif', title: 'Notifications', icon: 'bell-outline', color: '#4A9EFF' },
    { id: 'appearance', title: 'Appearance', icon: 'moon-waning-crescent', color: '#6D5BFF' },
    { id: 'privacy', title: 'Privacy & Security', icon: 'shield-outline', color: '#69DB7C' },
    { id: 'support', title: 'Help & Support', icon: 'help-circle-outline', color: '#A27DFF' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#6D5BFF', '#A27DFF']}
            style={styles.avatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.avatarText}>AS</Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex Smith</Text>
            <Text style={styles.profileEmail}>alex.smith@email.com</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Settings</Text>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {settings.map((item) => (
            <TouchableOpacity key={item.id} style={styles.settingItem}>
              <View style={[styles.settingIcon, { backgroundColor: item.color + '10' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <MaterialCommunityIcons name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    padding: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EBEBFF',
    ...Platform.select({
      ios: { shadowColor: '#5B5BD6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.04, shadowRadius: 12 },
      android: { elevation: 2 },
    } as any),
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'SyneExtraBold',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'SyneSemiBold',
    color: '#111',
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'DMSansRegular',
    color: '#8B85CC',
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: '#F4F3FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editBtnText: {
    fontSize: 14,
    fontFamily: 'DMSansMedium',
    color: '#5B5BD6',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EBEBFF',
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'SyneExtraBold',
    color: '#111',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'DMSansMedium',
    color: '#8B85CC',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
    marginLeft: 4,
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EBEBFF',
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F3FF',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'DMSansMedium',
    color: '#111',
  },
  logoutBtn: {
    backgroundColor: '#fff5f5',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#ffe3e3',
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'SyneSemiBold',
    color: '#FF6B6B',
  },
});
