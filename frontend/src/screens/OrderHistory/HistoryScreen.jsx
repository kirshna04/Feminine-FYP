import React from 'react'
import OrderHistory from '../../layout/Customer/History/OrderHistory'
import Navbar from '../../components/navbar/Navbar'
import Links from '../../layout/Customer/Home/Links'
const HistoryScreen = () => {
  return (
    <div>
    <Navbar />
    <Links />
    <OrderHistory/>
</div>
  )
}

export default HistoryScreen
