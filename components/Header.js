import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Moon, Sun } from 'lucide-react-native';

const Header = ({ key, isDarkMode, toggleDarkMode, currentQuestion, totalQuestions }) => {
  return (
    <View style={styles.headerRow}>
      <CountdownCircleTimer
        key={key}
        isPlaying
        duration={15}
        size={50}
        colors={isDarkMode ? ["#4CAF50", "#F7B801", "#A30000"] : ["#2E7D32", "#F9A825", "#C62828"]}
        colorsTime={[10, 5, 0]}
        onComplete={() => {
          setProgress(prev => {
            const newProgress = [...prev];
            newProgress[currentQuestion] = false;
            return newProgress;
          });
          goToNextQuestion();
        }}
      >
        {({ remainingTime }) => (
          <Text style={isDarkMode ? styles.timerTextDark : styles.timerTextLight}>
            {remainingTime}s
          </Text>
        )}
      </CountdownCircleTimer>

      <Text style={[styles.questionCount, isDarkMode ? styles.darkText : styles.lightText]}>
        Pergunta {currentQuestion + 1}/{totalQuestions}
      </Text>

      <TouchableOpacity onPress={toggleDarkMode} style={styles.modeToggleIcon}>
        {isDarkMode ? (
          <Sun color="#FFD700" size={28} />
        ) : (
          <Moon color="#2E7D32" size={28} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 15,
  },
  questionCount: {
    fontSize: 18,
    fontWeight: '500',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  modeToggleIcon: {
    marginLeft: 'auto',
  },
  timerTextDark: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  timerTextLight: {
    color: '#2E7D32',
    fontSize: 14,
  },
  darkText: {
    color: '#ECEFF1',
  },
  lightText: {
    color: '#212121',
  },
});

export default Header;