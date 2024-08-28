import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from '../src/pages/Layout/layout';
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import SignInRegister from "./pages/SignInRegisterPage/SignInRegisterPage";
import { AppProvider } from "./contexts/AppContext";
import Home from './components/Home/Home';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AllCourses from './pages/AllCourses/AllCourses';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <AppProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<SignInRegister reg={true} />} />
        <Route path="/login" element={<SignInRegister reg={false} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/createcourse" element={<CreateCourse />} />
        <Route path='/courses' element={<AllCourses />} />
      </Route>
    </Routes>
    </AppProvider>
  </BrowserRouter>
  </StrictMode>
);
