import React, { useState } from 'react'
import Dashboard from './Dashboard'
import HomePage from './Home/Home'

const DashboardLayout = () => {
  const [showLeftSideBar, setshowLeftSideBar] = useState(false)
  return (
    <div>
      <Dashboard showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar} component={<HomePage showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar}/>}/>
    </div>
  )
}

export default DashboardLayout

