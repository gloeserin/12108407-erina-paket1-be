import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import LayoutPeminjam from '../../layout/LayoutPeminjam.jsx';
import { FaRegEdit } from "react-icons/fa";
import Books from '../../components/Books.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Carousel } from 'flowbite-react';
import { Card, Button } from 'flowbite-react';
import booksCard from '../../components/data/booksCard.js';
import ModalContent from '../../components/ModalContent.jsx';
import axios from "axios";
import novel from '../../images/novel1.jpg';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import ModalUlasan from '../../components/peminjam/ModalUlasan.jsx';




export default function Ulasan() {
    const [openModal, setOpenModal] = useState(false)
    const [setModalData] = useState({});
    const { id } = useParams();
    const [cookies, setCookie] = useCookies(['userId']);
    const [book, setBook] = useState([]);
    const [pinjam, setPinjam] = useState(false);
    const [review, setReview] = useState([]);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/ulasan/${id}`, {
                    withCredentials: true,
                });
                setReview(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchReviews();
        const getBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/books/' + id, {
                    withCredentials: true,
                }).then((res) => {
                    setBook(res.data.response);
                    setPinjam(res.data.dipinjam)
                    return res.data
                }
                );
                console.log(response)
                return response;

            } catch (error) {
            }
        };
        getBooks()
    }, []);

    const handleSubmit = async (e, ids) => {
        e.preventDefault()
        await axios.post('http://localhost:5000/pinjam/' + id, {
            user_id: cookies.userId
        }, {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data)
            setPinjam(true)

        }).catch((err) => {
            console.log(err)
        }
        )
    }

    function formatDate(date) {
        const d = new Date(date)
        if (date === null) return ('')
        return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    }

    const onClose = () => {
        setOpenModal(false)
    }


    return (
        <LayoutPeminjam>
            <Breadcrumb pageName="Ulasan" />
            <div className="my-12 pb-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-24">
                <div className="md:col-span-2">
                    <img src={`http://localhost:5000/images/${book.cover}`} alt="Cover" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="md:col-span-3 space-y-4">
                    <h2 className="text-2xl font-bold">{book.judul}</h2>
                    <p className="text-md">Penulis: {book.penulis}</p>
                    <p className="text-md">Penerbit: {book.penerbit}</p>
                    <p className="text-md">Kategori: {book.kategori?.namaKategori}</p>
                    <p className="text-gray-700">{book.deskripsi}</p>
                    <div className="flex space-x-4">
                        {pinjam ? (
                            <></>
                        ) : book.stock === 0 ? (
                            <p className='text-gray-500'>
                                Stok Habis
                            </p>
                        )
                            : (
                                <Button onClick={(e) => { handleSubmit(e, book.id) }}>
                                    Pinjam
                                </Button>
                            )
                        }
                        <Button onClick={() => { setOpenModal(true) }}>
                            Beri Ulasan
                        </Button>
                    </div>
                </div>
            </div>
            <div className="my-12">
                <h2 className="text-2xl font-bold">Review</h2>
            </div>
            <div class="flex flex-row gap-3 mt-14">
                {review.map((review) => (
                    <div class="flex flex-col gap-4 bg-white shadow-md p-4 w-96">
                        <div class="flex justify justify-between">
                            <div class="flex gap-2">
                                <img className='rounded-full h-8' src={`https://ui-avatars.com/api/?name=${review.user.name}`} />
                                <span className='font-bold'>{review.user.name}</span>
                            </div>
                        </div>
                        <div>
                            <div class="flex gap-2">
                                <span class="font-bold">Rating: </span>
                                <span>{review.rating}/5</span>
                            </div>
                        </div>

                        <div>
                            {review.ulasan}
                        </div>

                        <div class="flex justify-between">
                            <span>{formatDate(review.tanggalUlasan)}</span>
                        </div>
                    </div>
                ))}
                {ModalUlasan(openModal, setOpenModal, book)}
            </div>


        </LayoutPeminjam>
    )
}
