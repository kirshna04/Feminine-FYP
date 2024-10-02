import React, { useState } from 'react'
import Dashboard from '../Dashboard'
import BlogPage from './Blog'

const DashboardLayout = () => {
  const [showLeftSideBar, setshowLeftSideBar] = useState(false)
  return (
    <div>
      <Dashboard showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar} component={<BlogPage showLeftSideBar={showLeftSideBar} setshowLeftSideBar={setshowLeftSideBar}/>}/>
    </div>
  )
}

export default DashboardLayout

