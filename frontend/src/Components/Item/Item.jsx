import React from 'react'
import './Item.scss'

const Item = ({item}) => {
  return (
    <div className='item'>
        <div className="imgContainer">
            <img src={item.image} alt="" />
        </div>
        <p>{item.name}</p>
        <div className="itemPrices">
            <div className="newPrice">
                Rs.{item.old_price}
            </div>
            <div style={{fontWeight:'bold'}} className="oldPrice">
                Rs.{item.new_price}
            </div>
        </div>
    </div>
  )
}

export default Item