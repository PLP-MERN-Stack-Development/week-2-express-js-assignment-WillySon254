const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database for products
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High performance laptop',
    price: 999.99,
    category: 'Electronics',
    inStock: true
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest model smartphone',
    price: 699.99,
    category: 'Electronics',
    inStock: true
  }
];

// Products routes will go here

//List all products
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

//Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

//Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  
  if (!name || !description || !price || !category || typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
    category,
    inStock
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

//Update existing product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;
  
  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (category) product.category = category;
  if (typeof inStock === 'boolean') product.inStock = inStock;

  res.json(product);
});

//Delete a product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const deletedProduct = products.splice(productIndex, 1);
  res.json(deletedProduct[0]);
});