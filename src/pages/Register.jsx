import React, { useState } from 'react'
import { register } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const registerHandler = async (e) => {
        e.preventDefault()
          const data = {
            name: name,
            email: email,
            password: password
          }
        
          const result = await register(data);
          console.log(result)
          navigate("/login")

          setName("");
          setEmail("");
          setPassword("");
    }
    
  

    return (
        <div className='input-register'>
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
            <Link to={"/login"}>
                Sudah punya akun?
            </Link>
        </div>
    )
}

export default Register