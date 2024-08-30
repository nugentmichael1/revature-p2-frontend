import { useEffect, useState } from 'react';
import PasswordStrengthMeter from '../PasswordStrengthMeter/PasswordStrengthMeter';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'EDUCATOR'>('STUDENT');
  const {
    state: { user },
    setUser,
  } = useAppContext();

  const nav = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password1 != password2) {
      console.log('passwords do not match');
    } else if (role === "STUDENT" || role === "EDUCATOR"){
      // TODO: axios request
      setUser({
        id: 0,
        username: username,
        email: email,
        password: password1,
        role: role,
      });
      console.log(`Registered as a ${role} with username: ${username}`);
    } else {
        console.log('Invalid role attempted to be sent.')
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'STUDENT' | 'EDUCATOR';
    if (value === 'STUDENT' || value === 'EDUCATOR') {
      setRole(value);
    } else {
      console.log('Invalid role selected');
    }
  };

  useEffect(() => {
    if (user && user.username) {
      nav('/dashboard');
    }
  }, [user, nav]);

  return (
    <>
      <div className='flex items-start justify-between rounded-t border-b p-5'>
        <h3 className='text-xl font-semibold text-gray-900'>Sign Up</h3>
      </div>

      <div className='space-y-6 p-6'>
        <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit}>
          <div className='col-span-1'>
            <label
              htmlFor='email'
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
              htmlFor='password1'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <input
              id='password1'
              type='password'
              required
              onChange={handlePassword1Change}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
            <PasswordStrengthMeter password={password1} />
          </div>

          <div className='col-span-1'>
            <label
              htmlFor='password2'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Confirm Password
            </label>
            <input
              id='password2'
              type='password'
              required
              onChange={handlePassword2Change}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
          </div>

          <div className='col-span-1'>
            <label
              htmlFor='role'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Register As
            </label>
            <select
              id='role'
              value={role}
              onChange={handleRoleChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            >
              <option value='STUDENT'>Student</option>
              <option value='EDUCATOR'>Educator</option>
            </select>
          </div>

          <div className='col-span-1'>
            <button
              type='submit'
              className='mt-5 w-full rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200'
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
