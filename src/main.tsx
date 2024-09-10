import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from '../src/pages/Layout/layout';
import CreateCourse from './pages/CreateCourse/CreateCourse';
import SignInRegister from './pages/SignInRegisterPage/SignInRegisterPage';
import { AppProvider } from './contexts/AppContext';
import Home from './components/Home/Home';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AllCourses from './pages/AllCourses/AllCourses';
import Exam from './pages/Exam/Exam';
import CoursePage from './pages/Course/CoursePage';
import ContactUs from './pages/ContactUs/ContactUs';
import AboutUs from './pages/AboutUs/AboutUs';
import CreateExam from './pages/CreateExam/CreateExam';
import CheckoutSuccess from './pages/Checkout/CheckoutSuccess';
import CheckoutCancel from './pages/Checkout/CheckoutCancel';
import Profile from './pages/Profile/Profile';
import CourseBoard from './pages/CourseBoard/CourseBoard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/register' element={<SignInRegister />} />
            <Route path='/login' element={<SignInRegister />} />
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/createcourse' element={<CreateCourse />} />
            <Route path='/courses' element={<AllCourses />} />
            <Route path='/exam/:examId' element={<Exam />} />
            <Route path='/createexam' element={<CreateExam moduleId={0} />} />
            <Route path='/course/:courseId' element={<CoursePage />} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route path='/checkout-cancel' element={<CheckoutCancel />} />
            <Route path='/profile' element={<Profile />} />
            <Route
              path='/dashboard/courses/:courseId'
              element={<CourseBoard />}
            />
            <Route path='/contactus' element={<ContactUs />} />
            <Route path='/aboutus' element={<AboutUs />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
