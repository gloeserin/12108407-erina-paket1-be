import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import { Button } from "@material-tailwind/react";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import LayoutPetugas from '../../layout/LayoutPetugas.jsx';

export default function DataBuku() {
  const [books, setBooks] = useState([]);
  const [oldBooks, setOldBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books', {
        withCredentials: true
      }).then((res) => {
        setBooks(res.data);
        setOldBooks(res.data);
        return res.data
      });
      return response;

    } catch (error) {
    }
  };
  useEffect(() => {
    getBooks()
  }, []);

  const searchBook = async (e) => {
    const bukus = oldBooks.filter(book => {
      return book.judul.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.deskripsi.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.stock.toString().toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.penulis.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.penerbit.toLowerCase().includes(e.target.value.toLowerCase()) ||
        book.tahun.toLowerCase().includes(e.target.value.toLowerCase())
    })

    setBooks(bukus)
    if (e.target.value === '') getBooks()
  }



  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      getBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const exportToExcel = () => {
    const data = books.map(item => ({
      "Nama Buku": item.judul,
      "Nama Penulis": item.penulis,
      "Penerbit": item.penerbit,
      "stock": item.stock,
      "Tahun Terbit": item.tahun,
      "Kategori": item.kategori.namaKategori,
      "Sinopsis": item.deskripsi
    }));
    console.log(data);

    const ws = XLSX.utils.json_to_sheet(books);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
    const buffer = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }
    saveAs(new Blob([buffer], { type: "application/octet-stream" }), 'data.xlsx');
  }


  return (
    <LayoutPetugas>
      <Breadcrumb pageName="Data Buku" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="py-6 px-4 md:px-6 xl:px-8 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Data Buku
          </h4>
          <Button onClick={() => exportToExcel()} size="md" className='bg-secondary text-white ml-auto mr-2'>Export Excel</Button>
          <Link to="/petugas/dashboard/tambahBukuPetugas">
            <Button size="md" className='bg-secondary text-white'>tambah +</Button>
          </Link>

        </div>
        <form class=" mx-auto px-8 py-2">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => searchBook(e)} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search All Books . . . " required />
          </div>
        </form>


        <div className="grid grid-cols-12 border-t border-stroke py-5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Judul</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Penulis</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Penerbit</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Tahun Terbit</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Kategori</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Sinopsis</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Stock</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Cover</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Action</p>
          </div>
        </div>

        {books.map((book, index) => {
          return (
            <div key={book.uuid} className="grid grid-cols-12 border-t border-stroke py-5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
              <div className="col-span-1 flex items-center">
                <p>{index + 1}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p>{book.judul}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p>{book.penulis}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p>{book.penerbit}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p>{book.tahun}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className='truncate'>{book.kategori.namaKategori}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className='truncate'>{book.deskripsi}</p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className='truncate'>{book.stock}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <img src={`http://localhost:5000/images/${book.cover}`} alt={book.judul} className="w-10 h-10" />
              </div>
              <div className="col-span-1 flex items-center">
                <Link to={`/petugas/dashboard/editBukuPetugas/${book.uuid}`}>
                  <FaRegEdit className="text-primary text-2xl cursor-pointer" />
                </Link>
                <RiDeleteBin5Line className='text-primary text-2xl cursor-pointer' onClick={() => deleteBook(book.uuid)} />
                {/* <Button className="text-primary" onClick={() => deleteBook(book._id)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </Button>    */}
                {/* <Button size="sm" color="red" onClick={() => deleteBook(book._id)}>Hapus</Button> */}
              </div>
            </div>

          )
        })
        }
      </div>
    </LayoutPetugas>
  )
}

