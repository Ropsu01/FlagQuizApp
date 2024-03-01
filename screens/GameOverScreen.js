import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext'; // Adjust the path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { formatGameMode, formatDifficulty } from '../utils/formatHelpers'; // Adjust the path as necessary


const saveHighScore = async (score, mode, difficulty) => {
  try {
    const key = 'highScores';
    const existingScoresString = await AsyncStorage.getItem(key);
    const existingScores = existingScoresString ? JSON.parse(existingScoresString) : {};
    const modeDifficultyKey = `${mode}:${difficulty}`;

    if (!existingScores[modeDifficultyKey] || score > existingScores[modeDifficultyKey]) {
      existingScores[modeDifficultyKey] = score;
      await AsyncStorage.setItem(key, JSON.stringify(existingScores));
      return true; // New high score set
    }
  } catch (error) {
    console.error('Error saving high score', error);
  }
  return false; // No new high score
};



const GameOverScreen = ({ route, navigation }) => {
  const { score, mode: gameMode, difficulty } = route.params;
  const { mode } = useTheme(); 
  const themedStyles = styles(mode);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  // Format the game mode and difficulty for display
  const formattedGameMode = formatGameMode(gameMode);
  const formattedDifficulty = formatDifficulty(difficulty);

  const handleTryAgain = () => {
    navigation.navigate('QuizSelection');
  };

  useEffect(() => {
    const checkHighScore = async () => {
      const newHighScore = await saveHighScore(score, gameMode, difficulty);
      setIsNewHighScore(newHighScore);

      // Fetch the updated high scores to display the best score
      const existingScoresString = await AsyncStorage.getItem('highScores');
      const existingScores = existingScoresString ? JSON.parse(existingScoresString) : {};
      const modeDifficultyKey = `${gameMode}:${difficulty}`;
      setBestScore(existingScores[modeDifficultyKey] || score); // Fallback to current score if none exists
    };

    checkHighScore();
  }, [score, gameMode, difficulty]);

  useEffect(() => {
    saveHighScore(score, gameMode, difficulty);
    console.log('High score saved', score, gameMode, difficulty);
  }, [score, gameMode, difficulty]);

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Game Over</Text>
      <Text style={themedStyles.scoreText}>Your Score: {score}</Text>
      {isNewHighScore ? (
        <Text style={themedStyles.infoText}>New Highscore!</Text>
      ) : (
        <Text style={themedStyles.infoText}>Best: {bestScore}</Text>
      )}
      <Text style={themedStyles.infoText}>Mode: {formattedGameMode}</Text>
      <Text style={themedStyles.infoText}>Difficulty: {formattedDifficulty}</Text>

      <TouchableOpacity style={themedStyles.button} onPress={handleTryAgain}>
        <Text style={themedStyles.buttonText}>Try Again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={themedStyles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={themedStyles.buttonText}>Main Menu</Text>
      </TouchableOpacity>
    </View>
  );
};
  



const styles = (mode) =>  StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: mode === 'dark' ? '#333' : '#fff', 
        },
        title: {
            fontSize: 32,
            marginBottom: 20,
            fontWeight: 'bold',
            color: mode === 'dark' ? '#fff' : '#000', 
        },
        scoreText: {
            fontSize: 24,
            marginBottom: 20,
            color: mode === 'dark' ? '#fff' : '#000', 
        },
        infoText: {
            fontSize: 14,
            marginBottom: 10,
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

export default GameOverScreen;
