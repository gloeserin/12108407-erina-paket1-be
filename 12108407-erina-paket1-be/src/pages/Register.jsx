import React, { useEffect, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import loginLogo from '../images/login.jpeg'


export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alamat, setAlamat] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/register", {
                name: name,
                email: email,
                alamat:alamat,
                password: password,
            });
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
        }
    } 

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5">
                <div className='sm:w-1/2 px-12 mt-16'>
                    <h2 className='font-bold text-2xl'>Register</h2>
                    <p className="text-sm mt-4">
                        Welcome to Libranet, a place to lorem ipsum dolar sit amet.
                    </p>
                    <form onSubmit={register} className='flex flex-col gap-6'>

                        <input className='pt-2 mt-8 rounded-xl border' type="text" name='name' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input className='pt-2 rounded-xl border' type="text" name='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='pt-2 rounded-xl border' type="text" name='email' placeholder='Alamat' value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                        <div className='relative'>

                            <input className='p-2 rounded-xl border w-full' type="password" name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <FaEye className='text-[#002074] absolute top-1/2 right-3 -translate-y-1/2' />

                        </div>
                        <button className='bg-[#002074] rounded-xl text-white py-2'>Register</button>
                    </form>

                    <div className="mt-3 text-xs flex justify-between items-center py-6">
                        <p>If you already have an account</p>
                        <a href='/login' className='py-2 px-5 bg-white border rounded-xl'>Login</a>
                    </div>
                </div>
                <div className='w-1/2 sm:block hidden'>
                    <img src={loginLogo} alt="" className=' rounded-2xl' />
                </div>
            </div>
        </section>
    )
}
