import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Links from './Links'
import Slider from '../../../components/slider/Slider'
import Listing from './Listing'
import Banner from '../../../components/banner/Banner'
const Main = () => {

  return (
    <div>
      <Navbar />
      <Links />
      <Slider />
      <Banner/>
      <Listing />
    </div>
  )
}

export default Main