import React, { useState, useEffect } from 'react'
import Breadcrumb from '../Breadcrumb/Breadcrumb.jsx';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import LayoutPeminjam from '../../layout/LayoutPeminjam.jsx'; 
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';


export default function Borrowed() {
 const [borrowed, setBorrowed] = useState([]);
 const exportToExcel = () => {
  const data = borrowed.map(item => ({
    "Nama Buku": item.book.judul,
    "Nama Peminjam": item.user.name,
    "Tanggal Pinjam": item.tanggalPeminjaman,
    "Tanggal Pengembalian": item.tanggalPengembalian,
    
  }));

  const ws = XLSX.utils.json_to_sheet(data);
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

  useEffect(() => {
    const getBorrowed = async () => {
      try {
        const response = await axios.get('http://localhost:5000/peminjaman/user',{
          withCredentials:true
        }).then((res) => {
          setBorrowed(res.data);
          return res.data
        }
        );
        return response;
  
      } catch (error) {
      }
    }
    getBorrowed()
  }, []);

  function formatDate (date) {
    const d = new Date(date)
    if(date === null) return ('Belum Dikembalikan')
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }


  return (
    <LayoutPeminjam>
      <Breadcrumb pageName="Data Peminjaman" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
        <div className="py-6 px-4 md:px-6 xl:px-8 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black ">
            Data Peminjaman
          </h4>
            <Button onClick={exportToExcel} size="md" className='bg-secondary text-white'>Export</Button>

        </div>

        <div className="grid grid-cols-5 border-t border-stroke py-5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5">
          <div className="col-span-1 flex items-center">
            <p className="font-medium">No</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="font-medium">Nama Peminjam</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Judul Buku</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Tanggal Peminjaman</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Tanggal Pengembalian</p>
          </div>
        </div>

{borrowed.map((borrow, index) => {
  return (
    
    <div
    className="grid grid-cols-5 border-t border-stroke py-6 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5"
  >
    <div className="col-span-1 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-black ">
        {index + 1}
        </p>
      </div>
    </div>
    <div className="col-span-1 hidden items-center sm:flex">
      <p className="text-sm text-black ">
          {borrow.user.name}
      </p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black ">
          {borrow.book.judul}
      </p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black ">
        {formatDate(borrow.tanggalPeminjaman)}
      </p>
    </div>
    <div className="col-span-1 flex items-center">
      <p className="text-sm text-black ">
        {formatDate(borrow.tanggalPengembalian)}
      </p>
    </div>
    
  </div>
  )
})}
         

      </div>
      </LayoutPeminjam>
  )
}
