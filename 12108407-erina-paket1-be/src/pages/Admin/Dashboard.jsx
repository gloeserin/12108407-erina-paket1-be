import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import WelcomeBanner from '../../partials/dashboard/WelcomeBanner';
import axios from 'axios';


function Dashboard() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cookies = useCookies();
  useEffect(() => {
    console.log(cookies)
    if (cookies[0].userId) {
      if (cookies[0].role === 'user') {
        window.location.href = '/peminjam/dashboard'
      } else if (cookies[0].role === 'petugas') {
        window.location.href = '/petugas/dashboard'
      }
    }
    
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/${cookies[0].userId}`);
        setUser(res.data);
        setIsLoading(false);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [
    cookies
  ])

  if (isLoading) {
    return (
      <h3>Loading</h3>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

          </div>
        </main>



      </div>
    </div>
  );
}

export default Dashboard;