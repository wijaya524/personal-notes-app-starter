import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

const NotFoundPage = () => {
    return (
        <div className='flex items-center justify-center flex-col'>
            <img src="/public/not-found.png" alt="not-found" width={300} />
            <button className='flex items-center gap-2'>
                <FaArrowLeft />
                <Link to={"/"}> 
                Kembali ke Halaman Utama</Link>
            </button>
        </div>

    )
}

export default NotFoundPage