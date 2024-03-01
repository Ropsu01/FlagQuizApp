import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './contexts/ThemeContext'; // Ensure this path is correct
import { QuizProvider } from './contexts/QuizContext'; // Ensure this path is correct
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import CountriesScreen from './screens/CountriesScreen';
import QuizScreen from './screens/QuizScreen';
import QuizSelectionScreen from './screens/QuizSelectionScreen';
import DifficultySelectionScreen from './screens/DifficultySelectionScreen';
import GameOverScreen from './screens/GameOverScreen';
import HighScoresScreen from './screens/HighScoreScreen';

// Import your custom themes
import { CustomDefaultTheme, CustomDarkTheme } from './themes/navigationThemes';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  const { mode } = useTheme();

  // Choose the theme based on the mode
  const navigationTheme = mode === 'dark' ? CustomDarkTheme : CustomDefaultTheme;

  const screenOptions = {
    headerStyle: {
      backgroundColor: navigationTheme.colors.background, // Use the background color for the header
    },
    headerTintColor: navigationTheme.colors.text, // Use the text color for the header title and buttons
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Countries" component={CountriesScreen} />
        <Stack.Screen name="QuizSelection" component={QuizSelectionScreen} />
        <Stack.Screen name="DifficultySelection" component={DifficultySelectionScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="GameOver" component={GameOverScreen} />
        <Stack.Screen name="HighScores" component={HighScoresScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <QuizProvider>
      <ThemeProvider>
        <AppStack />
      </ThemeProvider>
    </QuizProvider>

  );
}
