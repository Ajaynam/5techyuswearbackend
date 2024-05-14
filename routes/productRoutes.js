
// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// // const verifyToken = require('../middleware/authMiddlewere');

// router.post('/new_product', productController.createProduct);
// router.get('/get_product', productController.getAllProducts);
// router.get('/get_product/:id', productController.getProductById);
// router.put('/update_product/:id', productController.updateProduct);
// router.delete('/remove_product/:id', productController.deleteProduct);

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/productController');
const upload = require('../middleware/productImage'); 

router.post('/new_product', upload.single('ProductImage'), productController.createProduct);
router.get('/get_product', productController.getAllProducts);
router.get('/get_product/:id', productController.getProductById);
router.put('/update_product/:id', upload.single('ProductImage'), productController.updateProduct);
router.delete('/remove_product/:id', productController.deleteProduct);

module.exports = router;

