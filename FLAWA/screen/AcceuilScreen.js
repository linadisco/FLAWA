import React from 'react';
import { View, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

const AccueilScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Remplace le chemin par celui de ton image */}
      <ImageBackground 
        source={require('../assets/Accueil.png')} 
        style={styles.background}
        resizeMode="cover" // "cover" pour que l'image recouvre toute la page
      >
        {/* Le bouton en bas de la page */}
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.buttonText}>Scan Product</Text>
        </TouchableOpacity>
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
      justifyContent: 'flex-end', // Place le bouton en bas
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#8a2be2', // Violet
      borderRadius: 30, // Pour les bords arrondis
      paddingVertical: 15, // Hauteur du bouton
      paddingHorizontal: 30, // Largeur du bouton
      shadowColor: '#000', // Couleur de l'ombre
      shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
      shadowOpacity: 0.8, // Opacité de l'ombre
      shadowRadius: 2, // Flou de l'ombre
      elevation: 5, // Ombre sur Android
      marginBottom: 60, // Espace en bas pour le bouton
    },
    buttonText: {
      color: '#000', // Texte noir
      fontWeight: 'bold', // Texte en gras
      fontSize: 20, // Taille du texte
      textAlign: 'center', // Centrer le texte dans le bouton
    },
  });

export default AccueilScreen;