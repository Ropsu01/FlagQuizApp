import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuiz } from '../contexts/QuizContext';
import { useTheme } from '../contexts/ThemeContext';

const DifficultySelectionScreen = ({ route, navigation }) => {
    const { setDifficulty } = useQuiz();
    const { quizType } = route.params;
    const { mode } = useTheme();
    const themedStyles = styles(mode);

    const handleDifficultySelection = (difficulty) => {
        setDifficulty(difficulty); 
        navigation.navigate('Quiz', { quizType, difficulty });
    };

    return (
        <View style={themedStyles.container}>
            <Text style={themedStyles.title}>Select Difficulty</Text>
            <TouchableOpacity
                style={themedStyles.button}
                onPress={() => handleDifficultySelection('easy')}>
                <Text style={themedStyles.buttonText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={themedStyles.button}
                onPress={() => handleDifficultySelection('medium')}>
                <Text style={themedStyles.buttonText}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={themedStyles.button}
                onPress={() => handleDifficultySelection('hard')}>
                <Text style={themedStyles.buttonText}>Hard</Text>
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

export default DifficultySelectionScreen;
