import React, { useState } from 'react'
import { Button, Modal, Select } from 'flowbite-react';
import { data } from 'autoprefixer';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

export default function ModalForm(openModal,setOpenModal,data) {
    const [ulasan, setUlasan] = useState('');
    const [rating, setRating] = useState(1)
    const [cookies] = useCookies(['userId', 'bookId']);
    const { id } = useParams();
    
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/ulasan' , {
                user_id: cookies.userId,
                book_id: data.uuid,
                ulasan: ulasan,
                rating: rating
                
            }, {
                withCredentials: true,
            });
            setOpenModal(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={openModal} onClose={() => { setOpenModal(false) }}>
            <Modal.Header>Beri Ulasan</Modal.Header>
            <Modal.Body>
                <div class="col-span-2">
                    <label for="name" class="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Beri Ulasan</label>
                    <input type="text" name="name" id="name" onChange={(e) => setUlasan(e.target.value)} class="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type your review" required="" />
                </div>
                <div class="col-span-2">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Beri Rating</label>
                    <input type="range" id="rating" onChange={ (e)=> setRating(e.target.value)} name="volume" min="1" max="5" />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-secondary px-6" onClick={(e) => handleSubmitReview(e, id)}>
                    Send
                </Button>
            </Modal.Footer>
        </Modal>
    )
}