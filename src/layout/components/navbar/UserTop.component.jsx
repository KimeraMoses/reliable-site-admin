import { useOutside } from 'hooks';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/Slices/authSlice';
import UserName from './UserProfileCard/UserName';
import { getNotifications, notificationsRead } from 'store';
import './UserTop.css';

function UserTop({ toggleNotification }) {
  const [dropdown, setDropdown] = useState(false);
  const [showName, setShowName] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state?.notifications);
  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    {
      name: 'Settings',
      onClick: () => {
        setDropdown((dropdownValue) => !dropdownValue);
        navigate('/admin/dashboard/account-settings/general');
      },
    },
    {
      name: 'Notifications',
      onClick: () => {
        handleNotification();
      },
    },
    {
      name: 'Sign Out',
      onClick: () => dispatch(logout()),
    },
  ];

  const handleNotification = () => {
    toggleNotification(true);
    (async () => {
      await dispatch(getNotifications({
        toUserId: user?.id
      }));
    })();
  }

  useEffect(() => {
    if (notifications.length) {
      let ids = [];
      notifications?.filter(function (el) { return el.isRead !== true })?.map((b) => {
        ids.push(b?.id);
      });
      if (ids.length)
        dispatch(notificationsRead(ids));
    }
  }, [notifications]);

  const handleOutsideClick = () => setDropdown(false);
  const dropDownRef = useRef(null);
  useOutside(dropDownRef, handleOutsideClick);

  return (
    <div
      className="flex items-center cursor-pointer mr-4 relative"
      onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
      ref={dropDownRef}
    >
      <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName">
        {user && user.imageUrl && user.imageUrl.length > 0 && !showName ? (
          <img
            src={user && user.imageUrl}
            alt={user && user.userName}
            className="h-full w-full"
            onLoad={() => setShowName(false)}
            onError={() => setShowName(true)}
          />
        ) : (
          <>{user && <UserName isLoggedIn={isLoggedIn} user={user} />}</>
        )}
        {/* Dropdown */}
        <div
          className={`w-[278px] bg-[#1E1E2D] ${dropdown ? '' : 'hidden'
            } rounded-lg text-gray-300`}
          style={{
            position: 'absolute',
            bottom: '-254px',
            right: 0,
            boxShadow: '0px 0px 40px #00000066',
            zIndex: 2,
          }}
        >
          {/* Name and Email Box */}
          <div className="p-[20px] border-b-[1px] border-b-[#323248] cursor-auto">
            <div className="flex items-start justify-between">
              {/* Image + Status */}
              <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName">
                {user &&
                  user.imageUrl &&
                  user.imageUrl.length > 0 &&
                  !showName ? (
                  <img
                    src={user && user.imageUrl}
                    alt={user && user.userName}
                    onLoad={() => setShowName(false)}
                    onError={() => setShowName(true)}
                    className="h-full w-full"
                  />
                ) : (
                  <>
                    {user && <UserName isLoggedIn={isLoggedIn} user={user} />}
                  </>
                )}
              </div>
              <div className="bg-[#1C3238] px-[8px] py-[4px] rounded-[4px] ">
                <p className="text-[#0BB783] text-[14px]">Active</p>
              </div>
            </div>
            <div className="mt-[20px]">
              {/* onClick={() => dispatch(logout())} */}
              <h3 className="text-white text-[14px] mb-0">{user?.fullName}</h3>
              <h3 className="text-[#92928F] text-[14px] mb-0">{user?.email}</h3>
            </div>
          </div>
          <div>
            {links?.map((link, index) => (
              <p
                className="pt-[20px] px-[20px] text-[#92928F] hover:text-[#3699FF] transition-all text-[14px] last:pb-[20px]"
                onClick={link?.onClick}
                key={link?.name}
              >
                {link?.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      {!lessThanDesktop && (
        <>
          <div className="text-base mx-3">
            <h3 className="text-white text-base mb-0">
              {user && user.fullName}
            </h3>
            <p className="text-gray-400 mb-0">{user && user.email}</p>
          </div>
          <div className="h-12 w-12 bg-[#323248] flex items-center justify-center rounded-lg relative">
            <img src="/icon/arrow-down.svg" alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default UserTop;
