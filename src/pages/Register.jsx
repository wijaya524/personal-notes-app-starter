import React, { useState } from 'react';
import { register } from '../utils/network-data';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        const data = { name, email, password };
        const result = await register(data);
        console.log(result);
        navigate("/login");

        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className=" flex items-center justify-center p-4">
            <div className="w-full max-w-md  p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center ">Form Register</h1>
                <form onSubmit={registerHandler} className="space-y-4">
                    <div>
                        <label className="block  mb-1" htmlFor="name">Nama</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Masukkan nama"
                            className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email"
                            className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block  mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
