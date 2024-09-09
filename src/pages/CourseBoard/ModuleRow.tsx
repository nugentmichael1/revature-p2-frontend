import { Link } from 'react-router-dom';
import { Module } from '../../types/module';
import { useState } from 'react';
import UpdateModuleModal from '../../components/UpdateModuleModal/UpdateModuleModal';
import { createPortal } from 'react-dom';
import DeleteModuleModal from '../../components/DeleteModuleModal/DeleteModuleModal';

type Props = {
  module: Module;
  updateCourse: (close: () => void) => Promise<void>;
};

const ModuleRow = ({ module, updateCourse }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <td className='pl-16 text-left'>{module.orderIndex}</td>
      <td className='text-left'>{module.title}</td>
      <td>
        <span className='rounded-md border-2 border-green-200 bg-green-100 px-4 py-2 text-sm text-green-600'>
          Active
        </span>
      </td>
      <td className='flex items-center justify-center gap-4'>
        <Link
          //   to={`/sections/${section.id}`}
          to=''
          className='rounded-md border-2 border-pink-200 bg-primary-500 px-4 py-2 text-sm text-slate-50'
        >
          View
        </Link>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className='rounded-md border-2 border-blue-200 bg-secondary-500 px-4 py-2 text-sm text-slate-50'
        >
          Edit
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className='rounded-md border-2 border-slate-200 bg-slate-700 px-4 py-2 text-sm text-slate-50'
        >
          Delete
        </button>
      </td>
      {isEditModalOpen &&
        createPortal(
          <UpdateModuleModal
            close={() => setIsEditModalOpen(false)}
            updateCourse={updateCourse}
            module={module}
          />,
          document.body,
        )}
      {isDeleteModalOpen &&
        createPortal(
          <DeleteModuleModal
            close={() => setIsDeleteModalOpen(false)}
            updateCourse={updateCourse}
            module={module}
          />,
          document.body,
        )}
    </>
  );
};

export default ModuleRow;
