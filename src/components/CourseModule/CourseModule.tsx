import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import ModulePage from './ModulePage';
import { Module } from '../../types/module';
import axios from 'axios';
import { useAppContext } from '../../contexts/AppContext';
import { Page } from '../../types/page';

type Props = {
  module: Module;
};

const CourseModule = ({ module }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);

  const {
    state: { user },
  } = useAppContext();

  async function getPagesByModuleId() {
    const response = await axios.get<Page[]>(
      `${import.meta.env.VITE_API_URL}/module/${module.id}/pages`,
      { headers: { Authorization: user?.token } },
    );
    console.log(response.data);
    setPages(response.data);
  }

  const direction = isOpen ? 'rotate-180' : '';

  async function openModule() {
    if (!isOpen) {
      await getPagesByModuleId();
    } else {
      setPages([]);
    }
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className='border-t-2 border-slate-200'>
        <div
          className='flex items-center justify-between gap-2 bg-slate-100 p-4 text-sm'
          onClick={openModule}
        >
          <div>
            <h3 className='font-bold'>
              Module {module.orderIndex}: {module.title}
            </h3>
            <p>14/14 | 54min</p>
          </div>
          <IconContext.Provider
            value={{
              className: `transition-all ease-in-out duration-500 ${direction}`,
            }}
          >
            <IoIosArrowDown />
          </IconContext.Provider>
        </div>
        {isOpen &&
          pages
            ?.slice()
            .sort((a, b) => a.pageNumber - b.pageNumber)
            .map(p => <ModulePage page={p} key={p.id} />)}
      </div>
    </>
  );
};

export default CourseModule;
