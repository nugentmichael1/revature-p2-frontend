import { useEffect, useState } from 'react';
import Register from '../../components/Register/Register';
import SignIn from '../../components/SignIn/SignIn';
import { useLocation } from 'react-router-dom';

export default function SignInRegister() {
  const [register, setRegister] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath === '/login') {
      setRegister(false);
    } else {
      setRegister(true);
    }
  }, [location]);

  return (
    <div className='min-h-screen'>
      <div className='relative m-10 mx-auto max-w-lg rounded-lg border border-4 bg-white shadow'>
        {register ? (
          <div>
            <Register />
            <div className='mt-4 flex justify-center'>
              <p className='mb-2 text-center'>
                Already have an account?
                <span
                  className='cursor-pointer text-secondary-500'
                  onClick={() => setRegister(!register)}
                >
                  {' '}
                  <u>Sign In</u>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <SignIn />
            <div className='mt-4 flex justify-center'>
              <p className='mb-2 text-center'>
                Don't have an account?
                <span
                  className='cursor-pointer text-secondary-500'
                  onClick={() => setRegister(!register)}
                >
                  {' '}
                  <u>Sign Up</u>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
