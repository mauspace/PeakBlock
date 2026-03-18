import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconBg}>
          <MaterialCommunityIcons name="account-outline" size={48} color="#FFA94D" />
        </View>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>
          Manage your account, settings, and premium subscription.
        </Text>
        <View style={styles.comingSoon}>
          <Text style={[styles.comingSoonText, { color: '#FFA94D' }]}>COMING SOON</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  iconBg: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    color: '#1a1a1a',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  comingSoon: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  comingSoonText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
