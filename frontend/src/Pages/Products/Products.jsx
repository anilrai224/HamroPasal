import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './Products.scss';
import { ShopContext } from '../../Context/ShopContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = (props) => {
    const { addToCart } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const category = props.category;
        const fetchProducts = async () => {
            try {
                const response = await axios.post('http://localhost:5000/product/getProductsWithCategory', { category });
                setProducts(response.data);
                const initialQuantities = response.data.reduce((acc, curr) => {
                    acc[curr._id] = 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [props.category]);
    const handleQuantity = (productId, operation) => {
        setQuantities(prevQuantities => {
            const newQuantities = { ...prevQuantities };
            if (operation === 'increase') {
                newQuantities[productId] = (newQuantities[productId] || 0) + 1;
            } else if (operation === 'decrease') {
                if(prevQuantities[productId] > 1)
                newQuantities[productId] = (newQuantities[productId] || 0) - 1;
            }
            return newQuantities;
        });
        
    };

    return (
        <div className='products'>
            <div className="container">
                <div className="productItems">
                    {products.length>0 ? products.map((item, index) => {
                        return (
                            <div className="productDetails" key={index}>
                                <NavLink to={`/${props.category.toLowerCase()}/${item._id}`} className="imgContainer">
                                    <img src={`http://localhost:5000/images/${item.image}`} alt="Image" />
                                </NavLink>
                                <p>{item.name}</p>
                                <span>Rs. {item.price}</span>
                                <div className="toCart">
                                    <div className="qty">
                                        <button className='addqty' onClick={() => handleQuantity(item._id, 'increase')}>+</button>
                                        <input type="number" value={quantities[item._id]} readOnly />
                                        <button className='removeqty' onClick={() => handleQuantity(item._id, 'decrease')}>-</button>
                                    </div>
                                    <button style={{ cursor: 'pointer' }} className='btn' onClick={() => addToCart(item._id, quantities[item._id], item.price)}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    }):
                        <div className='noProducts'>
                            <h1>No Products Found!!!</h1>
                        </div>
                    }
                </div>
            </div>
            <ToastContainer style={{ zIndex: 100000000 }} />
        </div>
    )
}

export default Products;
