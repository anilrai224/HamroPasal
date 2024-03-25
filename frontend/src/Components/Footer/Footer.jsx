import React from 'react'
import './Footer.scss'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="container">
            <div className="time">
                <h2>Hamro Pasal</h2>
                <p>We're available by phone +977 98167373737<br/>info@example.com<br/>Sunday till Friday 10 to 6</p>
            </div>
            <div className="about">
                <h2>About Us</h2>
                <div className="links">
                    <NavLink className='link'>About Us</NavLink>
                    <NavLink className='link'>Contact Us</NavLink>
                    <NavLink className='link'>Help and Advice</NavLink>
                    <NavLink className='link'>Shipping & Returns</NavLink>
                    <NavLink className='link'>Terms & Conditions</NavLink>
                    <NavLink className='link'>Refund Policy</NavLink>
                </div>
            </div>
            <div className="shop">
                <h2>our shop</h2>
                <div className="links">
                    <NavLink className='link'>New Arrivals</NavLink>
                    <NavLink className='link'>Top Trending</NavLink>
                    <NavLink className='link'>Collection</NavLink>
                    <NavLink className='link'>Men Collection</NavLink>
                    <NavLink className='link'>Women Collection</NavLink>
                    <NavLink className='link'>Kids Collection</NavLink>
                </div>
            </div>
            <div className="newsletter">
                <h2>news letter</h2>
                <p>Receive our weekly newsletter.
                    For dietary content, fashion insider and
                    the best offers.
                </p>
                <div className="input">
                    <input type="email" placeholder='Email address'/>
                    <button>Join</button>
                </div>
            </div>
        </div>
        <div className='line'></div>
        <div className="sContainer">
            <div className="left">
                Copyright © 2023 <a target='_blank' rel='noreferrer' href="https://www.github.com/anilrai224">Anil Rai</a>. All rights reserved.
            </div>
            <div className="right">
                <p>Privacy Policy</p>
                <p>Terms of Use</p>
                <p>FAQs</p>
            </div>
        </div>
    </div>
  )
}

export default Footer;