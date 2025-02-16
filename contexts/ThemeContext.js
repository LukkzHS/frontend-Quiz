import React from 'react';

const ThemeContext = React.createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export default ThemeContext;