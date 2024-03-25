import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    return [];
}

const ShopContextProvider = (props) => {
    const [login, setLogin] = useState(false);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [user, setUser] = useState();

    // Fetching user details
    const authToken = localStorage.getItem('auth-token');
    
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user/get-user-by-id', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    },
                })
                if (response.data.success) { 
                    setLogin(true);
                    setUser(response.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [])

    const addToCart = async(productId, qty, productPrice,name) => {
        if (!localStorage.getItem('auth-token')) {
            toast.error(`Please Login To Continue`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                window.location.replace('/login')
            }, 700);
        }else{
            toast.success(`Product Added to Cart`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            await axios.post('http://localhost:5000/api/cart/addToCart',{productId, qty, productPrice},{
                headers:{
                    'Authorization':`Bearer ${authToken}`
                }
            })
            .then(res=>{
                setCartItems(res.data.items)
            })
            .catch(err=>console.log(err))
        }
    };


    const removeFromCart = async(productId) => {
        toast.success(`Product Removed Successfully`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        await axios.post('http://localhost:5000/api/cart/removeFromCart',{productId},{
            headers:{
                'Authorization':`Bearer ${authToken}`
            }
        })
        .then(res=>{
            setCartItems(res.data)
        })
        .catch(err=>console.log(err))
    }
    const fetchCartItems = async()=>{
        const id = user?.data?._id;
        await axios.post('http://localhost:5000/api/cart/getCartItems',{id},{
            headers:{
                'Authorization':`Bearer ${authToken}`
            }
        })
        .then(res=>{
            if(!res.data.success){
                setCartItems('')
            }else{
                setCartItems(res.data.items);
            }
        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        fetchCartItems();
    },[user])

    const [totalAmount, setTotalAmount] = useState();
    const contextValue = { cartItems, addToCart, removeFromCart, user, setLogin, login, totalAmount, setTotalAmount };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
