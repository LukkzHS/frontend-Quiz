import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
      {isDarkMode ? (
        <Text style={styles.themeText}>🌞 Claro</Text>
      ) : (
        <Text style={styles.themeText}>🌙 Escuro</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  themeText: {
    fontSize: 16,
    color: '#2E7D32',
  },
});

export default ThemeToggleButton;