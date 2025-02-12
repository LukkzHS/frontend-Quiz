import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import axios from 'axios';
import { Buffer } from 'buffer';
import VictoryScreen from './VictoryScreen';

// Polyfill para Buffer
if (typeof global.Buffer === 'undefined') {
  global.Buffer = Buffer;
}

const QuizScreen = ({ onGoToStart, isDarkMode }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [processedQuestions, setProcessedQuestions] = useState([]);
  const [progress, setProgress] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const processQuestions = (originalQuestions) => {
    return originalQuestions.map((question) => {
      const options = [...question.options];
      const correctAnswerText = options[question.correctAnswer];
      shuffleArray(options);
      return {
        ...question,
        options: options,
        correctAnswer: options.indexOf(correctAnswerText),
      };
    });
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const fetchRandomAtividade = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.3.8:8080/api/atividades');
      const atividades = response.data;
      const randomAtividade = atividades[Math.floor(Math.random() * atividades.length)];
      const atividadeResponse = await axios.get(
        `http://192.168.3.8:8080/api/atividades/${randomAtividade.id}`
      );
      
      const questoes = await Promise.all(
        atividadeResponse.data.questoes.map(async (questao) => {
          let imageUrl = null;
          if (questao.imagemId) {
            try {
              const response = await axios.get(
                `http://192.168.3.8:8080/api/images/${questao.imagemId}`,
                { responseType: 'arraybuffer' }
              );
              
              if (response.data && response.data.byteLength > 0) {
                const base64 = Buffer.from(response.data, 'binary').toString('base64');
                imageUrl = `data:image/jpeg;base64,${base64}`;
              }
            } catch (error) {
              console.error('Erro ao carregar imagem:', error);
            }
          }
          
          return {
            question: questao.enunciado,
            options: questao.alternativas,
            correctAnswer: questao.alternativas.indexOf(questao.resposta),
            image: imageUrl,
          };
        })
      );

      shuffleArray(questoes);
      setProcessedQuestions(processQuestions(questoes));
      setProgress(Array(questoes.length).fill(null));

    } catch (error) {
      setError('Erro ao carregar atividades');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (index) => {
    if (!isAnswerSelected && !answeredQuestions.includes(currentQuestion)) {
      setSelectedIndex(index);
      setIsAnswerSelected(true);
      const isCorrect =
        index === processedQuestions[currentQuestion]?.correctAnswer;

      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[currentQuestion] = isCorrect;
        return newProgress;
      });

      setAnsweredQuestions([...answeredQuestions, currentQuestion]);
      if (isCorrect) setScore(score + 1);

      setTimeout(() => {
        setIsAnswerSelected(false);
        goToNextQuestion();
      }, 1500);
    }
  };

  const restartQuiz = () => {
    fetchRandomAtividade();
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setProgress(Array(processedQuestions.length).fill(null));
    setAnsweredQuestions([]);
    setSelectedIndex(null);
    setKey((prev) => prev + 1);
  };

  const resetQuiz = () => {
    onGoToStart();
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setProgress(Array(processedQuestions.length).fill(null));
    setAnsweredQuestions([]);
    setSelectedIndex(null);
    setKey((prev) => prev + 1);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < processedQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedIndex(null);
      setKey((prev) => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  useEffect(() => {
    fetchRandomAtividade();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {!showScore && (
        <>
          <View style={styles.headerRow}>
            <CountdownCircleTimer
              key={key}
              isPlaying
              duration={15}
              size={50}
              colors={
                isDarkMode
                  ? ['#4CAF50', '#F7B801', '#A30000']
                  : ['#2E7D32', '#F9A825', '#C62828']
              }
              colorsTime={[10, 5, 0]}
              onComplete={() => {
                setProgress((prev) => {
                  const newProgress = [...prev];
                  newProgress[currentQuestion] = false;
                  return newProgress;
                });
                goToNextQuestion();
              }}>
              {({ remainingTime }) => (
                <Text
                  style={
                    isDarkMode ? styles.timerTextDark : styles.timerTextLight
                  }>
                  {remainingTime}s
                </Text>
              )}
            </CountdownCircleTimer>

            <Text
              style={[
                styles.questionCount,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              Pergunta {currentQuestion + 1}/{processedQuestions.length}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            {progress.map((status, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  status === true && styles.correctDot,
                  status === false && styles.wrongDot,
                  status === null &&
                    (isDarkMode
                      ? styles.neutralDotDark
                      : styles.neutralDotLight),
                ]}
              />
            ))}
          </View>

          <View style={styles.questionContent}>
            {processedQuestions[currentQuestion]?.image && (
              <FastImage
                style={styles.questionImage}
                source={{
                  uri: processedQuestions[currentQuestion].image,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
                onError={(e) => console.log('Erro na imagem:', e.nativeEvent.error)}
                fallback={true}
              />
            )}

            <Text
              style={[
                styles.questionText,
                isDarkMode ? styles.darkText : styles.lightText,
              ]}>
              {processedQuestions[currentQuestion]?.question}
            </Text>

            <View style={styles.optionsContainer}>
              {processedQuestions[currentQuestion]?.options.map(
                (option, index) => {
                  let buttonStyle = [
                    styles.optionButton,
                    isDarkMode
                      ? styles.darkOptionButton
                      : styles.lightOptionButton,
                  ];
                  let textStyle = isDarkMode
                    ? styles.darkOptionText
                    : styles.lightOptionText;

                  if (answeredQuestions.includes(currentQuestion)) {
                    if (
                      index ===
                      processedQuestions[currentQuestion].correctAnswer
                    ) {
                      buttonStyle.push(styles.correctOption);
                      textStyle = styles.correctOptionText;
                    } else if (index === selectedIndex) {
                      buttonStyle.push(styles.wrongOption);
                      textStyle = styles.wrongOptionText;
                    } else {
                      buttonStyle.push(
                        isDarkMode
                          ? styles.disabledDarkOption
                          : styles.disabledLightOption
                      );
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={index}
                      style={buttonStyle}
                      onPress={() => handleAnswer(index)}
                      disabled={
                        isAnswerSelected ||
                        answeredQuestions.includes(currentQuestion)
                      }>
                      <Text style={textStyle}>{option}</Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>
          </View>
        </>
      )}

      {showScore && (
        <VictoryScreen
          score={score}
          totalQuestions={processedQuestions.length}
          onRestart={restartQuiz}
          onGoToStart={resetQuiz}
          isDarkMode={isDarkMode}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  darkContainer: {
    backgroundColor: '#1A1A1A',
  },
  lightContainer: {
    backgroundColor: '#F8F9FA',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 15,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
    flexWrap: 'wrap',
  },
  progressDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    margin: 6,
    elevation: 2,
  },
  correctDot: {
    backgroundColor: '#4CAF50',
  },
  wrongDot: {
    backgroundColor: '#F44336',
  },
  neutralDotDark: {
    backgroundColor: '#37474F',
  },
  neutralDotLight: {
    backgroundColor: '#E0E0E0',
  },
  questionCount: {
    fontSize: 18,
    fontWeight: '500',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  timerTextDark: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  timerTextLight: {
    color: '#2E7D32',
    fontSize: 14,
  },
  questionContent: {
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  questionImage: {
    width: '100%',
    height: 150,
    marginBottom: 25,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default QuizScreen;