import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router'
import Navbar from './Navbar'


export default function DefaultLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
