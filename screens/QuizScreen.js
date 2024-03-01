import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useQuiz } from '../contexts/QuizContext';
import { generateQuizQuestion } from '../utils/quizGenerator';
import { useTheme } from '../contexts/ThemeContext';
import { filterCountriesByDifficulty } from '../utils/filterCountriesByDifficulty';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';



const QuizScreen = ({ route, navigation }) => {
  const { countries, difficulty } = useQuiz();
  const [question, setQuestion] = useState(null);
  const [lives, setLives] = useState(3); // Track the number of lives
  const [score, setScore] = useState(0); // Initialize score state
  const [usedCountries, setUsedCountries] = useState([]);
  const { mode } = useTheme();

  const playSound = async (soundPath) => {
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(soundPath);
      await soundObject.playAsync();
      // Unload the sound from memory after playback is done
      soundObject.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await soundObject.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setUsedCountries([]);
    // Load a new question to start the game over
    loadNewQuestion();
  };
  useFocusEffect(
    React.useCallback(() => {
      if (lives <= 0) {
        resetGame();
      }
      return () => {
      };
    }, [lives]) 
  );

  // Determine the quiz mode for conditional styling
  const isNameToFlagsMode = route.params.quizType !== 'flagToName';

  useEffect(() => {
    if (countries.length > 0) {
      setQuestion(generateQuizQuestion(countries, route.params.quizType, difficulty));
    }
  }, [countries, route.params.quizType, difficulty]);

  const loadNewQuestion = () => {
    const filteredCountries = filterCountriesByDifficulty(countries, difficulty);
    const availableCountries = filteredCountries.filter(country => !usedCountries.includes(country.cca3));

    if (availableCountries.length < 4) {
      console.log("No available countries left or not enough to form a question. Ending game.");
      navigation.navigate('GameOver', {
        score: score,
        mode: route.params.quizType, 
        difficulty: difficulty 
      });
      alert("Congratulations! You've completed the quiz!");
      return;
    }

    const newQuestion = generateQuizQuestion(availableCountries, route.params.quizType, difficulty);
    setQuestion(newQuestion);
    setUsedCountries(prevUsedCountries => [...prevUsedCountries, newQuestion.cca3]);
  };



  useEffect(() => {
    loadNewQuestion();
  }, [countries, route.params.quizType, difficulty]);


  const handleAnswer = async (selectedAnswer) => {
    const soundObject = new Audio.Sound();
    try {
      if (selectedAnswer === question.correctAnswer) {
        // Load and play correct sound effect
        await playSound(require('../assets/correct_sound_effect.mp3'));

        console.log(`Correct answer selected. Current score: ${score}. Incrementing score.`);
        setScore(score + 1); // Increment score
        console.log(`Score updated to ${score + 1}. Loading new question.`);
        loadNewQuestion(); // Load next question after a correct answer
      } else {
        // Load and play wrong sound effect
        await playSound(require('../assets/wrong_sound_effect.mp3'));
        console.log("Incorrect answer selected.");
        setLives(lives - 1); // Decrement lives
        alert("Incorrect!");
        // Optionally, unload the sound to free resources
        await soundObject.unloadAsync();
        if (lives <= 1) {
          console.log("Navigating to GameOver screen due to lives running out.");
          navigation.navigate('GameOver', {
            score: score,
            mode: route.params.quizType,
            difficulty: difficulty
          });
        }
      }
    } catch (error) {
      console.error("Error playing sound", error);
    }
  };



  if (!question) return <View><Text>Loading...</Text></View>;

  const dynamicStyles = getStyles(mode, isNameToFlagsMode); 

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.scoreContainer}>
        <Text style={dynamicStyles.score}>Score: {score}</Text>
      </View>
      <View style={dynamicStyles.livesContainer}>
        <Text style={dynamicStyles.lives}>Lives: {lives}</Text>
      </View>
      <View style={dynamicStyles.questionContainer}>
        {route.params.quizType === 'flagToName' ? (
          // For "1 flag, 4 names" mode, display the flag with adjusted style
          <View style={dynamicStyles.flagContainer}>
            <Image source={{ uri: question.question }} style={dynamicStyles.flag} />
          </View>
        ) : (
          // For "1 name, 4 flags" mode, display the name
          <Text style={[dynamicStyles.text, dynamicStyles.questionText]}>{question.question}</Text>
        )}
      </View>
      <View style={dynamicStyles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity key={index} style={dynamicStyles.option} onPress={() => handleAnswer(option)}>
            {route.params.quizType === 'flagToName' ? (
              <Text style={dynamicStyles.text}>{option}</Text>
            ) : (
              // Adjust flag display in "1 name, 4 flags" mode
              <View style={dynamicStyles.flagContainer}>
                <Image source={{ uri: option }} style={dynamicStyles.flag} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const getStyles = (mode, isNameToFlagsMode) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: mode === 'dark' ? '#181818' : '#E9E9E9',
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  option: {
    width: isNameToFlagsMode ? '35%' : '40%',
    margin: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: isNameToFlagsMode ? '0' : '2',
    borderColor: mode === 'dark' ? '#fff' : '#000',
    borderRadius: 10,
    backgroundColor: isNameToFlagsMode ? 'transparent' : mode === 'dark' ? '#333' : '#fff',

  },
  flagContainer: {
    width: isNameToFlagsMode ? 150 : 300,
    height: isNameToFlagsMode ? 100 : 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  flag: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  text: {
    color: mode === 'dark' ? '#fff' : '#000',
    fontSize: isNameToFlagsMode ? 16 : 20,

  },
  scoreContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 10,
  },
  score: {
    fontSize: 20,
    color: mode === 'dark' ? '#fff' : '#000',
    padding: 10,
  },
  livesContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 8,
    borderRadius: 10,
  },
  lives: {
    fontSize: 20,
    color: mode === 'dark' ? '#fff' : '#000',
    padding: 10,
  },
});

export default QuizScreen;
