import React, { useContext, useEffect, useState } from 'react'
import './ProductDetail.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../../Context/ShopContext'

const ProductDetail = () => {
  const {addToCart,removeFromCart} = useContext(ShopContext)
  const [product,setProduct] = useState();
  const [quantity,setQuantity] = useState(1);
  const handleQuantity = ()=>{
    setQuantity(prev=>prev+1);
  }
  const {id} = useParams();
  useEffect(()=>{
    const fetchProduct = async()=>{
      try {
        const response = await axios.get(`http://localhost:5000/product/getAProduct/${id}`);
        setProduct(response.data._doc);
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct();
  },[])
  if(!product){
    return <p>Loading..</p>
  }
  return (
    <div className='productDetail'>
      <div className="container">
        <div className="productDetails">
          <div className="imgContainer">
            <img src={`http://localhost:5000/images/${product.image}`} alt="ProductImage" />
          </div>
          <div className="productContents">
            <div className="name">
              <h2>{product.name}</h2>
              <span>By HamroPasal</span>
            </div>
            <h4>RS. {product.price}</h4>
            <p>{product.desc}</p>
            <div className="toCart">
              <div className="qty">
                  <button onClick={handleQuantity}>+</button>
                  <input type="number" value={quantity} readOnly />
                  <button onClick={()=>removeFromCart(id)}>-</button>
              </div>
              <button className='btn' onClick={()=>addToCart(id,quantity,product.price)}>Add To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail