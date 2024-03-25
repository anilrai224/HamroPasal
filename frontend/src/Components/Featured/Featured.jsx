import React from 'react'
import './Featured.scss'
import p14_img from '../../Assets/product_14.png'

const Featured = () => {
    const product = {
        id: 14,
        name: "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket",
        category: "Men",
        image: p14_img,
        new_price: 85.0,
        old_price: 120.5,
    }
  return (
    <div className='featured'>
        <h1>Featured product</h1>
        <div className="container">
            <div className="imgContainer">
                <img src={product.image} alt="PRODUCT_IMG" />
            </div>
            <div className="detailContainer">
                <span>{product.name}</span>
                <span>{product.category}</span>
                <div className="prices">
                    <div className="oldPrice">
                        Rs.{product.old_price}
                    </div>
                    <div className="newPrice">
                        Rs.{product.new_price}
                    </div>
                </div>
                <button>Add To Cart</button>
                <span>Steele's Lena Dress features a smocked bust, off the shoulder sleeves with eyelet design, and mini cut skirt with raw hem.</span>
                <ul>
                    <li>MACHINE WASH AT MAX.TEMP. 30° C - NORMAL PROCESS</li>
                    <li>DO NOT BLEACH</li>
                    <li>DO NOT TUMBLE DRY</li>
                    <li>IRON AT MAX. TEMP. OF 110° C WITHOUT STEAM</li>
                    <li>DO NOT DRY CLEAN</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Featured