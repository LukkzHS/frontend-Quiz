import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ onStart, isDarkMode, toggleDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity 
        style={styles.themeToggle}
        onPress={toggleDarkMode}
      >
        {isDarkMode ? (
          <Text style={styles.themeText}>🌞 Claro</Text>
        ) : (
          <Text style={styles.themeText}>🌙 Escuro</Text>
        )}
      </TouchableOpacity>

      <Image
        source={require('../assets/images/quizColegioIntegracaoBabyLogo.png')}
        style={styles.banner}
      />
      
      <Text style={[styles.welcomeText, isDarkMode && styles.darkText]}>
        Bem-vindo ao Quiz!
      </Text>
      
      <TouchableOpacity
        style={styles.quizButton}
        onPress={onStart}
      >
        <Text style={styles.buttonText}>Iniciar Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  banner: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2E7D32',
    textAlign: 'center',
  },
  quizButton: {
    width: '80%',
    height: 60,
    backgroundColor: '#2E7D32',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  themeText: {
    fontSize: 16,
    color: '#2E7D32',
  },
  darkText: {
    color: '#ECEFF1',
  },
});

export default HomeScreen;