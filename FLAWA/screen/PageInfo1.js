import React from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AccueilScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Remplace le chemin par celui de ton image */}
      <ImageBackground 
        source={require('../assets/Background.png')} 
        style={styles.background}
        resizeMode="cover" // "cover" pour que l'image recouvre toute la page
      >
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
  });

export default AccueilScreen;