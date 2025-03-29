import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import "./layouts.css";

const MainLayout = () => {

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <div className="content">
          <Outlet className="body" />
        </div>
    </div>
    </>
  );
}

export default MainLayout;