import React, { useState, useEffect } from "react";
import {
  View,
<<<<<<< HEAD
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import ProductDetails from "./ProductDetails";
import ProductItem from "./ProductItem";
=======
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fonction pour charger tous les produits de l'API
  const fetchProducts = async () => {
    if (loading || loadingMore) return;
    setLoading(true);
    try {
      const response = await fetch(
        "https://produits-beaute-api.s3.eu-west-3.amazonaws.com/products_cut_1.json"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError("Erreur lors du chargement des produits");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    const results = products.filter((product) => {
      const matchesName =
        product.name && product.name.toLowerCase().includes(query.toLowerCase());
      const matchesBrand =
        product.brand && product.brand.toLowerCase().includes(query.toLowerCase());
      const matchesEan =
        product.eans && product.eans.some((ean) => ean.includes(query));
      return matchesName || matchesBrand || matchesEan;
    });

    // Trier les résultats par pertinence (nom et score)
    const sortedResults = results.sort((a, b) => {
      const nameComparison = a.name
        .toLowerCase()
        .localeCompare(b.name.toLowerCase());
      const scoreComparison = (b.validation_score || 0) - (a.validation_score || 0);
      return nameComparison || scoreComparison;
    });

    setFilteredProducts(sortedResults);
    setPage(0); // Réinitialiser la pagination lors d'une nouvelle recherche
    setHasMore(sortedResults.length > 15);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingMore(false);
        if ((page + 1) * 15 >= filteredProducts.length) {
          setHasMore(false);
        }
      }, 1000);
    }
  };
=======

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
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  if (selectedProduct) {
    return (
<<<<<<< HEAD
      <ProductDetails
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
=======
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
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb
    );
  }

  return (
<<<<<<< HEAD
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un produit par nom, marque ou code-barres..."
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch} // Permet de lancer la recherche avec la touche "Entrée"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Rechercher</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && filteredProducts.length > 0 && (
        <FlatList
          data={filteredProducts.slice(0, (page + 1) * 15)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} onPress={handleProductClick} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : null
          }
        />
      )}

      {!loading && !error && filteredProducts.length === 0 && query.length >= 1 && (
        <Text style={styles.noResultsText}>Aucun produit trouvé.</Text>
      )}
=======
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
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
=======
  searchContainer: {
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb
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
<<<<<<< HEAD
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
=======
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
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb
  },
  noResultsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
<<<<<<< HEAD
  columnWrapper: {
    justifyContent: "space-between",
=======
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  flatListContent: {
    flexGrow: 1,
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb
  },
});

export default SearchBar;
<<<<<<< HEAD
// test
=======
>>>>>>> c0272fe21fe542b05ff2319d908b49bcf189bbdb
