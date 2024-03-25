import React, { useState } from 'react';
import './sidebar.scss';
import ToggleButton from './toggleButton/ToggleButton';
import Links from './links/Links';
import { motion } from 'framer-motion';

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const variants = {
    open: {
      clipPath: "circle(1200px at 50px 50px)",
      transition: {
        type: "spring",
        stiffness: 20,
      },
    },
    closed: {
      clipPath: "circle(30px at 50px 65px)",
      transition: {
        delay: 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <motion.div className='sidebar' animate={open ? "open" : "closed"}>
      <motion.div className="bg" variants={variants}>
        <Links />
      </motion.div>
      <ToggleButton className='toggleBtn' setOpen={setOpen} />
    </motion.div>
  );
};

export default SideBar;