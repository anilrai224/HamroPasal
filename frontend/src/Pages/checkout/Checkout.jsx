import React, { useContext, useEffect, useState } from 'react'
import './Checkout.scss'
import Esewa from '../../Assets/paymentImages/esewa.png'
import Khalti from '../../Assets/paymentImages/khalti.jpg'
import Cod from '../../Assets/paymentImages/cod.jpg'
import logo from '../../Assets/logo.png'
import { ShopContext } from '../../Context/ShopContext'
import { EsewaPayment } from '@bisham/payment-package';
import axios from 'axios'

const Checkout = () => {
    const { totalAmount, cartItems } = useContext(ShopContext);
    const handlePayment = (e) => {
        e.preventDefault();
        try {
            const esewaPayment = new EsewaPayment();
            const uniqueId = Math.random()
            // const finalAmount = totalAmount+((13/100)*totalAmount);
            esewaPayment.initiate({
                amount: totalAmount,
                processId: `${uniqueId}`,
                deliveryCharge: 20,
                serviceCharge: 20,
                taxAmount: 20,
                totalAmount: totalAmount + 60,
                successRedirectUrl:
                    'http://localhost:3000',
                failureRedirectUrl:
                    'http://localhost:3000',
            })
        } catch (error) {
            console.log('Error Initiating Esewa Payment', error);
        }
    }
    return (
        <div className='checkout'>
            <div className="container">
                <div className="checkoutContents">
                    <div className="billingAddress">
                        <div className="billFormat">
                            <div className="billDetail">
                                <div className="imgContainer">
                                    <img src={logo} alt="logo" />
                                </div>
                                <div className="address">
                                    <p>HamroPasal<br />Balkhu,Kumari Club<br />9816737889<br />info@hamropasal.com</p>
                                </div>
                                <span className='date'>Date:2080/12/08</span>
                            </div>
                            <table border='1'>
                                <tr>
                                    <td>S.N</td>
                                    <td>Item Name</td>
                                    <td>qty</td>
                                    <td>price</td>
                                    <td>Total</td>
                                </tr>
                                {cartItems.map((item, index) => (
                                    <SinlgeItem key={index} item={item} index={index + 1} />
                                ))}
                            </table>
                            <div className="totals">
                                <p>Sub total:   {totalAmount}</p>
                                <p>Vat(13%):   {(13/100)*totalAmount}</p>
                                <p>Total:   {totalAmount+((13/100)*totalAmount)}</p>
                            </div>
                        </div>
                        <div className="paymentOptions">
                            <h2>Payment</h2>
                            <span>All transactions are secure and encrypted.</span>
                            <form>
                                <label htmlFor="esewa">
                                    <input type="radio" name="paymentMethod" id="esewa" />
                                    <img src={Esewa} alt="esewa" />
                                </label>
                                <label htmlFor="khalti">
                                    <input type="radio" name="paymentMethod" id="khalti" />
                                    <img src={Khalti} alt="Khalti" />
                                </label>
                                {/* <label htmlFor="cod">
                                    <input type="radio" name="paymentMethod" id="cod" />
                                    <img src={Cod} alt="Cash on Delivery" />
                                </label> */}
                                <button type="submit" style={{ cursor: 'pointer' }} onClick={handlePayment}>Pay Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
const SinlgeItem = ({ item, index }) => {
    console.log(item)
    const authToken = localStorage.getItem('auth-token')
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/product/getAProduct/${item.productId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setProduct(response.data._doc)
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, []);
    if (!product) {
        return <p>Loading...</p>
    }
    return (
        <tr style={{ border:'1px solid black' }}>
            <td>{index}</td>
            <td>{product.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.price * item.quantity}</td>
        </tr>
    )
}