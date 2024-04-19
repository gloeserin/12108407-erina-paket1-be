import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout.jsx';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export default function EditPetugas() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [alamat, setAlamat] = useState('');
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPetugasById();
        axios.get('http://localhost:5000/petugas')
            .then(response => {
                setKategori(response.data);
            })
            .catch(error => {
                console.error('Error fetching petugas:', error);
            });
    }, [])

    const getPetugasById = async () => {
        const response = await axios.get(`http://localhost:5000/petugas/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setAlamat(response.data.alamat);
    }

    const editPetugas = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('alamat', alamat);

        try {
            await axios.patch(`http://localhost:5000/petugas/${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            navigate('/admin/dashboard/dataPetugas');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Edit Petugas" />
            <div className="rounded-sm border w-1/2 flex flex-col border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg p-4">

                <form onSubmit={editPetugas} className=" gap-4 grow py-8  ">
                    <div className='flex flex-col gap-4'>
                        <div className=''>
                            <div className="mb-2 block">
                                <Label htmlFor="judul" value="Nama Petugas" />
                            </div>
                            <TextInput id="email1" type="text" placeholder="Masukkan Nama Petugas" required value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Email" />
                            </div>
                            <TextInput id="password1" type="text" placeholder='Masukkan Email Baru' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="large" value="Alamat" />
                            </div>
                            <TextInput id="large" type="text" placeholder='Masukkan Alamat Baru' sizing="lg" required value={alamat} onChange={(e) => setAlamat(e.target.value)} />
                        </div>
                        <div className='py-6'>
                            <Button className='bg-secondary px-8' type="submit">Submit</Button>

                        </div>

                    </div>
                </form>
            </div>
        </DefaultLayout>
    )
}