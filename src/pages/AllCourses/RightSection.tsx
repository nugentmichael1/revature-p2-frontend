import { FaArrowRight } from 'react-icons/fa';
import PodcastCard from './PodcastCard';

const RightSection = () => {
  return (
    <div>
      <div className='flex flex-col items-start gap-2 px-2 py-4 shadow-2xl'>
        <div className='flex items-center gap-2'>
          <h3>Podcast</h3>
          <FaArrowRight />
        </div>
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
      </div>
    </div>
  );
};

export default RightSection;
