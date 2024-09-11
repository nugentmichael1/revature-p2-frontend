import { useState } from 'react';
import { Page } from '../../types/page';
import UpdatePageModal from '../../components/UpdatePageModal/UpdatePageModal';
import DeletePageModal from '../../components/DeletePageModal/DeletePageModal';
import { createPortal } from 'react-dom';

type Props = {
  page: Page;
  updateModule: (close: () => void) => Promise<void>;
};

const PageRow = ({ page, updateModule }: Props) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <td className='pl-16 text-left'>{page.pageNumber}</td>
      <td className='text-left'>{page.title}</td>
      <td>
        <span className='rounded-md border-2 border-green-200 bg-green-100 px-4 py-2 text-sm text-green-600'>
          Active
        </span>
      </td>
      <td className='flex items-center justify-center gap-4'>
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
          <UpdatePageModal
            close={() => setIsEditModalOpen(false)}
            updateModule={updateModule}
            page={page}
          />,
          document.body,
        )}
      {isDeleteModalOpen &&
        createPortal(
          <DeletePageModal
            close={() => setIsDeleteModalOpen(false)}
            updateModule={updateModule}
            page={page}
          />,
          document.body,
        )}
    </>
  );
};

export default PageRow;
