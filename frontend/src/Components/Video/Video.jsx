import React from 'react';
import './Video.scss';
import { NavLink } from 'react-router-dom';

const Video = () => {
  return (
    <div className='video'>
      <video playsInline autoPlay loop muted style={{ width: '100%', maxWidth: '100%', height: '100' }} __idm_id__="12869633">
        <source src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/video.mp4?v=1614659458" type="video/mp4" />
      </video>
      <div className="action">
        <span>NEW ARRIVALS</span>
        <h1>Autum is Comming</h1>
        <p>The 11 Biggest Autumn/Winter 2024 Trends</p>
        <div className="line"></div>
        <span>BY HAMROPASAL</span>
        <NavLink to='/comming' className='btn'>VIEW MORE
        </NavLink>
      </div>
    </div>
  );
};

export default Video;
