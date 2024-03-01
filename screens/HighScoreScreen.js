import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../contexts/ThemeContext'; 


import { formatGameMode, formatDifficulty } from '../utils/formatHelpers';

const HighScoresScreen = () => {
  const { mode } = useTheme();
  const themedStyles = styles(mode);
  const [sortedHighScores, setSortedHighScores] = useState([]);

  useEffect(() => {
    const fetchAndSortHighScores = async () => {
      try {
        const scoresString = await AsyncStorage.getItem('highScores');
        const scoresObj = scoresString ? JSON.parse(scoresString) : {};
        const scoresArray = Object.entries(scoresObj).map(([key, score]) => {
          const [mode, difficulty] = key.split(':');
          return { mode, difficulty, score };
        });

        // Sort scores array by score in descending order
        scoresArray.sort((a, b) => b.score - a.score);

        setSortedHighScores(scoresArray);
      } catch (error) {
        console.error('Failed to load and sort high scores', error);
      }
    };

    fetchAndSortHighScores();
  }, []);

  return (
    <ScrollView style={themedStyles.container}>
      <Text style={themedStyles.title}>Local High Scores</Text>
      {sortedHighScores.map(({ mode, difficulty, score }, index) => (
        <Text style={themedStyles.score} key={index}>
          {`${formatGameMode(mode)} - ${formatDifficulty(difficulty)}: ${score}`}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = (mode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: mode === 'dark' ? '#333' : '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: mode === 'dark' ? '#fff' : '#000',
    textAlign: 'center',
  },
  score: {
    fontSize: 18,
    color: mode === 'dark' ? '#fff' : '#000',
    marginBottom: 10,
  },
});

export default HighScoresScreen;
