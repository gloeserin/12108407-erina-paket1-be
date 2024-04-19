import React from 'react'
import { Button, Modal, Select } from 'flowbite-react';
import { data } from 'autoprefixer';


export default function ModalContent(openModal, setOpenModal, data, setModalData) {
  return (
    <Modal show={openModal} onClose={() => {setOpenModal(false), setModalData({})} }>
        <Modal.Header> {data.judul} </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 " renderImage={() => <img src={`http://localhost:5000/images/${item.cover}`} className='max-h-[200px] rounded-lg' />}>
            </p>
            <p className="text-xl leading-relaxed text-slate-950 font-medium dark:text-gray-400">
            {data.penulis}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {data.deskripsi}
            </p>
            <hr className='text-slate-600'/>
            <p className="text-xl leading-relaxed text-slate-950 dark:text-gray-400">
              Ulasan
            </p>           
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Pinjam </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Beri Ulasan
          </Button>
        </Modal.Footer>
      </Modal>
  )
}