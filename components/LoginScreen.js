import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === '' && password === '') {
      onLogin();
      setError('.');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleDarkMode}>
        {isDarkMode ? (
          <Text style={styles.themeText}>🌞 Claro</Text>
        ) : (
          <Text style={styles.themeText}>🌙 Escuro</Text>
        )}
      </TouchableOpacity>

      <Image
        source={require('../assets/images/logoColegioIntegracaoBaby.png')}
        style={styles.logo}
      />
      
      <Text style={[styles.title, isDarkMode && styles.darkText]}>Bem-vindo ao QuizApp</Text>
      
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Usuário"
        placeholderTextColor={isDarkMode ? '#B0BEC5' : '#9E9E9E'}
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Senha"
        placeholderTextColor={isDarkMode ? '#B0BEC5' : '#9E9E9E'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2E7D32',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#263238',
    borderColor: '#37474F',
    color: '#FFF',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#D32F2F',
    marginBottom: 15,
    textAlign: 'center',
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

export default LoginScreen;