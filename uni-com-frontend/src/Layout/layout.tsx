import NavBar from "./navbar";
import SideBar from "./sidebar";
import './layout.css';
import Footer from "./footer";
import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SkeletonCard from "../components/SkeletonCard";
  interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
  setIsPublic: (value: boolean) => void;
  isPublic: boolean;
}
 
export default function Layout({theme, toggleTheme, setIsPublic, isPublic}: NavbarProps) {
  //   const [outletloading, setOutletLoading] = useState(true);
  //    useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOutletLoading(false);
  //   },  20 * 60 * 1000)

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="layout">
      <NavBar
       toggleTheme={toggleTheme}
        theme={theme}
        setIsPublic = {setIsPublic}
        isPublic = {isPublic}
      />
      <div className="layout__content">
        <SideBar />
        <main className="layout__main">
        {/* {outletloading ? <SkeletonCard /> : <Outlet />} */}
        <Outlet/>
        </main>

      </div>
      <Footer/>
    </div>
  );
}

