import { MdOutlineFiberNew } from 'react-icons/md';
import { FaRankingStar } from 'react-icons/fa6';
import { RiUserFollowFill } from 'react-icons/ri';
import { FaCode } from 'react-icons/fa6';
import { CiDollar } from 'react-icons/ci';
import { MdDesignServices } from 'react-icons/md';
import { BsBriefcaseFill } from 'react-icons/bs';

const LeftSection = () => {
  return (
    <div className='flex flex-col items-center justify-start gap-8'>
      <div className='flex w-full flex-col gap-2 rounded-lg px-2 py-4 shadow-2xl'>
        <div className='flex items-center justify-start gap-2 rounded-md hover:cursor-pointer hover:bg-slate-50'>
          <MdOutlineFiberNew size={40} color='green' />
          <div>
            <p className='text-sm'>Newest and Recent</p>
            <p className='text-xs text-slate-500'>Find the latest update</p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-2 rounded-md hover:cursor-pointer hover:bg-slate-50'>
          <FaRankingStar size={40} color='yellow' />
          <div>
            <p className='text-sm'>Popular of the day</p>
            <p className='text-xs text-slate-500'>
              Shots featured today by curators
            </p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-2 rounded-md hover:cursor-pointer hover:bg-slate-50'>
          <RiUserFollowFill size={40} color='red' />
          <div>
            <p className='text-sm'>Following</p>
            <p className='text-xs text-slate-500'>
              Explore from your favorite person
            </p>
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col gap-2 rounded-lg px-2 py-4 shadow-2xl'>
        <p>Popular Tags</p>
        <div className='flex items-center justify-start gap-2'>
          <FaCode size={40} color='yellow' />
          <div>
            <p className='text-sm'>#javascript</p>
            <p className='text-xs text-slate-500'>82,645 Posted by this tag</p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <CiDollar size={40} color='green' />
          <div>
            <p className='text-sm'>#bitcoin</p>
            <p className='text-xs text-slate-500'>65,523 Posted • Trending</p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <MdDesignServices size={40} color='blue' />
          <div>
            <p className='text-sm'>##design</p>
            <p className='text-xs text-slate-500'>
              51,354 • Trending in Bangladesh
            </p>
          </div>
        </div>
        <div className='flex items-center justify-start gap-2'>
          <BsBriefcaseFill size={40} color='red' />
          <div>
            <p className='text-sm'>#busieness</p>
            <p className='text-xs text-slate-500'>82,645 Posted by this tag</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftSection;
