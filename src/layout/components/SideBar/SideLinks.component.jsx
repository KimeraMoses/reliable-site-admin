import React from 'react';
import { string } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function SideLinks({ name, path, icon, hideSide }) {
  const { pathname } = useLocation();
  const isActive =
    name === 'Dashboard' ? pathname === path : pathname.includes(path);
  return (
    <li>
      <Link
        to={path}
        className={`${
          isActive ? 'bg-[#1B1B28] text-white' : ''
        } py-3 mb-2 flex text-gray-500 no-underline hover:text-white hover:bg-black/[.2] ease-in duration-100 px-4`}
      >
        {icon(isActive ? '#3699ff' : '#494b74')}
        <span className={`${hideSide ? 'hidden' : 'inline'} transition-all`}>
          &nbsp; {name}
        </span>
      </Link>
    </li>
  );
}

SideLinks.propTypes = {
  name: string.isRequired,
  path: string.isRequired,
};

// SideLinks.defaultProps = {
//   name: 'Link',
//   path: '/',
// };

export default SideLinks;
