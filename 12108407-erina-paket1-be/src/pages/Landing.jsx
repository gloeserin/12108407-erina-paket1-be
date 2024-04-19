import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Features from '../components/Features';
import About from '../components/About';
import Books from '../components/Books';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Landing() {
  return (
    <div className=''>
       <Navbar />
       <Home/>
       <Features/>
       <About />
       <Books />
       <Newsletter />
       <Footer />
    </div>
  )
}
