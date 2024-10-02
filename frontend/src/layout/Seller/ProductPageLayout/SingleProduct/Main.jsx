import React, { useState } from 'react'
import Dashboard from '../../../../components/Dashboard/Dashboard'
import SingleProductLayout from './SingleProductLayout'

const Main = () => {
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)

    return (
        <div>
            <Dashboard showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar} component={<SingleProductLayout showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar}/>} />
        </div>
    )
}

export default Main