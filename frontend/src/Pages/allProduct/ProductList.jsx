import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductList.scss';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  
  const authToken = localStorage.getItem('auth-token');
  const fetchProducts =async () => {
    try {
      const response = await axios.get('http://localhost:5000/product/showProducts',{
        headers:{
          Authorization:`Bearer ${authToken}`
        }
      });
      if(response.data.success===false){
        navigate('/login')
      }
      setProducts(response.data);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = useCallback(async(id)=>{
    try{
      const response = await axios.delete(`http://localhost:5000/product/products/${id}`,{
        headers:{
          Authorization:`Bearer ${authToken}`
        }
      });

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
        fetchProducts();
    }catch(error){
      console.log('Error Deleting Product',error);
    }
  },[]);
  
  useEffect(() => {
    fetchProducts();
  }, [deleteProduct]);

  const EditProduct = (id)=>{
    navigate(`/admin/editProduct/${id}`);
  }
  if(!products){
    return <p>Loading...</p>
  }
  return (
    <div className="container1">
      <h2>Product List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="imgContainer">
                  <img
                    src={`http://localhost:5000/images/${product.image}`}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
              </td>
              <td>
                <div className="product-info">
                  {product.name}
                </div>
              </td>
              <td>
                <div className="product-info">
                   {product.desc}
                </div>
              </td>
              <td>
                <div className="product-info">
                   {product.category}
                </div>
              </td>
              <td>
                <div className="product-info">
                  Rs. {product.price}
                </div>
              </td>
              <td className='actions'>
                <button onClick={e=>deleteProduct(product._id)}>Delete</button>
                <button onClick={e=>EditProduct(product._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default ProductList;
