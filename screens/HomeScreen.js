import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; 
import { useState, useEffect, useRef  } from 'react';

export default function HomeScreen({ navigation }) {
  const { mode } = useTheme();
  const themedStyles = styles(mode);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);


  return (
    <ImageBackground 
    
      source={require('../assets/backgroundImage.jpg')} 
      style={themedStyles.container}
      resizeMode="cover" 
    >
    <View style={themedStyles.container}>
      
      <Text style={themedStyles.title}>Flag Quiz App</Text>
      <TouchableOpacity
        style={themedStyles.button}
        onPress={() => navigation.navigate('QuizSelection')}>
        <Text style={themedStyles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyles.button}
        onPress={() => navigation.navigate('Countries')}>
        <Text style={themedStyles.buttonText}>Learn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyles.button}
        onPress={() => navigation.navigate('HighScores')}>
        <Text style={themedStyles.buttonText}>High Scores</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={themedStyles.button}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={themedStyles.buttonText}>Settings</Text>
      </TouchableOpacity>
      
    </View>
    </ImageBackground>
  );
}

const styles = (mode) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingTop: 110, 
  },
  title: {
    fontSize: 36, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginBottom: 50, 
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
