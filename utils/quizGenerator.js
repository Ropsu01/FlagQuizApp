import { filterCountriesByDifficulty } from './filterCountriesByDifficulty';


export const generateQuizQuestion = (countries, type = 'flagToName', difficulty = 'easy') => {
  const filteredCountries = filterCountriesByDifficulty(countries, difficulty);
  const correctAnswer = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];

  // Initialize wrong answers array
  let wrongAnswers = [];
  while (wrongAnswers.length < 3) {
    const randomIndex = Math.floor(Math.random() * filteredCountries.length);
    const randomCountry = filteredCountries[randomIndex];
    // Ensure the randomly selected country is not the correct answer
    if (randomCountry.cca3 !== correctAnswer.cca3 && !wrongAnswers.find(wa => wa.cca3 === randomCountry.cca3)) {
      wrongAnswers.push(randomCountry);
    }
  }

  // Combine and shuffle answers
  const options = shuffle([...wrongAnswers, correctAnswer]);

  return {
    question: type === 'flagToName' ? correctAnswer.flags.png : correctAnswer.name.common,
    options: options.map(option => type === 'flagToName' ? option.name.common : option.flags.png),
    correctAnswer: type === 'flagToName' ? correctAnswer.name.common : correctAnswer.flags.png,
    cca3: correctAnswer.cca3, // Include the cca3 code of the correct answer for identification
  };
};




  
  export const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  };
  