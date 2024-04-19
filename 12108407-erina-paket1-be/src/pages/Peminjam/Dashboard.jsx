import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import DataBuku from '../../components/admin/DataBuku';
import SidebarPeminjam from '../../partials/SidebarPeminjam';
import { FaRegEdit } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import axios from 'axios';

function DashboardPeminjam() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cookies = useCookies();

  const [books, setBooks] = useState([]);


  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${cookies[0].userId}`);
      setUser(res.data);
      setIsLoading(false);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/userbook', {
        withCredentials: true,
      });
      setBooks(response.data.books);
      return response.data;

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (cookies.length > 0 && cookies[0].userId) {
      if (cookies[0].role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (cookies[0].role === 'petugas') {
        window.location.href = '/petugas/dashboard';
      } else {
        getUser();
        getBooks();
      }
    }
  }, []);

  const handleSubmit = async (e, ids) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/pengembalian/' + ids, {
        user_id: cookies.userId
    }, {
        withCredentials: true,
    }).then((res) => {
        console.log(res.data)
        window.location.reload()
    }).catch((err) => {
        console.log(err)
    }
    )
}


  if (isLoading) {
    return (
      <h3>Loading</h3>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <SidebarPeminjam sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header name={user.name} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner name={user.name} />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Avatars */}


              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}

                {/* Datepicker built with flatpickr */}

                {/* Add view button */}
                {/* <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                    <span className="hidden xs:block ml-2">Add view</span>
                </button>                 */}
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              {/* Line chart (Acme Advanced) */}
              {/* Line chart (Acme Professional) */}

              {/* <DashboardCard03 /> */}
              {/* Bar chart (Direct vs Indirect) */}
              {/* Line chart (Real Time Value) */}
              {/* Doughnut chart (Top Countries) */}
              {/* Table (Top Channels) */}
              {/* Line chart (Sales Over Time) */}
              {/* Stacked bar chart (Sales VS Refunds) */}
              {/* Card (Customers) */}
              {/* Card (Reasons for Refunds) */}
              {/* Card (Recent Activity) */}
              {/* Card (Income/Expenses) */}

            </div>
            <div className='py-12'>


              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark shadow-lg">
                <div className="py-6 px-4 md:px-6 xl:px-8 flex justify-between items-center">
                  <h4 className="text-xl font-semibold text-black dark:text-white">
                    Koleksi Pribadi
                  </h4>

                </div>

                <div className="grid grid-cols-8 gap-1 border-t border-stroke py-5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
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
                    <p className="font-medium">Tanggal Peminjaman</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="font-medium">Tanggal Pengembalian</p>
                  </div>
                  <div className="col-span-1 flex items-center">
                    <p className="font-medium">Action</p>
                  </div>
                </div>

                {books.map((item, index) => {
                  return (
                    <div
                      className="grid grid-cols-8 gap-1 border-t border-stroke py-6 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                    >
                      <div className="col-span-1 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                          <p className="text-sm text-black dark:text-white">
                            {index+1}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">
                          {item.judul}
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                          {item.penulis}
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                          {item.penerbit} 
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">
                          {item.tahun} 
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white truncate">
                          {item.deskripsi} 
                        </p>
                      </div>
                      <div className="col-span-1 flex items-center">
                        <img src={`http://localhost:5000/images/${item.cover}`} className="text-sm text-black dark:text-white"/>
                         
                      </div>
                      <div className="col-span-1 flex items-center">
                          <Button className='bg-secondary text-xs px-3 py-2' 
                          onClick={(e) => handleSubmit(e, item.uuid)}
                          >
                            Kembalikan
                            </Button>                         
                      </div>
                     
                    </div>
                  )
                })}
              </div>



            </div>
          </div>
        </main>


      </div>
    </div>
  );
}

export default DashboardPeminjam;