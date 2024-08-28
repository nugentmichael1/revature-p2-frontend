import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from '../src/pages/Layout/layout';
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import Home from './components/Home/Home';
import DashboardPage from "./pages/Dashboard/DashboardPage";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/createcourse" element={<CreateCourse />}>
      </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>,
);

