import React from 'react'
import './AllProduct.scss'
import all_proudct from '../../Assets/all_product'
import Item from '../Item/Item'

const AllProduct = () => {
  return (
    <div className='allProduct'>
        <div className="container">
            <h1>ALL PRODUCTS</h1>
            <div className="allProudctItems">
                {all_proudct.map((item)=>{
                    if(item.category === 'men' ){
                        return <Item key={item.id} item={item}/>
                    }
                    return null;
                })}
            </div>
        </div>
    </div>
  )
}

export default AllProduct