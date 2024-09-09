import { Link } from 'react-router-dom';
import studentPicture1 from '../../assets/StudentPicture1.png';
import studentPicture2 from '../../assets/StudentPicture2.png';
import Testimonial from './Testimonial';
import alumni1 from '../../assets/alumni-1.png';
import alumni2 from '../../assets/alumni-2.png';
import alumni3 from '../../assets/alumni-3.png';
import class1 from '../../assets/class-1.png';
import class2 from '../../assets/class-2.png';
import class3 from '../../assets/class-3.png';

const Home = () => {
  return (
    <>
      {/* -------------------- Hero Section -------------------- */}
      <div className='bg-gray-100'>
        <div className='mx-auto flex max-w-7xl items-center justify-between gap-40 px-20 py-40'>
          <div className='relative flex flex-col gap-4'>
            <h2 className='absolute -translate-x-12 -translate-y-12 text-9xl font-bold text-secondary-400'>
              RevLearn
            </h2>
            <h2 className='-translate-x-4 text-8xl font-bold'>RevLearn</h2>

            <h3 className='text-4xl'>new way to learn</h3>
            <p>
              RevLearn helps students to achieve their goals with the easist and
              the cheapest way. If you want to be part of this family. You can
              contact with us.
            </p>
            <div className='mt-4 flex items-center gap-16'>
              <Link
                to='/register'
                className='w-fit rounded-md bg-primary-500 px-8 py-2 text-slate-100'
              >
                Join Now
              </Link>
              <Link to='/contact' className='text-slate-400 underline'>
                Learn More
              </Link>
            </div>
          </div>
          <img src={studentPicture1} alt='student picture' />
        </div>
      </div>
      {/* -------------------- Hero Section -------------------- */}

      {/* ---------------- Testimonial Section --------------- */}
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-20 px-20 py-40'>
        <div className='flex flex-col gap-4'>
          <h3 className='text-3xl font-bold'>THE BEST WAY TO LEARN</h3>
          <p className='w-3/4'>
            We help our students with equipments, teachers and classes to get
            you to your ultimate college goals with ease. We provide true care
            into each and every member.
          </p>
        </div>
        <div className='flex items-center justify-between gap-12'>
          <Testimonial src={alumni1} />
          <Testimonial src={alumni2} />
          <Testimonial src={alumni3} />
        </div>
        <div className='flex items-center justify-between gap-16'>
          <img src={studentPicture2} alt='student picture' />
          <div className='flex flex-col gap-4'>
            <h3 className='text-3xl font-bold'>
              THOUSANDS OF STUDENTS ARE{' '}
              <span className='text-primary-500'>HAPPY</span>
            </h3>
            <p>
              Nascetur aenean massa auctor tincidunt. Iaculis potenti amet
              egestas ultrices consectetur adipiscing ultricies enim. Pulvinar
              fames vitae vitae quis. Quis amet vulputate tincidunt at in nulla
              nec. Consequat sed facilisis dui sit egestas ultrices tellus.
              Ullamcorper arcu id pretium sapien proin integer nisl. Felis orci
              diam odio.
            </p>
            <p>
              Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
              tellus quam porttitor. Mauris velit euismod elementum arcu neque
              facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
              enim mattis odio in risus nunc.
            </p>
            <div className='mt-4 flex items-center gap-16'>
              <Link
                to='/register'
                className='w-fit rounded-md bg-primary-500 px-8 py-2 text-slate-100'
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* ---------------- Testimonial Section --------------- */}
      <div className='bg-gray-100'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-20 px-20 py-40'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-3xl font-bold'>OUR CLASSES</h3>
            <p className='w-3/4'>
              Fringilla a sed at suspendisse ut enim volutpat. Rhoncus vel est
              tellus quam porttitor. Mauris velit euismod elementum arcu neque
              facilisi. Amet semper tortor facilisis metus nibh. Rhoncus sit
              enim mattis odio in risus nunc.
            </p>
          </div>
          <div className='flex gap-8'>
            <img src={class1} alt='class room' />
            <img src={class2} alt='class room' />
            <img src={class3} alt='class room' />
          </div>
        </div>
        <div className='bg-secondary-500 py-16'>
          <div className='mx-auto flex max-w-7xl items-center justify-between text-2xl font-bold text-slate-50'>
            <p>HARVARD</p>
            <p>EDINBURGH</p>
            <p>STANFORD</p>
            <p>PRINCETON</p>
            <p>OXFORD</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
