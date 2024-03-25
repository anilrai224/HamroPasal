import React, { useContext, useEffect, useState } from 'react';
import './Cart.scss';
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import {useNavigate,NavLink} from 'react-router-dom'
import { ImCross } from "react-icons/im";

const Cart = () => {
  const { login,cartItems, totalAmount,setTotalAmount } = useContext(ShopContext);
  const navigate = useNavigate();
  useEffect(() => {
    if(login){
      if(cartItems){
        let total=0;
        cartItems.map((item)=>(
          total+=(item.price*item.quantity)
        ))
        setTotalAmount(total)
      }
    }
  },[cartItems,setTotalAmount,login])
  const handleClick = (e)=>{
    navigate(`/${e.target.value}`);
  }
  const hanldeCheckOut=(e)=>{
    e.preventDefault();
    navigate('/cart/checkout')
  }
  const handleContinueShopping=(e)=>{
    e.preventDefault();
    navigate('/')
  }
  return (
    <div className='cart'>
      <div className="container">
        {login === true ? <div className="cartDetails">
          {cartItems?.length>0 ?<div className="cartProducts">
            <div className="title" style={{ textAlign:'center' }}>
              <p className='product'>product</p>
              <p className='price'>price</p>
              <p className='qty'>qty</p>
              <p className='total'>total</p>
              <p className="remove">Actions</p>
            </div>
            <div className="cartItem">
              {cartItems.map((item) => (
                <SingleProduct key={item.productId} item={item} quantity={item.quantity}/>
              ))}
            </div>
            <div className="options">
              <button style={{cursor:'pointer'}} onClick={hanldeCheckOut}>proceed to checkout</button>
              <button style={{cursor:'pointer'}} onClick={handleContinueShopping}>continue shopping</button>
            </div>
          </div>
          :
          <div className='emptyCart' style={{width:'100%',alignItems:'center',display:'flex',flexDirection:'column',gap:'10px'}}>
            <p>Cart is Empty!</p>
            <div className="btnsShop" style={{display:'flex',gap:'10px'}}>
              <button onClick={handleClick} value='men'>FOR HIM</button>
              <button onClick={handleClick} value='women'>FOR HER</button>
              <button onClick={handleClick} value='kids'>FOR KIDS</button>
            </div>
          </div>}
          {cartItems.length!== 0 ?<div className="cartTotal">
            <h3>{`There ${Object.keys(cartItems).length === 1 ? 'is 1 item' : `are ${Object.keys(cartItems).length} items`} in your cart`}</h3>
            <div className="details">
              <h2>
                <p>TOTAL:</p>
                <p>{`Rs.${totalAmount}`}</p>
              </h2>
              <h2>
                <p>SHIPPING:</p>
                <p style={{ fontSize: '13px' }}>Shipping & taxes calculated at checkout</p>
              </h2>
            </div>
          </div>:""}
        </div>
        :
        <div className="cartDetails" style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
          <h1>Please Login to Continue</h1>
          <NavLink style={{ textDecoration:'none',background:'#ebe8e2',padding:'10px 20px',borderRadius:'40px',color:'black',cursor:'pointer',width:'max-content' }} to='/login'>Login</NavLink>
        </div>
        }
      </div>
    </div>
  );
};

const SingleProduct = ({ item,quantity }) => {
  const authToken = localStorage.getItem('auth-token')
  const [product, setProduct] = useState(null);

  const {removeFromCart} = useContext(ShopContext)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/getAProduct/${item.productId}`,{
          headers:{
            Authorization:`Bearer ${authToken}`
          }
        });
        setProduct(response.data._doc)
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [item]);

  if (!product) {
    return <p>Loading...</p>
  }
  return (
    <div className="cartItems" key={item.productId} style={{ textAlign:'left' }}>
      <div className="imgDetails">
        <img src={`http://localhost:5000/images/${product?.image}`} alt="Product Image" />
        <p>{product?.name}</p>
      </div>
      <div className="price">{`Rs.${product?.price}`}</div>
      <div className="qty">{quantity}</div>
      <div className="total">{`Rs.${product ? (product.price * quantity) : 0}`}</div>
      <button style={{ cursor:'pointer',background:'transparent',border:'none',paddingRight:'30px' }} onClick={()=>removeFromCart(item.productId)}><ImCross /></button>
    </div>
  );
};

export default Cart;
