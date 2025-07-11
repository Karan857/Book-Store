import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='header-container'>
            <div className="logo">
                <h1>Book Shop</h1>
            </div>

            <div className="navbar">
                <Link to="/" className="nav-item">หน้าหลัก</Link>
                <Link to="/" className="nav-item">รายการหนังสือ</Link>
                <Link to="/" className="nav-item">ข้อมูลของฉัน</Link>
            </div>
        </div>
    )
}
