const axios = require('axios');
const fs = require('fs');

const FILE_PATH = '../api-product.json';

async function fetchProductsByBrand(brand) {
  try {
    const response = await axios.get(`https://makeup-api.herokuapp.com/api/v1/products.json?brand=${encodeURIComponent(brand)}`);

    if (!response.data || !response.data.length) {
      console.log('No products found for brand:', brand);
      return null;
    }

    const products = response.data.map(product => ({
      id: product.id || '',
      brand: [product.brand] || [],
      name: product.name || '',
      price: product.price || '',
      price_sign: product.price_sign || '',
      currency: product.currency || '',
      image_link: product.image_link || '',
      product_link: product.product_link || '',
      website_link: product.website_link || '',
      description: product.description || '',
      rating: product.rating || null,
      category: product.category || '',
      product_type: product.product_type || '',
      tag_list: product.tag_list || [],
      created_at: product.created_at || '',
      updated_at: product.updated_at || '',
      product_api_url: product.product_api_url || '',
      api_featured_image: product.api_featured_image || '',
      product_colors: product.product_colors || []
    }));

    return products;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
}

async function populateJsonByBrand(brand) {
  const productsData = await fetchProductsByBrand(brand);
  if (productsData) {
    let jsonData = { page_size: productsData.length, order: 'alphabetic', products: productsData };

    if (fs.existsSync(FILE_PATH)) {
      const existingData = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
      existingData.products.push(...productsData);
      existingData.page_size = existingData.products.length;
      jsonData = existingData;
    }

    fs.writeFileSync(FILE_PATH, JSON.stringify(jsonData, null, 2));
    console.log('Data successfully written to file.');
  }
}

// populateJsonByBrand('');



// colourpop / boosh / deciem / zorah biocosmetiques / w3llpeople / sally b's skin yummies / rejuva minerals / penny lane organics / nudus / marienatie / maia's mineral galaxy / lotus cosmetics usa / green people / coastal classic creation / c'est moi / alva / glossier / nyx / fenty / clinique / dior / iman / benefit / smashbox / marcelle / stila / mineral fusion / annabelle / dr. hauschka / physicians formula / cargo cosmetics / covergirl / almay / milani / pure anada / l'oreal / sante / revlon / anna sui / wet n wild / pacifica / mistura / zorah / suncoat / moov / misa / salon perfect / orly / china glaze / essie / butter london / sinful colours / piggy paint / dalish / burt's bees / 
