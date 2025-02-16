import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 1. Autenticação no backend
      const authResponse = await axios.post(
        'http://192.168.3.8:8080/api/auth/login',
        {
          username,
          password
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // 2. Validação do token
      const validateResponse = await axios.get(
        'http://192.168.3.8:8080/api/auth/validate',
        {
          headers: { 
            Authorization: `Bearer ${authResponse.data.token}` 
          }
        }
      );

      // 3. Armazenamento seguro dos dados
      await AsyncStorage.multiSet([
        ['userToken', authResponse.data.token],
        ['userData', JSON.stringify(validateResponse.data)],
      ]);

      // 4. Navegação para a tela principal
      navigation.navigate('Home');
      
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrors = (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setError('Credenciais inválidas');
          break;
        case 500:
          setError('Problema no servidor');
          break;
        default:
          setError('Erro inesperado');
      }
    } else {
      setError('Sem conexão com o servidor');
    }
    Alert.alert('Erro', error.message || 'Falha na autenticação');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TouchableOpacity style={styles.themeToggle} onPress={toggleDarkMode}>
        <Text style={styles.themeText}>
          {isDarkMode ? '🌞 Claro' : '🌙 Escuro'}
        </Text>
      </TouchableOpacity>

      <Image
        source={require('../assets/images/logoColegioIntegracaoBaby.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Bem-vindo ao QuizApp
      </Text>

      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Usuário"
        placeholderTextColor={isDarkMode ? '#B0BEC5' : '#9E9E9E'}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
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
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    elevation: 3,
  },
  input: {
    height: 50,
    width: '100%',
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
    backgroundColor: '#4ECDC4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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
