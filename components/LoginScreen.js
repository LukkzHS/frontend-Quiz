import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ThemeToggleButton from './ThemeToggleButton';
import ThemeContext from '../contexts/ThemeContext';

const FIREBASE_API_KEY = "AIzaSyC3yWPHNOZ17LrRx68G7oMY0FPty9aIwqo";

const LoginScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      setError('Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 🔹 Login no Firebase via API REST
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: senha,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Erro ao fazer login.');
      }

      // 🔹 Obtém o token JWT retornado pelo Firebase
      const token = data.idToken;

      // 🔹 Envia o token para o backend para validação
      const backendResponse = await axios.post(
        "http://192.168.3.8:8080/api/auth/validate", // Verifique se este URL está correto
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (backendResponse.status === 200) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        // Armazena o token e os dados do usuário no AsyncStorage, se necessário
        await AsyncStorage.multiSet([
          ['userToken', token],
          ['userData', JSON.stringify(backendResponse.data)],
        ]);
        navigation.navigate('Home');
      } else {
        setError("Erro ao autenticar no backend.");
      }
    } catch (err) {
      setError(err.message || "Falha ao conectar com o servidor.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ThemeToggleButton />

      <Image
        source={require('../assets/images/logoColegioIntegracaoBaby.png')}
        style={styles.logo}
      />

      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        🎒 Login do Aluno
      </Text>

      <View style={styles.inputGroup}>
        <TextInput
          value={email}
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Digite seu email"
          placeholderTextColor={isDarkMode ? '#B0BEC5' : '#9E9E9E'}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
          textAlign="center" // Centraliza o placeholder
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          secureTextEntry
          value={senha}
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder="Digite sua senha"
          placeholderTextColor={isDarkMode ? '#B0BEC5' : '#9E9E9E'}
          autoCapitalize="none"
          onChangeText={setSenha}
          textAlign="center" // Centraliza o placeholder
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {isLoading ? (
        <ActivityIndicator size="large" color="#4ECDC4" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      )}
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
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    color: '#333',
    textAlign: 'center',
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