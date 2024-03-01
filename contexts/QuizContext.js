import React, { createContext, useState, useContext, useEffect } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [difficulty, setDifficulty] = useState('easy'); 

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

  const value = {
    countries,
    setCountries,
    difficulty,
    setDifficulty
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
