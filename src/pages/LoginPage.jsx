import React from 'react'
import { login } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const loginHandler = (e) => {
        e.preventDefault()
          const data = {
            email: email,
            password: password
          }
        
          login(data);
          navigate("/")
          console.log(login(data))

      
          setEmail("");
          setPassword("");


    }
    

    return (
        <div>LoginPage
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
        </div>
    )
}

export default LoginPage