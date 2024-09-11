import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Course } from '../../types/course';
import axios from 'axios';
import { Module } from '../../types/module';
import { useAppContext } from '../../contexts/AppContext';
import ModuleRow from './ModuleRow';
import { createPortal } from 'react-dom';
import CreateModuleModal from '../../components/CreateModuleModal/CreateModuleModal';

const CourseBoard = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course>();
  const [modules, setModules] = useState<Module[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    state: { user },
  } = useAppContext();

  async function getModulesByCourseId() {
    const response = await axios.get<Module[]>(
      `${import.meta.env.VITE_API_URL}/course/${courseId}/modules`,
      { headers: { Authorization: user?.token } },
    );

    console.log(response.data);
    if (response.data) {
      setModules(response.data);
    }
  }

  async function getCourseById() {
    const response = await axios.get<Course>(
      `${import.meta.env.VITE_API_URL}/course/${courseId}`,
      { headers: { Authorization: user?.token } },
    );

    console.log(response.data);
    if (response.data) {
      setCourse(response.data);
    }
  }

  async function updateCourse(close: () => void) {
    await getModulesByCourseId();
    close();
  }

  useEffect(() => {
    getCourseById();
    getModulesByCourseId();
  }, []);

  return (
    <>
      <div className='min-h-screen section-min-height mx-auto flex max-w-7xl flex-col gap-8 py-24'>
        <div className='flex items-center gap-4 px-4 text-4xl font-bold text-primary-500'>
          <Link to='/dashboard'>
            <FaArrowLeft />
          </Link>
          <h1>{course?.name}</h1>
        </div>
        <div className='w-full rounded-md bg-slate-50 shadow-sm'>
          <table className='table w-full table-auto'>
            <thead>
              <tr className='border-b-2 text-primary-500 [&>th]:py-2'>
                <th className='pl-16 text-left'>No</th>
                <th className='text-left'>Title</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {modules
                ?.slice()
                .sort((a, b) => a.orderIndex - b.orderIndex)
                .map(module => (
                  <tr
                    className='border-b-2 font-medium [&>td]:py-4'
                    key={module.id}
                  >
                    <ModuleRow module={module} updateCourse={updateCourse} />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button
          className='w-fit self-center rounded-md border-2 border-primary-500 px-8 py-2 text-primary-500 hover:bg-primary-500 hover:text-slate-50'
          onClick={() => setIsModalOpen(true)}
        >
          Add New Module
        </button>
      </div>
      {isModalOpen &&
        createPortal(
          <CreateModuleModal
            close={() => setIsModalOpen(false)}
            updateCourse={updateCourse}
            courseId={Number(courseId!)}
          />,
          document.body,
        )}
    </>
  );
};

export default CourseBoard;
