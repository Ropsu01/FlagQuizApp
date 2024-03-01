import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const defaultMode = Appearance.getColorScheme() || 'light';

export const ThemeContext = createContext({
  mode: defaultMode,
  setMode: (mode) => console.log(mode),
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(defaultMode);

  useEffect(() => {
    // This function is called whenever the system appearance changes.
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeMode(colorScheme);
    });

    return () => listener.remove();
  }, []);

  const setMode = (mode) => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ mode: themeMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
