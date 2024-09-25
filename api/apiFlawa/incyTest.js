const crypto = require("crypto");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const secretKey = "WlcRehIn7tXwHRUvi4ebMcNMp1kgB0CB";
const accessKeyId = "bec1686b9e0b2e61";

const filePath = path.join(__dirname, "../apiFlawa/jsons/gel_sculptant.json");
const productsFilePath = path.join(__dirname, "./products.json");

// Fonction pour initialiser le fichier de produits s'il n'existe pas
function initializeProductsFile() {
  if (!fs.existsSync(productsFilePath)) {
    fs.writeFileSync(productsFilePath, JSON.stringify([]), "utf8");
  }

  const fileContent = fs.readFileSync(productsFilePath, "utf8");
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

// Fonction pour sauvegarder les produits dans le fichier JSON
function saveProductsToFile(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), "utf8");
}

// Fonction pour lire les EANs depuis test.json
function loadEANsFromFile() {
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    try {
      return JSON.parse(fileContent); // Retourne un tableau des EANs
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier :", error);
      return [];
    }
  } else {
    console.error("Le fichier des produits à insérer n'existe pas.");
    return [];
  }
}

// Fonction pour récupérer les détails d'un produit via l'API
async function fetchProductDetails(ean) {
  const path = `/product/composition/${ean}?accessKeyId=${accessKeyId}`;
  const hmac = crypto.createHmac("sha256", secretKey).update(path).digest("hex");
  const apiUrl = `https://api.incibeauty.com${path}&hmac=${hmac}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data; 
  } catch (error) {
    console.error(`Erreur inconnue pour EAN ${ean}:`, error.response?.status, error.response?.data);
    return null;
  }
}

// Fonction principale pour traiter les EANs
async function processEANs() {
  let products = initializeProductsFile();
  let validEANs = loadEANsFromFile(); // Charger les EANs depuis le fichier test.json

  for (let i = 0; i < validEANs.length; i++) {
    const ean = validEANs[i];
    const productDetails = await fetchProductDetails(ean);

    if (productDetails) {
      console.log(`Produit récupéré pour EAN ${ean}:`, productDetails.name);
      products.push(productDetails); 
    }
  }

  saveProductsToFile(products);
  console.log("Tous les produits ont été récupérés et enregistrés dans le fichier products.json.");
}

processEANs();


// const crypto = require("crypto");

// const secretKey = "WlcRehIn7tXwHRUvi4ebMcNMp1kgB0CB"; // Remplace par ta clé secrète
// const accessKeyId = "bec1686b9e0b2e61"; // Remplace par ta clé d'accès

// // EAN du produit (code-barres)
// const ean = "8719238001605";

// // Chemin exact comme expliqué dans la documentation
// const path = `/product/composition/${ean}?accessKeyId=${accessKeyId}`;

// // Génération de la signature HMAC avec l'algorithme SHA256
// const hmac = crypto.createHmac("sha256", secretKey).update(path).digest("hex");

// console.log("HMAC Generated:", hmac);

// // URL complète pour faire la requête à l'API
// const apiUrl = `https://api.incibeauty.com${path}`;

// // Faire une requête avec Axios en ajoutant la signature dans les en-têtes
// const axios = require("axios");

// axios
//   .get(apiUrl, {
//     headers: {
//       "X-Signature": hmac, // Signature HMAC générée
//     },
//   })
//   .then((response) => {
//     // Afficher les données reçues de l'API
//     console.log(response.data);
//   })
//   .catch((error) => {
//     // Afficher les erreurs s'il y en a
//     console.error("Erreur lors de la requête :", error.response?.status, error.response?.data);
//   });

