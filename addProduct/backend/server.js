import express from 'express';
import emailjs from 'emailjs-com';

const app = express();
app.use(express.json());

app.post('/send-email', (req, res) => {
  const { productName, productBrand, barcode, productImage, ingredientsImage } = req.body;

  const templateParams = {
    productName,
    productBrand,
    barcode,
    productImage,
    ingredientsImage,
  };

  emailjs.send('service_emr9449', 'template_ztumbkb', templateParams, 'xbH7FSWlPVIoyKI9G')
    .then((response) => {
      res.status(200).json({ success: true, message: 'Email envoyé' });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: 'Email non envoyé', error });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
