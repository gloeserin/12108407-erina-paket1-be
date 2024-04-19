import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout.jsx';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import LayoutPetugas from '../../layout/LayoutPetugas.jsx';

export default function EditKategoriPetugas() {
    const [namaKategori, setNamaKategori] = useState('');
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getKategoriById();
    }, [])

    const getKategoriById = async () => {
        const response = await axios.get(`http://localhost:5000/kategori/${id}`);
        setNamaKategori(response.data.namaKategori);
    }

    const editKategori = async (e) => {
        e.preventDefault();
        try {
          await axios.patch(`http://localhost:5000/kategori/${id}`, {
            namaKategori:namaKategori
          },
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          navigate('/petugas/dashboard/tambahKategori');
        } catch (error) {
          console.log(error);
        }
    };

    return (
        <LayoutPetugas>
          <Breadcrumb pageName="Edit Buku" />
          <div className="rounded-sm border flex flex-col border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg p-4">
            <form onSubmit={editKategori} className=" grid grid-cols-2 gap-4 grow py-8  ">
              <div className='flex flex-col gap-4'>
                <div className=''>
                  <div className="mb-2 block">
                    <Label htmlFor="judul" value="Nama Kategori" />
                  </div>
                  <TextInput id="email1" type="text" placeholder="Masukkan Judul Buku" required value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} />
                  <div className='py-6'>
                <Button className='bg-secondary px-8' type="submit">Submit</Button>
                </div>
                </div>
              </div>
            </form>
          </div>
        </LayoutPetugas>
      )
}
