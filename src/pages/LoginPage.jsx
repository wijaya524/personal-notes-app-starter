import React, { useState } from 'react';
import { login, putAccessToken } from '../utils/network-data';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLogged }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();
        const { error, data } = await login({ email, password });

        if (!error) {
            putAccessToken(data.accessToken);
            if (data) setIsLogged(true);
            navigate("/");
        } else {
            console.log("Ada yang salah dengan password/email");
        }

        setEmail("");
        setPassword("");
    };

    return (
        <div className=" flex items-center justify-center  p-4 ">
            <div className="w-full max-w-md p-8 rounded-lg shadow-md ">
                <h1 className="text-2xl font-bold mb-6 text-center  text-slate-900 dark:text-slate-50">Login Page</h1>
                <form onSubmit={loginHandler} className="space-y-4">
                    <div>
                        <label className="block  mb-1 text-slate-900 dark:text-slate-50" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Masukkan email"
                        />
                    </div>
                    <div>
                        <label className="block  mb-1 text-slate-900 dark:text-slate-50" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Masukkan password"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-slate-50 dark:text-slate-900 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-slate-900 dark:text-slate-50">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
