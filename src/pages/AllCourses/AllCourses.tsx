import LeftSection from './LetfSection';
import MiddleSection from './MiddleSection';
import RightSection from './RightSection';

const AllCourses = () => {
  return (
    <div className='mx-auto grid max-w-7xl grid-cols-5 justify-between gap-8 py-40'>
      <LeftSection />
      <MiddleSection />
      <RightSection />
    </div>
  );
};

export default AllCourses;
