import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import ModulePage from './ModulePage';

const CourseModule = () => {
  const [isOpen, setIsOpen] = useState(false);

  const direction = isOpen ? 'rotate-180' : '';

  return (
    <>
      <div className='border-t-2 border-slate-200'>
        <div
          className='flex items-center justify-between gap-2 bg-slate-100 p-4 text-sm'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <h3 className='font-bold'>
              Section 1: Getting Started with iOS Development and Swift 5
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
        {isOpen && <ModulePage />}
        {isOpen && <ModulePage />}
        {isOpen && <ModulePage />}
        {isOpen && <ModulePage />}
        {isOpen && <ModulePage />}
      </div>
      <div className='border-t-2 border-slate-200'>
        <div className='flex items-center justify-between gap-2 bg-slate-100 p-4 text-sm'>
          <div>
            <h3 className='font-bold'>
              Section 1: Getting Started with iOS Development and Swift 5
            </h3>
            <p>14/14 | 54min</p>
          </div>
          <IconContext.Provider
            value={{
              className: `transition-all ease-in-out duration-500`,
            }}
          >
            <IoIosArrowDown />
          </IconContext.Provider>
        </div>
      </div>
      <div className='border-t-2 border-slate-200'>
        <div className='flex items-center justify-between gap-2 bg-slate-100 p-4 text-sm'>
          <div>
            <h3 className='font-bold'>
              Section 1: Getting Started with iOS Development and Swift 5
            </h3>
            <p>14/14 | 54min</p>
          </div>
          <IconContext.Provider
            value={{
              className: `transition-all ease-in-out duration-500`,
            }}
          >
            <IoIosArrowDown />
          </IconContext.Provider>
        </div>
      </div>
    </>
  );
};

export default CourseModule;
