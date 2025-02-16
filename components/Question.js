import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Question = ({ question, image, options, isDarkMode, handleAnswer, isAnswerSelected, selectedIndex, answeredQuestions, currentQuestion }) => {
  return (
    <View style={styles.questionContent}>
      {image && (
        <Image 
          source={image} 
          style={styles.questionImage} 
        />
      )}

      <Text style={[styles.questionText, isDarkMode ? styles.darkText : styles.lightText]}>
        {question}
      </Text>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          let buttonStyle = [
            styles.optionButton,
            isDarkMode ? styles.darkOptionButton : styles.lightOptionButton
          ];
          let textStyle = isDarkMode ? styles.darkOptionText : styles.lightOptionText;

          if (answeredQuestions.includes(currentQuestion)) {
            if (index === correctAnswer) {
              buttonStyle.push(styles.correctOption);
              textStyle = styles.correctOptionText;
            } else if (index === selectedIndex) {
              buttonStyle.push(styles.wrongOption);
              textStyle = styles.wrongOptionText;
            } else {
              buttonStyle.push(isDarkMode ? styles.disabledDarkOption : styles.disabledLightOption);
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={buttonStyle}
              onPress={() => handleAnswer(index)}
              disabled={isAnswerSelected || answeredQuestions.includes(currentQuestion)}
            >
              <Text style={textStyle}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContent: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  questionImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain', // Alterado para 'contain' para evitar bordas brancas
    backgroundColor: isDarkMode ? '#37474F' : '#E0E0E0', // Cor de fundo condicional
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 35,
    textAlign: 'center',
    lineHeight: 34,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  optionButton: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  lightOptionButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  darkOptionButton: {
    backgroundColor: '#263238',
    borderColor: '#37474F',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  wrongOption: {
    backgroundColor: '#F44336',
    borderColor: '#D32F2F',
  },
  disabledLightOption: {
    backgroundColor: '#F5F5F5',
  },
  disabledDarkOption: {
    backgroundColor: '#37474F',
  },
  lightOptionText: {
    color: '#212121',
  },
  darkOptionText: {
    color: '#ECEFF1',
  },
  correctOptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  wrongOptionText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  darkText: {
    color: '#ECEFF1',
  },
  lightText: {
    color: '#212121',
  },
});

export default Question;