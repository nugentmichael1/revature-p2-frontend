import { useEffect, useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../types/jwtpayload';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {
    state: { user },
    setUser,
  } = useAppContext();

  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const res = await axios.post(
      'http://localhost:8080/api/v1/user/login',
      data,
    );
    const token = jwtDecode<JwtPayload>(res.data.accessToken);
    const userId = Number(token.sub);
    if (token) {
      if (isNaN(userId)) {
        console.log('Invalid JWT subject');
      } else {
        setUser({
          id: userId,
          username: token.username,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role.toUpperCase() as
            | 'STUDENT'
            | 'EDUCATOR'
            | 'INSTITUTION',
        });
      }
    } else {
      console.log('Invalid token.');
    }
    console.log(`Logged in as username: ${username}`);
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };
  
  const handleUsernameChange = handleInputChange(setUsername);
  const handlePasswordChange = handleInputChange(setPassword);

  useEffect(() => {
    if (user && user.username) {
      nav('/dashboard');
    }
  }, [user, nav]);

  return (
    <>
      <div className='flex items-start justify-between rounded-t border-b p-5'>
        <h3 className='text-xl font-semibold text-gray-900'>Sign In</h3>
      </div>

      <div className='space-y-6 p-6'>
        <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit}>
          <div className='col-span-1'>
            <label
              htmlFor='username'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Username
            </label>
            <input
              id='username'
              type='text'
              placeholder='Enter username...'
              required
              onChange={handleUsernameChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
          </div>

          <div className='col-span-1'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              required
              onChange={handlePasswordChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
          </div>

          <div className='col-span-1'>
            <button
              type='submit'
              className='mt-5 w-full rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
