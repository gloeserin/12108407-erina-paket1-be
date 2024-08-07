import React from 'react'
import logo from '../images/logo.png';
import instagram from '../images/instagram.png';
import facebook from '../images/facebook.png';
import twitter from '../images/twitter.png';
import linkedin from '../images/linkedin.png';


const Footer = () => {
    return (
        <div className='bg-[#002074] md:px-14 p-4 max-w-screen-2xl mx-auto text-white'>
            <div className='my-12 flex flex-col md:flex-row gap-10'>
                <div className='md:w-1/2 space-y-8'>
                    <a href="/" className='text-2xl font-semibold flex items-center space-x-3 text-primary'>
                        <img src={logo} className='w-10 inline-block items-center' alt="" />
                        <span className='text-white'>Libranet</span>
                    </a>
                    <p className='md:w-1/2 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt necessitatibus obcaecati earum.</p>
                    <div>
                        <input type="email" name='email' id='email' placeholder='Your Email'
                            className='bg-[#9A7AF159] py-2 px-4 rounded-md focus:outline-none' />
                        <input type="submit" value="subscribe" className='px-4 py-2 bg-secondary rounded-md -ml-2
                cursor-pointer hover:bg-white hover:text-primary duration-300 transition-all' />
                    </div>
                </div>

                <div className='md:w-1/2 flex flex-col md:flex-row flex-wrap justify-between gap-8 items-start'>
                    <div className='space-y-4 mt-5'>
                        <h4 className='text-xl'>Platform</h4>
                        <ul className='space-y-3'>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                        </ul>
                    </div>
                    <div className='space-y-4 mt-5'>
                        <h4 className='text-xl'>Platform</h4>
                        <ul className='space-y-3'>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                            <a href="/" className='block hover:text-gray-300'>Overview</a>
                        </ul>
                    </div>
                    <div className='space-y-4 mt-5'>
                        <h4 className='text-xl'>Platform</h4>
                        <ul className='space-y-3'>
                            <p className=' hover:text-gray-300'>Overview</p>
                            <p className=' hover:text-gray-300'>Overview</p>
                            <p className=' hover:text-gray-300'>Overview</p>
                            <p className=' hover:text-gray-300'>Overview</p>
                        </ul>
                    </div>
                </div>
            </div>

            <hr />

            <div className='flex flex-col sm:flex-row gap-8 sm:items-center justify-between my-8'>
                <p>@ XYZ 20XX --- 20XX. All rights reserved.</p>
                <div className='flex items-center space-x-5'>
                    <img src={instagram} alt="" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
                    <img src={facebook} alt="" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
                    <img src={twitter} alt=""  className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300'/>
                    <img src={linkedin} alt="" className='w-8 cursor-pointer hover:-translate-y-4 transition-all duration-300' />
                </div>
            </div>
        </div>
    )
}

export default Footer;
