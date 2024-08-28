import javaScriptLogo from '../../assets/JavaScript-logo.png';
import { FaArrowRight } from 'react-icons/fa';

const PodcastCard = () => {
  return (
    <div className='flex items-center gap-2'>
      <img src={javaScriptLogo} alt='podcast thumbnail' className='w-12' />
      <div className='w-fit text-xs'>
        <p>Selling a Business and Scaling Another Amidst Tragedy.</p>
        <p className='text-slate-400'>by Michele Hansen</p>
      </div>
      <FaArrowRight />
    </div>
  );
};
export default PodcastCard;
