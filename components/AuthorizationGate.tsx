import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { requestAuthorization, getAuthorizationStatus } from 'react-native-device-activity';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface AuthorizationGateProps {
  children: React.ReactNode;
}

export const AuthorizationGate: React.FC<AuthorizationGateProps> = ({ children }) => {
  const [status, setStatus] = useState<'approved' | 'denied' | 'notDetermined' | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const currentStatus = await getAuthorizationStatus();
      setStatus(currentStatus as any);
    } catch (error) {
      console.error('Error checking authorization status:', error);
    }
  };

  const handleRequest = async () => {
    try {
      await requestAuthorization();
      await checkStatus();
    } catch (error) {
      Alert.alert(
        'Permission Required',
        'PeakBlock needs Screen Time permissions to actually block apps. Please enable it in Settings.',
        [{ text: 'OK' }]
      );
    }
  };

  if (status === 'approved') {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="shield-lock-outline" size={64} color="#8B5CF6" />
        </View>
        <Text style={styles.title}>Enable App Blocking</Text>
        <Text style={styles.description}>
          To actually restrict apps, PeakBlock needs your permission to use Apple's Screen Time API.
        </Text>
        
        <View style={styles.benefitList}>
          <View style={styles.benefitItem}>
             <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
             <Text style={styles.benefitText}>Real-time app restriction</Text>
          </View>
          <View style={styles.benefitItem}>
             <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
             <Text style={styles.benefitText}>Customizable block screens</Text>
          </View>
          <View style={styles.benefitItem}>
             <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
             <Text style={styles.benefitText}>Privacy-first (No data leaves device)</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRequest}>
          <Text style={styles.buttonText}>Allow Screen Time Access</Text>
        </TouchableOpacity>
        
        <Text style={styles.footer}>
          This is a system-level permission required by Apple.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#000',
  },
  card: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  benefitList: {
    width: '100%',
    marginBottom: 32,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    color: '#CBD5E1',
    marginLeft: 12,
    fontSize: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#8B5CF6',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});
