import { FormEvent, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Page } from '../../types/page';
import { IoMdExit } from 'react-icons/io';
import axios from 'axios';

type Props = {
  close: () => void;
  updateModule: (close: () => void) => Promise<void>;
  page: Page;
};

const DeletePageModal = ({ close, updateModule, page }: Props) => {
  const [title, setTitle] = useState('');

  const {
    state: { user },
  } = useAppContext();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await axios.delete(`${import.meta.env.VITE_API_URL}/page/${page.id}`, {
      headers: {
        Authorization: user?.token,
      },
    });

    setTitle('');

    await updateModule(close);
  }

  return (
    <>
      <div className='fixed bottom-0 left-0 right-0 top-0 bg-slate-500 bg-opacity-50'>
        <div className='fixed left-1/2 top-1/2 flex w-1/3 -translate-x-1/2 -translate-y-1/2 flex-col rounded-md bg-slate-50 p-8'>
          <IoMdExit
            onClick={close}
            className='self-end text-primary-500 hover:scale-125 hover:cursor-pointer'
            size={32}
          />
          <form
            onSubmit={handleSubmit}
            className='relative flex flex-col items-center justify-evenly gap-8 px-12 py-16 text-xl text-primary-500'
          >
            <h1 className='text-4xl font-bold text-primary-500'>Edit Module</h1>
            <fieldset className='flex w-full flex-col'>
              <label htmlFor='title' className='px-4 py-2'>
                Enter Title: {page.title} to DELETE
              </label>
              <input
                type='text'
                name='title'
                placeholder='Enter title'
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className='focus:outline-primary-500-500 rounded-md border px-4 py-2 text-slate-500'
              />
            </fieldset>
            <div className='mt-4 w-full text-center'>
              <button
                className='mb-8 w-full rounded-lg border-2 border-primary-500 px-4 py-2 font-semibold hover:bg-primary-500 hover:text-slate-50 disabled:border-slate-500 disabled:text-slate-500 disabled:hover:bg-slate-50'
                disabled={title !== page.title}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeletePageModal;
