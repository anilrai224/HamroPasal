const Product = require('../models/Product');

//Create Product
  const createProduct= async (req, res) => {
    try {
      const {name,price,desc,category} = req.body;
      const newProduct = new Product({name,price,desc,category,image: req.file.filename});
      await newProduct.save();
      res.json({ message: 'Product Added Successfully!'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Get all Products
  const getProducts= async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Get Prouducts with category
  const getCertainProducts = async(req,res)=>{
    try{
      const {category } = req.body;
      const products = await Product.find({category});
      res.json(products);
    }catch(error){
      res.status(500).json({error:error.message})
    }
  }

  //Get product with id
  const getProductWithId = async(req,res)=>{
    try{
      const {id} = req.params;
      if (!id && req.body && req.body.id) {
        id = req.body.id;
      }
      const product = await Product.findById(id);
      return res.json({...product,success:true});
    }catch(error){
      res.status(500).json({error:error.message})
    }
  }

  //update a product using id
  const updateProduct= async (req, res) => {
    try {
      const { id } = req.params;
      const {name,desc} = req.body;
      let updatedFields =  {name,desc};
      if(req.file){
        updatedFields.image=req.file.filename;
      }
      await Product.findByIdAndUpdate(id, updatedFields, { new: true });
      res.json({ message: 'Product Updated Successfully!'});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //delete a product using id
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

module.exports = {createProduct,getProducts,getProductWithId,getCertainProducts,updateProduct,deleteProduct};
