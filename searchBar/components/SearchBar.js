import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://produits-beaute-api.s3.eu-west-3.amazonaws.com/api-product.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        setError("Erreur lors du chargement des produits");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (query.length >= 1) {
      const results = products
        .filter((product) => {
          const hasProductName =
            product.product_name &&
            product.product_name.toLowerCase().includes(query.toLowerCase());
          const hasBrands =
            Array.isArray(product.brands) &&
            product.brands.some((brand) =>
              brand.toLowerCase().includes(query.toLowerCase())
            );
          return hasProductName || hasBrands;
        })
        .sort((a, b) => a.product_name.localeCompare(b.product_name));
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (selectedProduct) {
    return (
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          Nom du produit : {selectedProduct.product_name}
        </Text>
        <Text>Quantité : {selectedProduct.product_quantity}</Text>
        <Text>Labels : {selectedProduct.labels.join(", ")}</Text>
        <Text>Marque : {selectedProduct.brands.join(", ")}</Text>
        <TouchableOpacity
          onPress={() => setSelectedProduct(null)}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Retour à la recherche</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit par nom ou marque..."
        value={query}
        onChangeText={setQuery}
      />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {filteredProducts.length > 0 && (
        <FlatList
          data={filteredProducts.slice(0, 15)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productItem}
              onPress={() => handleProductClick(item)}
            >
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.productCountry}>
                Labels :{" "}
                {Array.isArray(item.labels)
                  ? item.labels.join(", ")
                  : "Aucun label disponible"}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />
      )}
      {filteredProducts.length === 0 &&
        query.length >= 1 &&
        !loading &&
        !error && (
          <Text style={styles.noResultsText}>Aucun produit trouvé.</Text>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productCountry: {
    fontSize: 14,
    color: "#666",
  },
  productDetails: {
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  flatListContent: {
    flexGrow: 1,
  },
});

export default SearchBar;
