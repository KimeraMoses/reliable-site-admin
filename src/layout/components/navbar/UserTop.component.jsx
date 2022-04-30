import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { logout } from 'store/Slices/authSlice';
import UserName from './UserProfileCard/UserName';
import './UserTop.css';

function UserTop() {
  const [dropdown, setDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const dispatch = useDispatch();

  return (
    <div className="flex items-center cursor-pointer mr-4 relative">
      <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName">
        {user && user.imageUrl && user.imageUrl.length > 0 ? (
          <img
            src={user && user.imageUrl}
            alt={user && user.userName}
            className="h-full w-full"
          />
        ) : (
          <UserName />
        )}
      </div>
      {!lessThanDesktop && (
        <>
          <div className="text-base mx-3">
            <h3 className="text-white text-base mb-0">
              {user && user.fullName}
            </h3>
            <p className="text-gray-400 mb-0">{user && user.email}</p>
          </div>
          <div
            className="h-12 w-12 bg-gray-700 flex items-center justify-center rounded-lg relative"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <img src="/icon/arrow-down.svg" alt="" />
          </div>
          <div
            className={`h-12 w-[150px] bg-gray-700 ${
              dropdown ? '' : 'hidden'
            } rounded-lg flex items-center justify-center text-gray-300`}
            style={{
              position: 'absolute',
              bottom: '-50px',
              right: 0,
            }}
            onClick={() => dispatch(logout())}
          >
            Logout
          </div>
        </>
      )}
    </div>
  );
}

export default UserTop;
