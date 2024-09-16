import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const SearchBar = () => {
  const [query, setQuery] = useState(''); // État pour la requête de recherche
  const [products, setProducts] = useState([]); // Tous les produits récupérés
  const [filteredProducts, setFilteredProducts] = useState([]); // Produits filtrés
  const [selectedProduct, setSelectedProduct] = useState(null); // Produit sélectionné
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  // Récupération des produits depuis l'API
  useEffect(() => {
    setLoading(true);
    fetch('https://produits-beaute-api.s3.eu-west-3.amazonaws.com/api.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products); // Récupérer la liste de produits
        setLoading(false);
      })
      .catch((error) => {
        setError('Erreur lors du chargement des produits');
        setLoading(false);
      });
  }, []);

  // Filtrer les produits selon la requête de recherche
  useEffect(() => {
    if (query.length >= 1) {
      const results = products
        .filter((product) =>
          product.product_name &&
          product.product_name.toLowerCase().startsWith(query.toLowerCase()) // Affiner la recherche avec startsWith
        )
        .sort((a, b) => a.product_name.localeCompare(b.product_name)); // Tri alphabétique par product_name
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Pas de résultats affichés si moins de 1 caractère
    }
  }, [query, products]);

  // Fonction pour afficher les détails du produit sélectionné
  const handleProductClick = (product) => {
    setSelectedProduct(product); // Sélectionner un produit pour en afficher les détails
  };

  // Si un produit est sélectionné, afficher ses détails
  if (selectedProduct) {
    return (
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Nom du produit : {selectedProduct.product_name}</Text>
        <Text>Pays : {selectedProduct.countries_tags.join(', ')}</Text>
        <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.backButton}>
          <Text style={styles.backButtonText}>Retour à la recherche</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit par nom..."
        value={query}
        onChangeText={setQuery}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Afficher les produits uniquement si la recherche a au moins 1 caractère */}
      {filteredProducts.length > 0 && (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productItem} onPress={() => handleProductClick(item)}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.productCountry}>Pays : {item.countries_tags.join(', ')}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {filteredProducts.length === 0 && query.length >= 1 && !loading && !error && (
        <Text style={styles.noResultsText}>Aucun produit trouvé.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCountry: {
    fontSize: 14,
    color: '#666',
  },
  productDetails: {
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SearchBar;
