import axios from 'axios';
import { IoMdExit } from 'react-icons/io';
import { FormEvent, useEffect, useRef } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { Module } from '../../types/module';

type Props = {
  close: () => void;
  updateCourse: (close: () => void) => Promise<void>;
  module: Module;
};

const UpdateModuleModal = ({ close, updateCourse, module }: Props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descriptionInput = useRef<HTMLInputElement>(null);

  const {
    state: { user },
  } = useAppContext();

  useEffect(() => {
    titleInput.current!.value = module.title;
    descriptionInput.current!.value = module.description;
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = titleInput.current!.value;
    const description = descriptionInput.current!.value;

    await axios.put(
      `${import.meta.env.VITE_API_URL}/module/${module.id}`,
      { title, description },
      {
        headers: {
          Authorization: user?.token,
        },
      },
    );

    titleInput.current!.value = '';
    descriptionInput.current!.value = '';

    await updateCourse(close);
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
                Title
              </label>
              <input
                type='text'
                name='title'
                placeholder='Enter title'
                ref={titleInput}
                required
                className='focus:outline-primary-500-500 rounded-md border px-4 py-2 text-slate-500'
              />
            </fieldset>
            <fieldset className='flex w-full flex-col'>
              <label htmlFor='description' className='px-4 py-2'>
                Description
              </label>
              <input
                type='text'
                name='description'
                placeholder='Enter description'
                ref={descriptionInput}
                required
                className='focus:outline-primary-500-500 rounded-md border px-4 py-2 text-slate-500'
              />
            </fieldset>
            <div className='mt-4 w-full text-center'>
              <button className='mb-8 w-full rounded-lg border-2 border-primary-500 px-4 py-2 font-semibold hover:bg-primary-500 hover:text-slate-50'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateModuleModal;
