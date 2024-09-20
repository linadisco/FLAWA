import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import emailjs from 'emailjs-com'; 

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

    const templateParams = {
      productName,
      productBrand,
      barcode,
      productImage,
      ingredientsImage,
    };

    emailjs.send('service_emr9449', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        Alert.alert('Succès', 'Email envoyé avec succès!');
      }, (err) => {
        Alert.alert('Erreur', 'Échec de l\'envoi de l\'email. Veuillez réessayer.');
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
    backgroundColor: '#FFF',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#863B0A',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C5AE96',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    color: '#863B0A',
    backgroundColor: '#FFA477',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 16,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#ECAD7C',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
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
