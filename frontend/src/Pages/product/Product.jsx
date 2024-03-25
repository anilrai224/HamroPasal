import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Product.scss';

const AddProduct = ({type}) => {
  const [productName, setProductName] = useState('');
  const [price,setPrice] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [category, setCategory] = useState('');
  const [productImage, setProductImage] = useState(null);

  //for Updating Product
  const [tempProduct,setTempProduct] = useState({});

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
  };

  const authToken = localStorage.getItem('auth-token');
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price',price);
    formData.append('desc', productDesc);
    formData.append('category', category);
    formData.append('image', productImage);

    try {
      const response = await axios.post('http://localhost:5000/product/create', formData, {
        headers: {
          Authorization:`Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
      toast.success(`${response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setProductName('');
      setPrice('');
      setProductDesc('');
      setCategory('');
      setProductImage(null);
      navigate('/admin/showProduct')
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
    useEffect(()=>{
      if(type === 'Update'){
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split('/');
        const id = urlParts[urlParts.length - 1];
        const fetchToUpdateProduct = async()=>{
          console.log('update')
          axios.get(`http://localhost:5000/product/getAProduct/${id}`)
          .then(res=>{
            setTempProduct(res.data._doc);
          })
        }
        fetchToUpdateProduct();
      }
    },[])
  const handleUpdate=async()=>{
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('price',price);
    formData.append('desc', productDesc);
    formData.append('image',productImage);
    
    /*Update Product*/
    try{
      const response = await axios.put(`http://localhost:5000/product/products/${tempProduct._id}`,formData);
      toast.success(`${response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        navigate('/admin/showProduct')
    }catch(error){
      console.log('Error Updating Product',error);
    }
  }
  return (
    <div className="add-product-container">
      {type === 'Add' ? <h2>Add Product</h2>:<h2>Update Product</h2>}
      <input
        type="text"
        placeholder={type==='Add' ? "Product Name" : tempProduct.name}
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="text"
        placeholder={type === 'Add' ? "Product Price" : tempProduct.price}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder={type==='Add'?"Product Description":tempProduct.desc}
        value={productDesc}
        onChange={(e) => setProductDesc(e.target.value)}
      />
      {type === 'Add' &&
        <select name="cateogry" id="category" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="" disabled>Select Category</option>
          <option value="Men">Mens</option>
          <option value="Women">Womens</option>
          <option value="Kid">Kids</option>
        </select>
      }
      <input type="file" onChange={handleImageChange} />
      <button className='btn' onClick={type==='Add'?handleAddProduct:handleUpdate}>{type === 'Add' ? 'Add Product' :'Update Product' }</button>
      <ToastContainer/>
    </div>
  );
};

export default AddProduct;
