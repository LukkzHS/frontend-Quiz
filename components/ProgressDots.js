import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressDots = ({ progress, isDarkMode }) => {
  return (
    <View style={styles.progressContainer}>
      {progress.map((status, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            status === true && styles.correctDot,
            status === false && styles.wrongDot,
            status === null && (isDarkMode ? styles.neutralDotDark : styles.neutralDotLight)
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProgressDots;