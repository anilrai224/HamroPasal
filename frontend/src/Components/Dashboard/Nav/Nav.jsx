import { useState } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoPersonOutline, IoMailOutline, IoStatsChartSharp } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
import { BsFillDatabaseFill } from "react-icons/bs";
import { FaCaretDown,FaCaretUp,FaCartShopping} from "react-icons/fa6";

const Nav = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const toggleCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  return (
    <div className={`nav ${isCatalogOpen ? 'catalog-open' : ''}`}>
      <h1>Hamro Pasal</h1>
      <div className="links">
        <p>
          <AiOutlineDashboard className='icon' />
          <NavLink to='/admin/dashboard' className='link'>Dashboard</NavLink>
        </p>
        <p className="catalog-link" onClick={toggleCatalog}>
            <BsFillDatabaseFill className='icon' />
          Catalog
          {isCatalogOpen ? <FaCaretDown /> : <FaCaretUp />}
        </p>
        <div className={`catalog-links ${isCatalogOpen ? 'open' : ''}`}>
          <NavLink to='/admin/addProduct' className='link'>Add Product</NavLink>
          <NavLink to='/admin/showProduct' className='link'>Show Product</NavLink>
        </div>
        <p>
          <FaCartShopping className='icon' />
          Orders
        </p>
        <p>
          <IoPersonOutline className='icon' />
          Customers
        </p>
        <p>
          <IoMailOutline className='icon' />
          Inbox
        </p>
        <p>
          <IoStatsChartSharp className='icon' />
          Analytics
        </p>
        <p>
          <IoMdSettings className='icon' />
          Setting
        </p>
      </div>
    </div>
  );
};

export default Nav;
