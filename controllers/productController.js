const db = require('../models/db');
const cloudinary = require('cloudinary').v2;
const upload = require('../middleware/productImage');
const fs = require('fs');



cloudinary.config({
  cloud_name: 'dsxlrlc0c',
  api_key: '124118441879576',
  api_secret: 'OmseKOvrDC0U70cxxONFGUtluwo'
});


const createProduct = async (req, res) => {
  try {
    const { ProductName, Category, Description, Price ,Discount ,Quantity} = req.body;
    const ProductImage = req.file.path;
    const uploadResult = await cloudinary.uploader.upload(ProductImage);
    fs.unlinkSync(ProductImage);
    const sql = 'INSERT INTO products (ProductName, ProductImage, Category, Description, Price ,Discount ,Quantity) VALUES (?, ?, ?, ?, ? ,?,?)';
    const result = await db.queryAsync(sql, [ProductName, uploadResult.secure_url, Category, Description, Price ,Discount ,Quantity]);

    res.status(201).json({ message: 'Product created successfully', id: result.insertId });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const sql = 'SELECT * FROM products';
    const results = await db.queryAsync(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const result = await db.queryAsync(sql, [id]);

    if (result.length === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};




const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { ProductName, Category, Description, Price ,Discount ,Quantity} = req.body;
  let ProductImage = req.file ? req.file.path : null; 

  try {
    if (ProductImage) {
      const uploadResult = await cloudinary.uploader.upload(ProductImage);
      fs.unlinkSync(ProductImage);
      ProductImage = uploadResult.secure_url;
    }

    const sql = 'UPDATE products SET ProductName = ?, ProductImage = ?, Category = ?, Description = ?, Price = ?, Discount =?, Quantity =?, WHERE id = ?';
    const result = await db.queryAsync(sql, [ProductName, ProductImage, Category, Description, Price, Discount ,Quantity, id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product updated successfully' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
};




const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const sql = 'DELETE FROM products WHERE id = ?';
    const result = await db.queryAsync(sql, [id]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
