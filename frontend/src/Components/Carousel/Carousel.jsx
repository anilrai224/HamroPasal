import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import './Carousel.scss'; 
import Hero1 from '../../Assets/hero1.jpg'
import Hero2 from '../../Assets/hero2.jpg'
import Hero3 from '../../Assets/hero3.jpg'

const images = [
  {
    src: Hero1,
    title:'NEW COLLECTION',
    smallText:'FASHION',
    bigText:'SUNGLASSES',
    desc:'Best eyeglasses for women to channel your inner Clark Kent',
  },
  {
    src: Hero2,
    title:'NEW COLLECTION',
    smallText:'THE HOTLIST OF',
    bigText:'SUMMER',
    desc:'The 12 Biggest Spring /Summer 2023',
  },
  {
    src: Hero3,
    title:'NEW COLLECTION',
    smallText:'FIND YOUR',
    bigText:'PERFECT',
    desc:'Uncompromising in style, quality and perfomance',
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  rtl:true,
};

const Carousel = () => {
    const variants={
        initial:{
            y:-100,
            opacity:0,
        },
        animate:{
            y:0,
            opacity:1,
            transition:{
                staggerChildren:0.2,
                duration:1,
            }
        }
    }
  return (
    <Slider {...settings} className='slider'>
        {images.map((image,index)=>(
            <motion.div key={index} className="carousel-slide" >
            <img src={image.src} alt={`Slide`} />
            <motion.div className="info" variants={variants} initial='initial' whileInView='animate'>
              <motion.span variants={variants}>{image.title}</motion.span>
              <motion.h2 variants={variants}>{image.smallText}</motion.h2>
              <motion.h1 variants={variants}>{image.bigText}</motion.h1>
              <p>{image.desc}</p>
              <button>SHOP THE COLLECTION</button>
            </motion.div>
          </motion.div>
        ))}
    </Slider>
  );
};


export default Carousel;
