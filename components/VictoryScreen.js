import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const VictoryScreen = ({ score, totalQuestions, onRestart, onGoToStart, isDarkMode }) => {
  const isVictory = score / totalQuestions >= 0.6;

  const containerStyle = [
    styles.scoreContainer,
    isVictory 
      ? (isDarkMode ? styles.victoryContainerDark : styles.victoryContainerLight)
      : (isDarkMode ? styles.failureContainerDark : styles.failureContainerLight)
  ];

  const titleStyle = [
    styles.victoryTitle,
    isDarkMode ? styles.textDark : styles.textLight
  ];

  const scoreTextStyle = [
    styles.scoreText,
    isDarkMode ? styles.textDark : styles.textLight
  ];

  const messageStyle = [
    styles.resultMessage,
    isDarkMode ? styles.textDark : styles.textLight
  ];

  const restartButtonStyle = [
    styles.actionButton,
    isVictory 
      ? (isDarkMode ? styles.victoryButtonDark : styles.victoryButtonLight)
      : (isDarkMode ? styles.failureButtonDark : styles.failureButtonLight)
  ];

  const startButtonStyle = [
    styles.actionButton,
    isDarkMode ? styles.startButtonDark : styles.startButtonLight
  ];

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>
        {isVictory ? '🎉 Parabéns!' : '😕 Tente Novamente'}
      </Text>
      <Image
        source={isVictory ? require('../assets/images/congrats.jpg') : require('../assets/images/try-again.jpg')}
        style={styles.resultImage}
      />
      <Text style={scoreTextStyle}>
        Você acertou {score} de {totalQuestions} perguntas
      </Text>
      <Text style={messageStyle}>
        {isVictory
          ? 'Você é um verdadeiro expert! Continue assim!'
          : 'Não desanime! Pratique mais e você vai melhorar!'}
      </Text>
      <TouchableOpacity onPress={onRestart} style={restartButtonStyle}>
        <Text style={styles.actionButtonText}>
          {isVictory ? 'Jogar Novamente' : 'Tentar Novamente'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoToStart} style={startButtonStyle}>
        <Text style={styles.actionButtonText}>Voltar ao Início</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scoreContainer: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    margin: 20,
    marginTop: 50, // Adicione esta linha para abaixar a caixa do resultado
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  // Estilos para vitória
  victoryContainerLight: {
    backgroundColor: '#e0f7e9', // fundo verde claro
    borderColor: '#2e7d32',     // borda verde escura
    borderWidth: 2,
  },
  victoryContainerDark: {
    backgroundColor: '#1b5e20', // fundo verde escuro
    borderColor: '#4caf50',     // borda verde vibrante
    borderWidth: 2,
  },
  // Estilos para derrota
  failureContainerLight: {
    backgroundColor: '#ffebee', // fundo rosa claro
    borderColor: '#c62828',     // borda vermelha escura
    borderWidth: 2,
  },
  failureContainerDark: {
    backgroundColor: '#b71c1c', // fundo vermelho escuro
    borderColor: '#ef5350',     // borda vermelha mais clara
    borderWidth: 2,
  },
  victoryTitle: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  resultImage: {
    width: 140,
    height: 140,
    marginVertical: 20,
    borderRadius: 70,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
  },
  resultMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Botões de ação para vitória e derrota
  victoryButtonLight: {
    backgroundColor: '#2e7d32',
  },
  victoryButtonDark: {
    backgroundColor: '#4caf50',
  },
  failureButtonLight: {
    backgroundColor: '#c62828',
  },
  failureButtonDark: {
    backgroundColor: '#ef5350',
  },
  startButtonLight: {
    backgroundColor: '#1976d2',
  },
  startButtonDark: {
    backgroundColor: '#64b5f6',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  // Cores dos textos conforme o modo
  textLight: {
    color: '#212121',
  },
  textDark: {
    color: '#ffffff',
  },
});

export default VictoryScreen;