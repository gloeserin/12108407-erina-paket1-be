import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Carousel } from 'flowbite-react';
import { Card, Button } from 'flowbite-react';
import booksCard from '../components/data/booksCard.js';
import ModalContent from '../components/ModalContent.jsx';
import { useState } from 'react';
import React from 'react'

const Books = () => {

    const [openModal, setOpenModal] = useState(false)
    const [data, setData] = useState({});
    const [ setModalData] = useState({});

    const onClose = () => {
        setOpenModal(false)
    }

    return (
        <div className=" md:px-14 p-4 max-w-s mx-auto py-36" id='Books'>
            <div className="text-center">
                <h2 className="md:text-5xl text-3xl font-extrabold text-primary mb-2">
                    Daftar Buku
                </h2>
                <p className='text-tartiary md:w-1/3 mx-auto px-4'>
                A simple paragraph is comprised of three major components. The                         which is often a declarative sentence.
                </p>
            </div>

            <div className="my-36 md:my-8 py-12 w-[100%]  md:flex-row-reverse items-center justify-between gap-4">

                <Swiper slidesPerView={3} modules={[Navigation]} navigation centeredSlides>
                    {booksCard.map((item) => {
                        return (
                            <SwiperSlide>
                                <Card className="max-w-sm rounded-lg shadow-md" imgAlt="Apple Watch Series 7 in colors pink, silver, and black" renderImage={() => <img src={item.img} className='max-h-[200px] rounded-lg' />}  >
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            {item.title}
                                        </h5>
                                    </a>
                                    <div className="mb-5 mt-2.5 flex items-center">
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button onClick={() => { setOpenModal(true), setData(item)}} className=" rounded-xl shadow-lg bg-secondary px-6 py-2 text-center text-sm font-medium text-white hover:bg-neutralDGrey focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                                            
                                            More
                                        </Button>
                                    </div>
                                </Card>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            {ModalContent(openModal, setOpenModal, data, setData)}
        </div>
    )
}

export default Books;