import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ThemeToggleButton from './ThemeToggleButton';
import ThemeContext from '../contexts/ThemeContext';

const HomeScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [turma, setTurma] = useState({ nome: '', serie: '' });
  const [aluno, setAluno] = useState({ nome: '', id: '' });

  useEffect(() => {
    const fetchAlunoData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const alunoData = JSON.parse(userData);
        setAluno(alunoData);
      }
    };

    fetchAlunoData();
  }, []);

  useEffect(() => {
    const fetchTurma = async () => {
      if (aluno.id) {
        try {
          const response = await axios.get(`http://192.168.3.8:8083/api/turmas/aluno/${aluno.id}`);
          if (response.data.length > 0) {
            setTurma(response.data[0]);
          }
        } catch (error) {
          console.error('Erro ao buscar dados da turma:', error);
        }
      }
    };

    fetchTurma();
  }, [aluno.id]);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ThemeToggleButton />

      <Image
        source={require('../assets/images/quizColegioIntegracaoBabyLogo.png')}
        style={styles.logo}
      />

      <Text style={[styles.title, isDarkMode && styles.darkText]}>
        Bem-vindo, {aluno.nome}!
      </Text>
      <Text style={[styles.subtitle, isDarkMode && styles.darkText]}>
        Turma: {turma.nome} - Série: {turma.serie}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Quiz')}
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
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  darkText: {
    color: '#FFF',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default HomeScreen;