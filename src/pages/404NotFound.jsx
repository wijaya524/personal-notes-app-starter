import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div>404NotFound
            <button>
                <Link to={"/"}> Kembali ke Halaman Utama</Link>
            </button>
        </div>

    )
}

export default NotFoundPage