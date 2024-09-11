import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../contexts/AppContext';

const Profile: React.FC = () => {
  const {
    state: { user },
    setUser,
  } = useAppContext();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(newConfirmPassword === newPassword);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const data = {
        firstName,
        lastName,
        oldPassword: password ? password : null,
        newPassword: newPassword ? newPassword : null,
      };

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/${user?.id}`,
        data,
      );

      if (user) {
        setUser({
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          role: user.role as 'STUDENT' | 'EDUCATOR',
          token: user.token,
        });
      }
      setSuccess('Profile updated successfully.');
    } catch (e: any) {
      setError(
        e.response?.data?.message ||
          'An error occurred while updating profile.',
      );
    }
  };

  return (
    <div className='min-h-screen'>
      <div className='relative m-10 mx-auto max-w-lg rounded-lg border border-4 bg-white p-6 shadow'>
        <div className='flex items-start justify-between rounded-t border-b p-5'>
          <h3 className='text-xl font-semibold text-gray-900'>{`Welcome, ${user?.firstName} ${user?.lastName}`}</h3>
        </div>
        <form className='space-y-6' onSubmit={handleUpdateProfile}>
          <div className='grid grid-cols-2 gap-6'>
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
                value={user?.username}
                readOnly
                disabled
                className='block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-600 shadow-sm sm:text-sm'
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
                value={user?.email}
                readOnly
                disabled
                className='block w-full rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-gray-600 shadow-sm sm:text-sm'
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
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm sm:text-sm'
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
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 shadow-sm sm:text-sm'
              />
            </div>

            <div className='col-span-2'>
              <button
                type='button'
                onClick={() => setShowPasswordFields(!showPasswordFields)}
                className='w-full rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200'
              >
                {showPasswordFields
                  ? 'Hide Password Fields'
                  : 'Update Password?'}
              </button>
            </div>

            {showPasswordFields && (
              <>
                <div className='relative col-span-2'>
                  <label
                    htmlFor='password'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Current Password
                  </label>
                  <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900 shadow-sm sm:text-sm'
                  />
                </div>

                <div className='relative col-span-2'>
                  <label
                    htmlFor='newPassword'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    New Password
                  </label>
                  <input
                    id='newPassword'
                    type='password'
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900 shadow-sm sm:text-sm'
                  />
                </div>

                <div className='relative col-span-2'>
                  <label
                    htmlFor='confirmPassword'
                    className='mb-2 block text-sm font-medium text-gray-900'
                  >
                    Confirm Password
                  </label>
                  <input
                    id='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`block w-full rounded-lg border p-2.5 text-gray-900 shadow-sm sm:text-sm ${passwordsMatch ? 'border-gray-300 bg-gray-50' : 'border-red-500 bg-red-50'}`}
                  />
                  {!passwordsMatch && (
                    <p className='text-sm text-red-500'>
                      Passwords must match.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <button
            type='submit'
            className='mt-5 w-full rounded-lg bg-secondary-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-secondary-700 focus:ring-4 focus:ring-secondary-200'
          >
            Update Profile
          </button>

          {error && <p className='text-red-500'>{error}</p>}
          {success && <p className='text-green-500'>{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
