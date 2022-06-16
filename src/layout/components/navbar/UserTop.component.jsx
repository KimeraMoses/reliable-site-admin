import { Switch } from 'antd';
import { Input, Notifications } from 'components';
import { Formik } from 'formik';
import { useOutside } from 'hooks';
import { Right } from 'icons';
import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { logout } from 'store/Slices/authSlice';
import UserName from './UserProfileCard/UserName';
import './UserTop.css';

const DepartmentSelector = ({ name, value }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-[rgb(146,_146,_143)] text-[12px]">{name}</div>
      <Switch />
    </div>
  );
};

function UserTop() {
  const [dropdown, setDropdown] = useState(false);
  const [departments, setDepartments] = useState(false);
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const lessThanDesktop = useMediaQuery({
    query: '(max-width: 900px)',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(false);
  const links = [
    {
      name: 'Active Departments',
      Icon: <Right fill={departments ? '#3699ff' : '#494b74'} />,
      onClick: () => {
        setDepartments((dept) => !dept);
      },
      active: departments,
    },
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
        setNotifications((notificationValue) => !notificationValue);
      },
    },
    {
      name: 'Sign Out',
      onClick: () => dispatch(logout()),
    },
  ];

  const handleOutsideClick = () => {
    setDropdown(false);
    setDepartments(false);
  };
  const dropDownRef = useRef(null);
  useOutside(dropDownRef, handleOutsideClick);

  return (
    <div
      className="flex items-center cursor-pointer mr-4 relative"
      // onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
      ref={dropDownRef}
    >
      <Notifications
        visible={notifications}
        onClose={() => setNotifications(false)}
      />
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
        <div
          className={`w-[278px] bg-[#1E1E2D] shadow-lg ${
            departments ? '' : 'hidden'
          } rounded-lg text-gray-300`}
          style={{
            position: 'absolute',
            top: '214px',
            right: '-200px',
            zIndex: 4,
          }}
        >
          {/* Heading */}
          <div className="p-[20px] border-b-[1px] border-b-[#323248] cursor-auto text-white text-[14px]">
            Departments
          </div>
          <div className="p-[20px] flex flex-col gap-[20px]">
            <DepartmentSelector name="Department 1" value="2876ajsy1=21ejd" />
            <DepartmentSelector name="Department 2" value="2876ajsy1=21ejd" />
            <DepartmentSelector name="Department 3" value="2876ajsy1=21ejd" />
            <DepartmentSelector name="Department 4" value="2876ajsy1=21ejd" />
            <DepartmentSelector name="Department 5" value="2876ajsy1=21ejd" />
            <DepartmentSelector name="Department 6" value="2876ajsy1=21ejd" />
          </div>
        </div>
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
                {user?.base64Image ? (
                  <img
                    src={user?.base64Image}
                    alt={user.userName}
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
