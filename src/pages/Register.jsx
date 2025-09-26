import React, { useState } from 'react'
import { register } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const registerHandler = (e) => {
        e.preventDefault()
          const data = {
            name: name,
            email: email,
            password: password
          }
        
          register(data);
          navigate("/login")
          console.log(register(data))

          setName("");
          setEmail("");
          setPassword("");
    }
    
  

    return (
        <div>
            <p>
               Form Register
            </p>
            <form onSubmit={registerHandler}>
                <section>
                    <label htmlFor="">Nama</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </section>
                <section>
                    <label htmlFor="">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
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

export default Register