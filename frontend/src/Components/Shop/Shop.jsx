import React from 'react'
import all_proudct from '../../Assets/all_product'
import './Shop.scss'
import { NavLink } from 'react-router-dom'

const Shop = () => {
  return (
    <div className='shop'>
        <h1>shop the looks</h1>
        <p>Our latest endeavour features designs from around the world with materials so<br/> comfortable you won't want to wear anything else every again.</p>
        <div className="container">
          <div className="shopItem">
          {all_proudct.map((item,index)=>{
            if(index > 7 && index <16){
              return (
                <div className='imgContainer' key={index}>
                  <img src={item.image} alt={`Product${index}`} />
                  <NavLink to ='/products' className='btn'>shop now</NavLink>
                </div>
              )
            }
            return null;
          })}
          </div>
        </div>
    </div>
  )
}

export default Shop