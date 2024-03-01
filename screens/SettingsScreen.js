import React, { useContext } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext'; 

export default function SettingsScreen() {
  const { mode, setMode } = useContext(ThemeContext);
  const themedStyles = styles(mode);


  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Theme Switcher</Text>
      <Switch
        value={mode === 'dark'}
        onValueChange={(value) => setMode(value ? 'dark' : 'light')}
      />
    </View>
  );
}

const styles = (mode) => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? '#333' : '#fff', // Dark mode background
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: mode === 'dark' ? '#fff' : '#000', // Dark mode text color
    },
  });