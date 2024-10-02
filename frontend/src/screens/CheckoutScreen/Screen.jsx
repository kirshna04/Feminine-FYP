import React from 'react'
import Checkout from '../../layout/Customer/Checkout/Checkout'
import Navbar from '../../components/navbar/Navbar'
import Links from '../../layout/Customer/Home/Links'
const Screen = () => {
    return (
        <div>
            <Navbar />
            <Links />
            <Checkout/>
        </div>
    )
}

export default Screen
