import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
