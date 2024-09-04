import { MdOutlineOndemandVideo } from 'react-icons/md';

const ModulePage = () => {
  return (
    <div className='p-4'>
      <div className='flex items-center gap-2'>
        <input type='checkbox' name='1' className='checked:bg-primary-500' />
        <label htmlFor='1'>Intro to the Course.What's coming up?</label>
      </div>
      <div className='flex items-center gap-2 px-8'>
        <MdOutlineOndemandVideo />
        <p>4min</p>
      </div>
    </div>
  );
};

export default ModulePage;
