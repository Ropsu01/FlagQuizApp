
export const capitalizeWords = (str) => {
    return str.replace(/\b(\w)/g, (s) => s.toUpperCase());
  };
  
  export const formatGameMode = (mode) => {
    return capitalizeWords(mode.replace('To', ' to '));
  };
  
  export const formatDifficulty = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };
  