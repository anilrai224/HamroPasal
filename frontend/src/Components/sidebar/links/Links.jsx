import React from 'react'
import { motion } from 'framer-motion'

const Links = () => {
  const variants = {
    open: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection:1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection:-1,
      }
    }
  }
  const textVariants = {
    open: {
      x: 0,
      opactiy: 1,
      transition: {
        duration: 0.5,
      }
    },
    closed: {
      x: 100,
      opactiy: 0,
      transition: {
        duration: 0.5,
      }
    }
  }
  return (
    <motion.div className='links' variants={variants}>
        <motion.a variants={textVariants} id='link' >Home</motion.a>
        <motion.a variants={textVariants} id='link' >Mens</motion.a>
        <motion.a variants={textVariants} id='link' >Womens</motion.a>
        <motion.a variants={textVariants} id='link' >Kids</motion.a>
    </motion.div>
  )
}

export default Links