// components/MainLayout.jsx
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Where child routes render */}
    </>
  );
}

export default Layout;
