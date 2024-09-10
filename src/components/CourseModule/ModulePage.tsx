import { MdOutlineOndemandVideo } from 'react-icons/md';
import { Page } from '../../types/page';

type Props = {
  page: Page;
};

const ModulePage = ({ page }: Props) => {
  return (
    <div className='bg-slate-50 p-4 text-sm'>
      <div className='flex items-center gap-2'>
        <input type='checkbox' name='1' className='checked:bg-primary-500' />
        <label htmlFor='1'>{page.title}</label>
      </div>
      <div className='flex items-center gap-2 px-4'>
        <MdOutlineOndemandVideo />
        <p>4min</p>
      </div>
    </div>
  );
};

export default ModulePage;
