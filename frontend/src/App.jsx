import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Product from './Pages/product/Product';
import AllProduct from './Pages/allProduct/ProductList';
import Nav from './Components/Dashboard/Nav/Nav'
import Dashboard from './Components/Dashboard/Dashboard';
import Edit from './Pages/editProduct/Edit';
import Products from './Pages/Products/Products';
import ProductDetail from './Components/ProductDetail/ProductDetail'
import Login from './Components/Login/Login';
import Cart from './Components/Cart/Cart';
import NotFound from './Components/NotFound/NotFound';
import Checkout from './Pages/checkout/Checkout';

const App = () => {
  const isDashboardRoute = window.location.pathname.startsWith('/admin');
  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/admin/*'
          element={
            <>
              <div className='mainDashboard'>
                <Nav className='dashboard' />
                <Routes className='dashboard-links'>
                  <Route path='dashboard' element={<Dashboard/>}/>
                  <Route path='addProduct' element={<Product type='Add' />} />
                  <Route path='showProduct' element={<AllProduct />} />
                  <Route path='editProduct/:id' element={<Edit/>}/>
                </Routes>
              </div>
            </>
          }
        />
        <Route path='/men' element={<Products category='Men'/>}/>
        <Route path='/men/:id' element={<ProductDetail/>}/>
        <Route path='/women' element={<Products category='Women'/>}/>
        <Route path='/women/:id' element={<ProductDetail/>}/>
        <Route path='/kid' element={<Products category='Kid'/>}/>
        <Route path='/kid/:id' element={<ProductDetail/>}/>

        <Route path='/login' element={<Login type='login'/>}/>
        <Route path='/register' element={<Login type='register'/>}/>

        <Route path='/cart' element={<Cart />}/>
        <Route path='/cart/checkout' element={<Checkout/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {!isDashboardRoute && <Footer />}
    </>
  );
};

export default App;
