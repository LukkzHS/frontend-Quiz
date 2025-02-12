import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {currentScreen === 'login' && (
        <LoginScreen 
          onLogin={() => setCurrentScreen('home')}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen 
          onStart={() => setCurrentScreen('quiz')}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      {currentScreen === 'quiz' && (
        <QuizScreen 
          onGoToStart={() => setCurrentScreen('home')}
          isDarkMode={isDarkMode}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
});

export default App;