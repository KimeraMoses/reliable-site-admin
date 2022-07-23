// import { Switch } from 'antd';
// import { Input } from 'components';
// import { Formik } from 'formik';
import { useOutside } from 'hooks';
import { Right } from 'icons';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/Slices/authSlice';
import { Departments } from './Departments.component';
import UserName from './UserProfileCard/UserName';
import { getNotificationss, notificationsRead } from 'store';
import './UserTop.css';

function UserTop({ toggleNotification }) {
  const [dropdown, setDropdown] = useState(false);
  const [showDepartments, setShowDepartments] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state?.notifications);
  const [imgError, setImgError] = useState(false);
  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [notifications, setNotifications] = useState(false);
  const links = [
    // {
    //   name: 'Active Departments',
    //   Icon: <Right fill={showDepartments ? '#3699ff' : '#494b74'} />,
    //   onClick: () => {
    //     setShowDepartments((dept) => !dept);
    //   },
    //   active: showDepartments,
    // },
    {
      name: 'Account Settings',
      onClick: () => {
        setDropdown((dropdownValue) => !dropdownValue);
        navigate('/admin/dashboard/account-settings/general');
      },
    },
    {
      name: 'Notifications',
      onClick: () => {
        setDropdown((dropdownValue) => !dropdownValue);
        handleNotification();
      },
    },
    {
      name: 'Sign Out',
      onClick: () => {
        dispatch(logout());
        navigate('/admin/sign-in');
      },
    },
  ];

  const handleOutsideClick = () => {
    setDropdown(false);
    setShowDepartments(false);
  };
  const handleNotification = () => {
    toggleNotification(true);
    (async () => {
      await dispatch(
        getNotificationss({
          toUserId: user?.id,
        })
      );
    })();
  };

  useEffect(() => {
    if (notifications.length) {
      let ids = [];
      notifications
        ?.filter(function (el) {
          return el.isRead !== true;
        })
        ?.forEach((b) => {
          ids.push(b?.id);
        });
      if (ids.length) dispatch(notificationsRead(ids));
    }
  }, [notifications]);

  const dropDownRef = useRef(null);
  useOutside(dropDownRef, handleOutsideClick);

  return (
    <div
      className="flex items-center cursor-pointer mr-4 relative"
      // onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
      ref={dropDownRef}
    >
      {/* <Notifications
        visible={notifications}
        onClose={() => setNotifications(false)}
      /> */}
      <div className="h-12 w-12 rounded-lg border-2 border-[#3699FF] p-1 userName">
        {user?.base64Image ? (
          <img
            src={user?.base64Image}
            alt={user.userName}
            className="h-full w-full"
          />
        ) : (
          <>{user && <UserName isLoggedIn={isLoggedIn} user={user} />}</>
        )}
        {/* Departments Dropdown */}
        <Departments showDepartments={showDepartments} />
        {/* Dropdown */}
        <div
          className={`w-[278px] bg-[#1E1E2D] ${
            dropdown ? '' : 'hidden'
          } rounded-lg text-gray-300`}
          style={{
            position: 'absolute',
            top: '58px',
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
                {user && user.base64Image && !imgError ? (
                  // !showName
                  <img
                    src={user?.base64Image}
                    alt={user.userName}
                    onError={() => setImgError(true)}
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
            {links?.map(({ onClick, name, Icon, active }, index) => (
              <p
                className={`pt-[20px] px-[20px] ${
                  active ? 'text-[#3699FF]' : 'text-[#92928F]'
                } flex items-center justify-between hover:text-[#3699FF] transition-all text-[14px] last:pb-[20px]`}
                onClick={onClick}
                key={name}
              >
                <span>{name}</span>
                {Icon}
              </p>
            ))}
          </div>
        </div>
      </div>
      {!lessThanDesktop && (
        <>
          <div
            className="text-base mx-3"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <h3 className="text-white text-base mb-0">
              {user && user.fullName}
            </h3>
            <p className="text-gray-400 mb-0">{user && user.email}</p>
          </div>
          <div
            className="h-12 w-12 bg-[#323248] flex items-center justify-center rounded-lg relative"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <img src="/icon/arrow-down.svg" alt="" />
          </div>
        </>
      )}
    </div>
  );
}

export default UserTop;
