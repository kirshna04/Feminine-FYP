import React from 'react'
import SingleBlog from '../../layout/Customer/Blog/SingleBlog'
import Navbar from '../../components/navbar/Navbar'
import Links from '../../layout/Customer/Home/Links'
const SingleBlogScreen = () => {
    return (
        <>
            <Navbar />
            <Links />
            <SingleBlog />
        </>
    )
}

export default SingleBlogScreen
