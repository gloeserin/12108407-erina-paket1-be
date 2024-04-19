import React, { useState, useEffect } from 'react'
import { FaEye } from "react-icons/fa";
import loginLogo from '../images/login.jpeg'
import axios from 'axios';
import { useCookies } from 'react-cookie';  


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const cookies = useCookies(); 
    useEffect(() => {
        console.log(cookies)
        if (cookies[0].userId) {
            if (cookies[0].role === 'user') {
                window.location.href = '/peminjam/dashboard'
            } else if (cookies[0].role === 'admin') {
                window.location.href = '/admin/dashboard'
            } else if (cookies[0].role === 'petugas') {
                window.location.href = '/petugas/dashboard'
            }
        } 
    }, [ 
        cookies
    ])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        }, {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data)
            if (res.data.role === 'user') {
                window.location.href = '/peminjam/dashboard'
            } else if (res.data.role === 'admin') {
                window.location.href = '/admin/dashboard'
            } else if (res.data.role === 'petugas') {
                window.location.href = '/petugas/dashboard'
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <section className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-gray-100 flex rounded-2xl shadow-2xl max-w-3xl p-5">
                <div className='sm:w-1/2 px-12 mt-16'>
                    <h2 className='font-bold text-2xl'>Login</h2>
                    <p className="text-sm mt-4">
                        Welcome to Libranet, a place to lorem ipsum dolar sit amet.
                    </p>
                    <div className='flex flex-col gap-6 pt-6'>
                        {/* <input className='pt-2 mt-8 rounded-xl border' type="text" name='name' placeholder='Name' /> */}
                        <input className='pt-2 rounded-xl border' type="text" name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <div className='relative'>

                            <input className='p-2 rounded-xl border w-full' type="password" name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            <FaEye className='text-[#002074] absolute top-1/2 right-3 -translate-y-1/2' />

                        </div>
                        <button onClick={handleSubmit} className='bg-[#002074] rounded-xl text-white py-2'>Login</button>
                    </div>

                    <div className="mt-3 text-xs flex justify-between items-center py-6">
                        <p>If you don't have an account</p>
                        <a href='register' className='py-2 px-5 bg-white border rounded-xl'>Register</a>
                    </div>
                </div>
                <div className='w-1/2 sm:block hidden'>
                    <img src={loginLogo} alt="" className=' rounded-2xl' />
                </div>
            </div>
        </section>
    )
}
