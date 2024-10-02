import React, { useState } from 'react'
import Dashboard from '../../../components/Dashboard/Dashboard'
import ProfileLayout from './ProfileLayout'

const Main = () => {
    const [showLeftSideBar, setshowLeftSideBar] = useState(false)

    return (
        <div>
            <Dashboard showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar} component={<ProfileLayout showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar}/>} />
        </div>
    )
}

export default Main