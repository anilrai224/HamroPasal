import React from 'react'
import './Dashboard.scss'
import SearchBar from './SearchBar/SearchBar'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <SearchBar/>
        <div className="dashboardContent">
          <div className="info">
            <p>Total Products</p>
            <span>12</span>
          </div>
          <div className="info">
            <p>Total Customer</p>
            <span>12</span>
          </div>
          <div className="info">
            <p>Total Revenue</p>
            <span>Rs.500000</span>
          </div>
        </div>
    </div>
  )
}

export default Dashboard