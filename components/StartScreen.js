import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const StartScreen = ({ onStart, isDarkMode }) => {
  return (
    <View style={styles.container}>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        Bem-vindo ao Quiz!
      </Text>
      <Button title="Iniciar Quiz" onPress={onStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  darkText: {
    color: '#ECEFF1',
  },
  lightText: {
    color: '#212121',
  },
});

export default StartScreen;