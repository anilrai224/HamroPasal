import React, { useState } from 'react'
import './Login.scss'
import { MdEmail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { IoLockOpenOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = ({type}) => {
    const navigate = useNavigate();
    const [userInput,setUserInput] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:''
    })
    const handleChange = (e)=>{
        setUserInput({...userInput,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(type==='login'){
            try {
                const email=userInput.email;
                const password=userInput.password;
                axios.post('http://localhost:5000/api/user/login',{email,password})
                .then(res=>{   
                    if(res.data.msg === 'Invalid Credentails'){
                        toast.error('Invalid Credentials!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }else{
                        toast.success('You are Logged In Successfully!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        localStorage.setItem('auth-token',res.data.token);
                        navigate('/');
                        window.location.reload(false);
                    }
                })
                .catch(error=>console.log(error))
            } catch (error) {
                console.log(error);
            }
        }else{
            try {
                axios.post('http://localhost:5000/api/user/register',userInput)
                .then(res=>{
                    if(res.data.msg === 'User Already Exists'){
                        toast.error('User already Exists!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }else{
                        toast.success('User Registered Successfully!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        navigate('/login');
                    }
                })
                .catch(err=>console.log(err))
            } catch (error) {
                console.log(error)
            }  
        }
    }
  return (
    <div className='login'>
        {type==='login' ? <h2>sign in</h2> :<h2>create an account</h2>}
        <hr />
        {type==='login' && <p className='insert'>Insert your account information:</p>}
        <form onSubmit={handleSubmit}>
            {type!=='login' && <label htmlFor="fistname">
                <div className="icon">
                    <FaRegUser />
                </div>
                <input required onChange={handleChange} placeholder='First Name' type="text" name="firstname" id="firstname" />
            </label>}
            {type!=='login' && <label htmlFor="lastname">
                <div className="icon">
                    <FaRegUser />
                </div>
                <input required onChange={handleChange} placeholder='Last Name' type="text" name="lastname" id="lastname" />
            </label>}
            <label htmlFor="email">
                <div className="icon">
                <TfiEmail/>
                </div>
                <input required onChange={handleChange} placeholder='Email' type="email" name="email" id="email" />
            </label>
            <label htmlFor="password">
                <div className="icon">
                    <IoLockOpenOutline />
                </div>
                <input required onChange={handleChange} placeholder='Password' type="password" name="password" id="password" />
            </label>
            {type==='login' && <div className="forgotPassword">
                <MdEmail />
                <p>Forgot your <span>Password?</span></p>
            </div>}
            {type==='login'?<p>If you don't have an account, please<NavLink to='/register'> Register Here</NavLink></p>:<p>If you have an account, please <span>Login Here</span></p>}
            <button className='btn' type='submit'>{type==='login'?'Login':'Register'}</button>
        </form>
        <ToastContainer style={{zIndex:9999999}} />
    </div>
  )
}

export default Login