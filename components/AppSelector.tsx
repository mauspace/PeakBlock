import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DeviceActivitySelectionSheetView } from 'react-native-device-activity';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AppSelectorProps {
  selectionToken?: string;
  onSelectionChange: (token: string) => void;
  title?: string;
}

export const AppSelector: React.FC<AppSelectorProps> = ({ 
  selectionToken, 
  onSelectionChange,
  title = "Select Apps to Block"
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.selectorButton} 
        onPress={() => setVisible(true)}
      >
        <View style={styles.leftContent}>
          <MaterialCommunityIcons name="apps" size={24} color="#8B5CF6" />
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#64748B" />
      </TouchableOpacity>

      {visible && (
        <DeviceActivitySelectionSheetView
          familyActivitySelection={selectionToken || null}
          onSelectionChange={(event) => {
            const token = event.nativeEvent.familyActivitySelection;
            if (token) {
              onSelectionChange(token);
            }
          }}
          onDismissRequest={() => setVisible(false)}
          headerText="Choose Apps & Categories"
          footerText="PeakBlock will restrict access to these selections."
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
});
