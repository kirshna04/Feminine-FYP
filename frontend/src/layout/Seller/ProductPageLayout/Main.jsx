import React, { useState } from 'react'
import Dashboard from '../../../components/Dashboard/Dashboard'
import ProductPageLayout from './ProductPageLayout'

const Main = () => {
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)

    return (
        <div>
            <Dashboard showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar} component={<ProductPageLayout showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar}/>} />
        </div>
    )
}

export default Main
