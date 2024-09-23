import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ChatPage = () => {
  const [productName, setProductName] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [barcode, setBarcode] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [ingredientsImage, setIngredientsImage] = useState(null);

  const selectImage = async (setImage) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission d'accéder à la galerie est requise.");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setImage(pickerResult.uri);
    }
  };

  const handleSendEmail = () => {
    if (!productName || !productBrand || !barcode || !productImage || !ingredientsImage) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs et fournir les images.');
      return;
    }
  
    fetch('http://localhost:8081/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productName,
        productBrand,
        barcode,
        productImage,
        ingredientsImage,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          Alert.alert('Succès', 'Email envoyé avec succès.');
        } else {
          Alert.alert('Erreur', 'Échec de l\'envoi de l\'email.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Erreur', 'Erreur de communication avec le serveur.');
      });
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nom du produit</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
        placeholder="Entrez le nom du produit"
        placeholderTextColor="#C5AE96"
      />

      <Text style={styles.label}>Marque du produit</Text>
      <TextInput
        style={styles.input}
        value={productBrand}
        onChangeText={setProductBrand}
        placeholder="Entrez la marque du produit"
        placeholderTextColor="#C5AE96"
      />

      <Text style={styles.label}>Code-barres du produit</Text>
      <TextInput
        style={styles.input}
        value={barcode}
        onChangeText={setBarcode}
        placeholder="Entrez le code-barres du produit"
        placeholderTextColor="#C5AE96"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Photo du produit</Text>
      {productImage ? (
        <Image source={{ uri: productImage }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => selectImage(setProductImage)}>
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Photo des ingrédients</Text>
      {ingredientsImage ? (
        <Image source={{ uri: ingredientsImage }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => selectImage(setIngredientsImage)}>
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSendEmail}>
        <Text style={styles.submitButtonText}>Envoyer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#863B0A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C5AE96',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#FFF3E3',
    color: '#000',
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#ECAD7C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#C96A25',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default ChatPage;
