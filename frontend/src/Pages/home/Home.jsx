import React from 'react'
import Popular from '../../Components/Collections/Popular'
import Carousel from '../../Components/Carousel/Carousel'
import Video from '../../Components/Video/Video'
import Featured from '../../Components/Featured/Featured'
import Shop from '../../Components/Shop/Shop'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <Popular/>
      <Video/>
      <Featured/>
      <Shop/>
    </div>
  )
}

export default Home