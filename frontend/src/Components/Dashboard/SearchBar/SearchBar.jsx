import React from 'react'
import './SearchBar.scss'
import { IoIosSearch } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import profileImg from '../../../Assets/profile.png'

const SearchBar = () => {
  return (
    <div className='searchBar'>
        <div className="searchContainer">
            <IoIosSearch className='icon' />
          </div>
          <div className="accountContainer">
            <CiBellOn className='icon' />
            <div className="imgContainer">
              <img src={profileImg} alt="ProfileImage" />
            </div>
          </div>
    </div>
  )
}

export default SearchBar