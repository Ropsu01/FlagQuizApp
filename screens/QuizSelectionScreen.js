import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Adjust the path as necessary

const QuizSelectionScreen = ({ navigation }) => {
    const { mode } = useTheme();
    const themedStyles = styles(mode);
    return (
      <View style={themedStyles.container}>
          <Text style={themedStyles.title}>Select Quiz Mode</Text>
          <TouchableOpacity
              style={themedStyles.button}
              onPress={() => navigation.navigate('DifficultySelection', { quizType: 'flagToName' })}>
              <Text style={themedStyles.buttonText}>1 Flag 4 Names</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={themedStyles.button}
              onPress={() => navigation.navigate('DifficultySelection', { quizType: 'nameToFlag' })}>
              <Text style={themedStyles.buttonText}>1 Name 4 Flags</Text>
          </TouchableOpacity>
      </View>
  );
};

const styles = (mode) => StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: mode === 'dark' ? '#333' : '#fff',
  },
  title: {
      fontSize: 20,
      marginBottom: 20,
      color: mode === 'dark' ? '#fff' : '#000',
  },
  button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      marginBottom: 10,
      alignItems: 'center',
      width: 200, 
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
  },
});

export default QuizSelectionScreen;
