import { Link, Outlet } from "react-router-dom";
import NavBar from '../../components/NavBar/NavBar.tsx'
import Footer from '../../components/Footer/Footer.tsx';

function Layout() {
  return (
    <div className="layout">
      <Link to="/dashboard"> Dashboard</Link>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;