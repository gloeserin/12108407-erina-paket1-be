import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard';
import DataPetugas from './components/admin/DataPetugas';
import TambahPetugas from './components/admin/TambahPetugas';
import DataBuku from './components/admin/DataBuku';
import TambahBuku from './components/admin/TambahBuku';
import EditBuku from './components/admin/EditBuku';
import Login from './pages/Login';
import Register from './pages/Register';
import './css/style.css';
import DashboardPeminjam from './pages/Peminjam/Dashboard';
import SemuaBuku from './components/peminjam/SemuaBuku';
import TambahKategori from './components/admin/TambahKategori';
import EditPetugas from './components/admin/EditPetugas';
import EditKategori from './components/admin/EditKategori';
import Ulasan from './components/peminjam/Ulasan';
import Borrowed from './components/peminjam/Borrowed';
import DataPeminjam from './components/admin/DataPeminjam';
import DataBukuPetugas from './components/petugas/DataBuku';
import DataPeminjamPetugas from './components/petugas/DataPeminjam';
import DashboardPetugas from './pages/Petugas/Dashboard';
import TambahBukuPetugas from './components/petugas/TambahBuku';
import EditBukuPetugas from './components/petugas/EditBuku';
import DataKategoriPetugas from './components/petugas/DataKategori';
import EditKategoriPetugas from './components/petugas/EditKategori';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/dashboard/tambahKategori",
    element: <TambahKategori />,
  },
  {
    path: "/admin/dashboard/dataPetugas",
    element: <DataPetugas />,
  },
  {
    path: "/admin/dashboard/tambahPetugas",
    element: <TambahPetugas />,
  },
  {
    path: "/admin/dashboard/dataBuku",
    element: <DataBuku />,
  },
  {
    path: "/admin/dashboard/tambahBuku",
    element: <TambahBuku />,
  },
  {
    path: "/admin/dashboard/editBuku/:id",
    element: <EditBuku />,
  },
  {
    path: "/admin/dashboard/editPetugas/:id",
    element: <EditPetugas />,
  },
  {
    path: "/admin/dashboard/editKategori/:id",
    element: <EditKategori />,
  },
  {
    path: "/petugas/dashboard/dataBuku",
    element: <DataBukuPetugas />,
  },
  {
    path: "/petugas/dashboard/tambahKategori",
    element: <DataKategoriPetugas />,
  },
  {
    path: "/petugas/dashboard/dataPeminjam",
    element: <DataPeminjamPetugas />,
  },
  {
    path: "/petugas/dashboard/tambahBukuPetugas",
    element: <TambahBukuPetugas />,
  },
  {
    path: "petugas/dashboard/editKategori/:id",
    element: <EditKategoriPetugas />,
  },
  {
    path: "/petugas/dashboard/editBukuPetugas/:id",
    element: <EditBukuPetugas />,
  },
  {
    path: "/petugas/dashboard",
    element: <DashboardPetugas />,
  },
  {
    path: "/peminjam/dashboard",
    element: <DashboardPeminjam />,
  },
  {
    path: "/peminjam/dashboard/dataBuku",
    element: <SemuaBuku />,
  },
  {
    path: "/peminjam/dashboard/borrowed",
    element: <Borrowed />,
  },
  {
    path: "/peminjam/dashboard/ulasan/:id",
    element: <Ulasan />,
  },
  {
    path: "/admin/dashboard/dataPeminjam",
    element: <DataPeminjam />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
