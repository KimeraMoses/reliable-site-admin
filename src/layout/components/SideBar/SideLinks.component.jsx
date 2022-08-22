import React from "react";
import { string } from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";

function SideLinks({
  name,
  path,
  icon,
  hideSide,
  hideInSide,
  count,
  subLinks,
}) {
  const { pathname } = useLocation();
  const isActive =
    name === "Dashboard" ? pathname === path : pathname.includes(path);
  return (
    <>
      {!hideInSide ? (
        <li>
          <Link
            to={path}
            className={`${
              isActive ? "bg-[#1B1B28] text-white" : ""
            } pt-3 pb-2 flex text-gray-500 no-underline hover:text-white hover:bg-black/[.2] ease-in duration-100 px-4`}
          >
            {icon(isActive ? "#3699ff" : "#494b74")}
            <div className="flex items-center gap-[12px]">
              <span
                className={`${hideSide ? "hidden" : "inline"} transition-all`}
              >
                &nbsp; {name}
              </span>
              <Badge pill bg="primary">
                {count}
              </Badge>
            </div>
          </Link>
          {!hideSide && subLinks?.length && (
            <ul
              className={`sublinks text-gray-500 ${
                isActive ? "bg-[#1B1B28]" : ""
              }`}
            >
              {subLinks?.map(
                (link) =>
                  link?.show && (
                    <li>
                      <NavLink
                        to={link?.path}
                        className={({ isActive }) =>
                          (isActive ? `text-[#3699FF] ` : "text-gray-500 ") +
                          ` no-underline hover:bg-[#1b1b2b] hover:text-[#3699FF] ease-in duration-100 py-2`
                        }
                      >
                        <div className="flex items-center gap-[12px]">
                          <span
                            className={`${
                              hideSide ? "hidden" : "inline"
                            } transition-all`}
                          >
                            &nbsp; {link?.name}
                          </span>
                          <Badge pill bg="primary">
                            {link?.count}
                          </Badge>
                        </div>
                      </NavLink>
                      {/* {!hideSide && link?.subLinks?.length && (
                        <ul
                          className={`sublinks text-gray-500 ${
                            isActive ? "bg-[#1B1B28]" : ""
                          }`}
                        >
                          {link?.subLinks?.map(
                            (link) =>
                              link?.show && (
                                <li>
                                  <NavLink
                                    to={link?.path}
                                    className={({ isActive }) =>
                                      (isActive
                                        ? `text-[#3699FF] `
                                        : "text-gray-500 ") +
                                      ` no-underline hover:bg-[#1b1b2b] hover:text-[#3699FF] ease-in duration-100 py-2`
                                    }
                                  >
                                    <div className="flex items-center gap-[12px]">
                                      <span
                                        className={`${
                                          hideSide ? "hidden" : "inline"
                                        } transition-all`}
                                      >
                                        &nbsp; {link?.name}
                                      </span>
                                      <Badge pill bg="primary">
                                        {link?.count}
                                      </Badge>
                                    </div>
                                  </NavLink>
                                </li>
                              )
                          )}
                        </ul>
                      )} */}
                    </li>
                  )
              )}
            </ul>
          )}
        </li>
      ) : (
        <></>
      )}
    </>
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
