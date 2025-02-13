import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = ({ isDarkMode }) => {
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <ActivityIndicator size="large" color={isDarkMode ? "#FFFFFF" : "#1d7d00"} />
      <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>Carregando...</Text>
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
    backgroundColor: '#1A1A1A',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#1d7d00',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default Loading;