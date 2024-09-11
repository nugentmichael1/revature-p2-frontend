import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import CreatePageModal from '../../components/CreatePageModal/CreatePageModal';
import { createPortal } from 'react-dom';
import { useAppContext } from '../../contexts/AppContext';
import axios from 'axios';
import { Page } from '../../types/page';
import { Module } from '../../types/module';
import PageRow from './PageRow';

const ModuleBoard = () => {
  const { moduleId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [module, setModule] = useState<Module>();

  const {
    state: { user },
  } = useAppContext();

  async function getModuleById() {
    const response = await axios.get<Module>(
      `${import.meta.env.VITE_API_URL}/course/${moduleId}`,
      { headers: { Authorization: user?.token } },
    );

    // console.log(response.data);
    if (response.data) {
      setModule(response.data);
    }
  }

  async function getPagesByModuleId() {
    const response = await axios.get<Page[]>(
      `${import.meta.env.VITE_API_URL}/module/${moduleId}/pages`,
      { headers: { Authorization: user?.token } },
    );
    // console.log(response.data);
    setPages(response.data);
  }

  useEffect(() => {
    getModuleById();
    getPagesByModuleId();
  }, []);

  async function updateModule(close: () => void) {
    await getPagesByModuleId();
    close();
  }

  return (
    <>
      <div className='section-min-height mx-auto flex max-w-7xl flex-col gap-8 py-24'>
        <div className='flex items-center justify-between gap-4 px-4 font-bold text-primary-500'>
          <div className='flex items-center text-4xl'>
            <Link to={`/dashboard`}>
              <FaArrowLeft />
            </Link>
            <h1>{module?.name}</h1>
          </div>
          <Link
            to={`/dashboard/modules/${module?.id}/createexam`}
            className='font-md w-fit self-center rounded-md border-2 border-primary-500 px-8 py-2 text-primary-500 hover:bg-primary-500 hover:text-slate-50'
          >
            Create Exam
          </Link>
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
              {pages
                ?.slice()
                .sort((a, b) => a.pageNumber - b.pageNumber)
                .map(p => (
                  <tr className='border-b-2 font-medium [&>td]:py-4' key={p.id}>
                    <PageRow page={p} updateModule={updateModule} />
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <button
          className='w-fit self-center rounded-md border-2 border-primary-500 px-8 py-2 text-primary-500 hover:bg-primary-500 hover:text-slate-50'
          onClick={() => setIsModalOpen(true)}
        >
          Add New Page
        </button>
      </div>
      {isModalOpen &&
        createPortal(
          <CreatePageModal
            close={() => setIsModalOpen(false)}
            updateModule={updateModule}
            moduleId={Number(moduleId!)}
          />,
          document.body,
        )}
    </>
  );
};

export default ModuleBoard;
