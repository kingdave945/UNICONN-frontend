
import SideBar from "./sidebar";
import './layout.css';
import { useLocation } from "react-router-dom";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
// import { useState, useEffect } from "react";
// import SkeletonCard from "../components/SkeletonCard";
interface SideBarProps {
  role: string | null;
}

export default function Layout({ role }: SideBarProps) {
  //   const [outletloading, setOutletLoading] = useState(true);
  //    useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setOutletLoading(false);
  //   },  20 * 60 * 1000)

  //   return () => clearTimeout(timer);
  // }, []);
 const location = useLocation();

  const backgroundColors: Record<string, string> = {
    "/dashboard": "#f5f5f5",
    "/profile/favorites": "#fafafaff",
    "/profile/materials": "#fafafaff",
    "/profile/settings": "#fafafaff",
    "/studymaterial": "#fafafaff",
    '/Admin/Overview': '#fafafaff',
    '/Admin/MaterialReview': '#fafafaff'
  }
    const bgColor = backgroundColors[location.pathname] || "#ffffff";
  return (
    <div className="layout">
   
      <div className="layout__content">
        <SideBar
          role={role}
        />
        <main className="layout__main"  style={{ backgroundColor: bgColor }}>
        {/* {outletloading ? <SkeletonCard /> : <Outlet />} */}
        <Outlet/>
        </main>

      </div>
      <Footer/>
    </div>
  );
}

