import { useEffect, useState } from 'react';
import PasswordStrengthMeter from '../PasswordStrengthMeter/PasswordStrengthMeter';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { JwtPayload } from '../../types/jwtpayload';
import { jwtDecode } from 'jwt-decode';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'EDUCATOR'>('STUDENT');
  const {
    state: { user },
    setUser,
  } = useAppContext();

  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password1 !== password2) {
      return setPasswordsMatch(false);
    } else if (role === 'STUDENT' || role === 'EDUCATOR') {
      const data = {
        username: username,
        email: email,
        password: password1,
        firstName: firstName,
        lastName: lastName,
        role: role,
      };
      try {
        const res = await axios.post(
          'http://localhost:8080/api/v1/user/register',
          data,
        );
        console.log(res.data);
        const token = jwtDecode<JwtPayload>(res.data.JWT);
        const userId = Number(token.sub);
        setUser({
          id: userId,
          username: token.username,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role.toUpperCase() as
              | 'STUDENT'
              | 'EDUCATOR',
          token: `Bearer ${res.data.JWT}`,
        });
      } catch (e: any) {
        console.log(e);
        if (axios.isAxiosError(e) && e.response) {
          setErrorMsg(e.message || e.response.data.message || e.response.data || 'An error occurred.');
        } else {
          setErrorMsg(e.message || 'An unexpected error occured.');
        }
      }
    } else {
      setErrorMsg('Invalid role attempted to be sent.');
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleUsernameChange = handleInputChange(setUsername);
  const handleEmailChange = handleInputChange(setEmail);
  const handleFirstNameChange = handleInputChange(setFirstName);
  const handleLastNameChange = handleInputChange(setLastName);
  const handlePassword1Change = handleInputChange(setPassword1);
  const handlePassword2Change = handleInputChange(setPassword2);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'STUDENT' | 'EDUCATOR';
    if (value === 'STUDENT' || value === 'EDUCATOR') {
      setRole(value);
    } else {
      setErrorMsg('Invalid role selected');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
        <form className='grid grid-cols-2 gap-6' onSubmit={handleSubmit}>
          <div className='col-span-2'>
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

          <div className='col-span-2'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              placeholder='name@email.com'
              required
              onChange={handleEmailChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
          </div>

          <div className='col-span-1'>
            <label
              htmlFor='firstName'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              First Name
            </label>
            <input
              id='firstName'
              type='text'
              placeholder='John'
              required
              onChange={handleFirstNameChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
          </div>
          <div className='col-span-1'>
            <label
              htmlFor='lastName'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Last Name
            </label>
            <input
              id='lastName'
              type='text'
              placeholder='Doe'
              required
              onChange={handleLastNameChange}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
          </div>

          <div className='relative col-span-2'>
            <label
              htmlFor='password1'
              className='mb-2 block text-sm font-medium text-gray-900'
            >
              Password
            </label>
            <input
              id='password1'
              type={passwordVisible ? 'text' : 'password'}
              minLength={6}
              required
              onChange={handlePassword1Change}
              className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
            />
            <div
              className='absolute inset-y-0 bottom-3.5 right-3 flex cursor-pointer items-center'
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <EyeIcon className='h-5 w-5 text-gray-500' />
              ) : (
                <EyeSlashIcon className='h-5 w-5 text-gray-500' />
              )}
            </div>
            <PasswordStrengthMeter password={password1} />
          </div>

          <div className='col-span-2 -mt-4'>
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
              // className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm'
              className={`block w-full rounded-lg border p-2.5 text-gray-900 shadow-sm focus:border-secondary-600 focus:ring-secondary-600 sm:text-sm ${passwordsMatch ? 'border-gray-300 bg-gray-50' : 'border-red-500 bg-red-50'}`}
            />
            {!passwordsMatch && (
              <p className='text-red-500'>Passwords must match.</p>
            )}
          </div>

          <div className='col-span-2'>
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

          <div className='col-span-2'>
            <button
              type='submit'
              className='mt-5 w-full rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200'
            >
              Sign Up
            </button>
          </div>
          <p className='col-span-2 block text-sm font-medium text-center text-red-700'>{errorMsg}</p>

        </form>
      </div>
    </>
  );
}
