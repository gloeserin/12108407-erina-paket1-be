import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout.jsx';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import LayoutPetugas from '../../layout/LayoutPetugas.jsx';


export default function TambahBukuPetugas() {
  const [judul, setName] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [penulis, setPenulis] = useState('');
  const [tahun, setTahun] = useState('');
  const [stock, setStock] = useState('');
  const [file, setFile] = useState('');
  const [kategori, setKategori] = useState([]);
  const [namaKategori, setNamaKategori] = useState('');

  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  const createBooks = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('penulis', penulis);
    formData.append('penerbit', penerbit);
    formData.append('tahun', tahun);
    formData.append('stock', stock);
    formData.append('kategori_id', namaKategori);
    formData.append('deskripsi', deskripsi);
    formData.append('file', file);
    console.log(kategori)
    try {
      await axios.post("http://localhost:5000/books", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      navigate('/petugas/dashboard/dataBuku');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/kategori')
      .then(response => {
        setKategori(response.data);
      })
      .catch(error => {
        console.error('Error fetching kategori:', error);
      });
  }, []);
  
  
  return (
    <LayoutPetugas>
      <Breadcrumb pageName="Tambah Buku" />
      <div className="rounded-sm border flex flex-col border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg p-4">
        <form onSubmit={createBooks} className=" grid grid-cols-2 gap-4 grow py-8  ">
          <div className='flex flex-col gap-4'>
            <div className=''>
              <div className="mb-2 block">
                <Label htmlFor="judul" value="Judul" />
              </div>
              <TextInput id="email1" type="text" placeholder="Masukkan Judul Buku" required value={judul} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Penerbit" />
              </div>
              <TextInput id="password1" type="text" placeholder='Masukkan Nama Penerbit' required value={penerbit} onChange={(e) => setPenerbit(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="large" value="Sinopsis" />
              </div>
              <TextInput id="large" type="text" placeholder='Masukkan Sinopsis' sizing="lg" required value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
            </div>
            <div>
              <div className="mb-3 block">
                <label for="countries" class="block mb-3 text-sm font-medium text-gray-900 dark:text-white">Masukkan Kategori</label>
              </div>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)}>
                  <option value="" disabled selected>Pilih kategori</option>
                {kategori.map(kategori => (
                  <option key={kategori.id} value={kategori.uuid}>{kategori.namaKategori}</option>
                ))}
              </select>           
             </div>
          </div>

          <div className='flex flex-col gap-4'>
            <div className=''>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Penulis" />
              </div>
              <TextInput id="penulis" type="text" placeholder="Masukkan Nama Penulis" required value={penulis} onChange={(e) => setPenulis(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Tahun Terbit" />
              </div>
              <TextInput id="password1" type="text" placeholder='Masukkan Tahun Terbit' required value={tahun} onChange={(e) => setTahun(e.target.value)} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Stock" />
              </div>
              <TextInput id="password1" type="text" placeholder='Masukkan stock' required value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <div>

              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
              <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none file:!bg-secondary " aria-describedby="user_avatar_help" id="user_avatar" type="file" onChange={loadImage} />
            </div>
          </div>
          <div className='py-6'>
            <Button className='bg-secondary px-8' type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </LayoutPetugas>
  )
}
