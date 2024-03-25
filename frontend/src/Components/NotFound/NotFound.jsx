import React from 'react'
import './notfound.scss'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='notfound'>
        <div className="container">
            <div className="notFoundContents">
                <h1>Oops!</h1>
                <h4>404-PAGE NOT FOUND</h4>
                <p>The page you are looking for might have been removed had it's name<br/>changed or is temporarily unavailable.</p>
                <NavLink to='/'>GO TO HOMEPAGE</NavLink>
            </div>
        </div>
    </div>
  )
}

export default NotFound