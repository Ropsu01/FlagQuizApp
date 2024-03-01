export const filterCountriesByDifficulty = (countries, difficulty) => {
    let filteredCountries;
  
    switch(difficulty) {
      case 'easy':
        filteredCountries = countries.filter(country => country.population > 11000000);
        break;
      case 'medium':
        filteredCountries = countries.filter(country => country.population <= 11000000 && country.population > 600000);
        break;
      case 'hard':
        filteredCountries = countries.filter(country => country.population <= 600000);
        break;
      default:
        filteredCountries = countries;
    }
  

  
    return filteredCountries;
  };
  