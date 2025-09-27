import React from 'react'
import { login, putAccessToken } from '../utils/network-data';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = ({ setIsLogged }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const loginHandler = async (e) => {
        e.preventDefault()
        const { error, data } = await login({ email, password });

        if (!error) {
            putAccessToken(data.accessToken)

            if (data) {
                setIsLogged(true)
            }
            navigate("/")
        } else {
            console.log("Ada yang salah dengan password/email")
        }

        setEmail("");
        setPassword("");


    }


    return (
        <div className='input-login'>
            <p>Login Page</p>
            <form onSubmit={loginHandler}>
                <section>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </section>
                <section>
                    <label htmlFor="">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </section>
                <section>
                    <button type='submit'>Kirim</button>
                </section>
            </form>
            <Link to={"/register"}>Belum Punya Akun?</Link>
        </div>
    )
}

export default LoginPage