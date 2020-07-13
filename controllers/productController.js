const Product = require('../models/Product');
const { validationResult } = require('express-validator');


exports.createProduct = async (req, res) => {
    
    //review if there are errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }
    
    try {
        //create a new product
        const product = new Product(req.body);

        //save the creator for JWT
        //product.creator = req.user.id

        //save the product
        await product.save();
        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

//get all the products of current User
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

//update product
exports.updateProduct = async (req, res) => {
    
    //review if there are errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    //extract the information of product
    const { name, price } = req.body;
    const newProduct = {};

    if(name){
        newProduct.name = name;
        newProduct.price = price;
    }

    try {
        
        //check the ID
        let product = await Product.findById(req.params.id);

        //if the product exist or no
        if(!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        //update
        product = await Product.findOneAndUpdate({ _id: req.params.id }, { $set : newProduct }, { new : true });

        res.json({ product });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');
    }
}

//delete a product for his "ID"
exports.deleteProduct = async (req, res) => {
    
    try {
        //check the ID
        let product = await Product.findById(req.params.id);

        //if the product exist or no
        if(!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        //delete the product
        await Product.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Product removed' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server');
    }
}