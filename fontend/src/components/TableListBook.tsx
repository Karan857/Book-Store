import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { RippleButton } from "@/components/magicui/ripple-button";

export default function TableListBook() {
    const [data, setData] = React.useState([
        {
            id: 1,
            name: "Harry Potter",
            category: "Fantasy",
            status: "Available",
            pricePerDay: 50,
            stock: 10
        },
        {
            id: 2,
            name: "Lord of the Rings",
            category: "Adventure",
            status: "Unavailable",
            pricePerDay: 60,
            stock: 0
        },
        {
            id: 3,
            name: "The Hobbit",
            category: "Fantasy",
            status: "Available",
            pricePerDay: 40,
            stock: 5
        }
    ])
    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อหนังสือ</th>
                        <th>หมวดหมู้</th>
                        <th>สถานะ</th>
                        <th>ราคา / วัน</th>
                        <th>จำนวนคงเหลือ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) =>
                    (
                        <tr>
                            <td>{index}</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.status}</td>
                            <td>{item.pricePerDay}</td>
                            <td>{item.stock}</td>
                            <td className='flex' style={{ gap: "1rem" }}>
                                <div className="flex flex-wrap items-center gap-2 md:flex-row">
                                    <Button variant={'destructive'}>Button</Button>
                                </div>
                                <Link to={`book/:${item.id}`} className="btn" style={{ backgroundColor: "green", color: "white" }}>รายละเอียด</Link>
                                <div className="btn" style={{ backgroundColor: "orange", color: "white" }}>ยืมหนังสือ</div>
                            </td>
                        </tr>
                    )
                    )}

                </tbody>
            </table>
        </div>
    )
}
