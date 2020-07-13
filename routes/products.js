const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { check } = require('express-validator');

//create products
// endpoint: api/products
router.post('/', 
    [
        check('name', 'The product name is required').not().isEmpty(),
        check('price', 'The price is required').not().isEmpty()
    ],
    productController.createProduct
);

//get all projects
router.get('/', 
    productController.getProducts
);

//update project for "id"
router.put('/:id', 
    [
        check('name', 'The product name is required').not().isEmpty(),
        check('price', 'The price is required').not().isEmpty()
    ],
    productController.updateProduct
);


//deleting a project
router.delete('/:id',
    productController.deleteProduct
);



module.exports = router;