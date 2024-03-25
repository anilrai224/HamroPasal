import React from 'react'
import './Popular.scss'
// import Item from '../Item/Item'
// import all_product from '../../Assets/all_product'
import Male from '../../Assets/product_13.png'
import Female from '../../Assets/female.webp'
import Kid from '../../Assets/product_29.png'
import { NavLink } from 'react-router-dom'

const Popular = () => {
  return (
    <div className='popular'>
        <h1>Our Collections</h1>
        <p>Explore curated excellence with our best-sellers – a fusion of style and innovation,<br/> perfect for elevating your lifestyle at <span style={{fontWeight:'bold',color:'black'}}>Hamro Pasal</span>.</p>
        <div className="container">
          {/* <div className="popularItem">
              {all_product.map((item,index)=>{
                  if(index > 11 && index <16){
                    return <Item key={item.id} item={item} />
                  }
                  return null;
              })}
          </div> */}
          <div className="collections">
            <div className="femaleCollection">
              <div className="imgContainer">
                <img src={Female} alt="" />
              </div>
              <div className="about">
                <p>Female Collection</p>
                <NavLink to='/product' className='btn'>SHOP THE COLLECTION</NavLink>
              </div>
            </div>
            <div className="secondCollection">
              <div className="maleCollection">
                <div className="imgContainer">
                  <img src={Male} alt="" />
                </div>
                <div className="about">
                  <p>Female Collection</p>
                  <NavLink to='/product' className='btn'>SHOP THE COLLECTION</NavLink>
                </div>
              </div>
              <div className="kidCollection">
                <div className="imgContainer">
                  <img src={Kid} alt="" />
                </div>
                <div className="about">
                  <p>Female Collection</p>
                  <NavLink to='/product' className='btn'>SHOP THE COLLECTION</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Popular