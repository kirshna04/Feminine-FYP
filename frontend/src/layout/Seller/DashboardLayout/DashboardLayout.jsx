import React, { useState } from 'react'
import Dashboard from '../../../components/Dashboard/Dashboard'
import HomePage from '../HomePage/HomePage'

const DashboardLayout = () => {
  
  const [showLeftSideBar, setshowLeftSideBar] = useState(false)
  return (
    <div>
      <Dashboard showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar} component={<HomePage showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar}/>}/>
    </div>
  )
}

export default DashboardLayout
