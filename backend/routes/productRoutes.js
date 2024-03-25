const express = require('express');
const multer = require('multer');
const {createProduct,getProducts,getProductWithId,updateProduct,deleteProduct, getCertainProducts} = require('../controllers/productController');
const validateUser = require('../middleware/authToken');
const router = express.Router();

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/images/');
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+'-'+file.originalname);
  }
})
const upload = multer({storage : storage});

/*admin side*/
router.post('/create',upload.single('image'),validateUser, createProduct);
router.get('/showProducts',validateUser, getProducts);
router.get('/getAProduct/:id',getProductWithId);
router.post('/getProductsWithCategory',getCertainProducts);
router.put('/products/:id',upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;
