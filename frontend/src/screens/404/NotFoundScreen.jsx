import React from 'react'
import NotFound from '../../layout/Common/NotFound'
import Navbar from '../../components/navbar/Navbar'
import Links from '../../layout/Customer/Home/Links'

const NotFoundScreen = () => {
  return (
    <div>
      <Navbar/>
      <Links/>
      <NotFound/>
    </div>
  )
}

export default NotFoundScreen