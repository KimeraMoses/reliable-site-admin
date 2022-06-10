import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Notifications.styles.scss';
import { Bell } from 'icons/Notifications/Bell.icon';
import { Book } from 'icons/Notifications/Book.icon';

export function Notifications({ toggleNotification }) {

  return (
    <div className={`notifications absolute top-0 right-0 w-6/12 h-full bg-[#1E1E2D] text-white`}>
      <div className={`text-xl p-[32px] border-b-2 border-current border-dashed border-[#474761]`}>Notiffications</div>
      <div className={`notifications-wrap px-[32px] pt-[32px]`}>
        <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
          <div className={`noti-icon`}>
            <Bell fill={'#fff'} />
          </div>
          <div className={`noti-content`}>
            <div className="flex justify-between">
              <div className={`text-white`}>There Are 2 New Tasks For You In Air Plus Mobile App</div>
              <div className={`flex`}>
                <div className={`ur-icon`}></div>
                <div className={`text-[#474761] ml-2`}>Paul Elliott added at 4:23 PM</div>
              </div>
            </div>
            <div className={`book-blocks`}>
              <div className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
                <div className="flex items-center justify-between w-full">
                  <div className="wid _1"><div className="text-[12px]">Meeting With Customer</div></div>
                  <div className="wid _2"><div className="bg-txt text-[10px]">APPLICATION DESIGN</div></div>
                  <div className="imgs">
                    <div className='img-single'>
                      <img src='https://dummyimage.com/40x40/000/fff' alt='' />
                    </div>
                    <div className='img-single'>
                      <img src='https://dummyimage.com/40x40/000/fff' alt='' />
                    </div>
                    <div className='img-single'>
                      <img src='https://dummyimage.com/40x40/000/fff' alt='' />
                    </div>
                  </div>
                  <div className="book-status text-[10px]"><span>IN PROGRESS</span></div>
                  <div className="btn-wrap">
                    <button
                      type="button"
                      className="ant-btn ant-btn-default py-[12px] px-[24px] border-0 rounded-[4px] bg-[#323248] text-[#fff] text-[14px]"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
              <div className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
                <div className="flex items-center justify-between w-full">
                  <div className="wid _1"><div className="text-[12px]">Project Delivery Preperation</div></div>
                  <div className="wid _2"><div className="bg-txt text-[10px]">CRM SYSTEM DEVELOPMENT</div></div>
                  <div className="imgs">
                    <div className='img-single'>
                      <img src='https://dummyimage.com/40x40/000/fff' alt='' />
                    </div>
                    <div className='img-single'>
                      <img src='https://dummyimage.com/40x40/000/fff' alt='' />
                    </div>
                    <div className='img-single'>
                      <img src='https://dummyimage.com/40x40/000/fff' alt='' />
                    </div>
                  </div>
                  <div className="book-status text-[10px]"><span>IN PROGRESS</span></div>
                  <div className="btn-wrap">
                    <button
                      type="button"
                      className="ant-btn ant-btn-default py-[12px] px-[24px] border-0 rounded-[4px] bg-[#323248] text-[#fff] text-[14px]"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
          <div className={`noti-icon`}>
            <Bell fill={'#fff'} />
          </div>
          <div className={`noti-content`}>
            <div className="flex justify-between">
              <div className={`text-white`}>Invitation For Crafting Engaging Designs That Speak Human Workshop</div>
              <div className={`flex`}>
                <div className={`ur-icon`}></div>
                <div className={`text-[#474761] ml-2`}>Paul Elliott added at 4:23 PM</div>
              </div>
            </div>
          </div>
        </div>
        <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
          <div className={`noti-icon`}>
            <Bell fill={'#fff'} />
          </div>
          <div className={`noti-content`}>
            <div className="flex justify-between">
              <div className={`text-white`}>3 New Incoming Project Files</div>
              <div className={`flex`}>
                <div className={`ur-icon`}></div>
                <div className={`text-[#474761] ml-2`}>Paul Elliott added at 4:23 PM</div>
              </div>
            </div>
            <div className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
              <div className="flex">
                <div className={`book-icon`}>
                  <Book fill={'#fff'} />
                </div>
                <div className=''>
                  <Link className={`text-[#1890ff]`} to={''}>Finance KPI App Guidelines</Link>
                  <div className={`file-size text-[#474761]`}>2 MB</div>
                </div>
              </div>
            </div>
            <div className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
              <div className="flex">
                <div className={`book-icon`}>
                  <Book fill={'#fff'} />
                </div>
                <div className=''>
                  <Link className={`text-[#1890ff]`} to={''}>Client UAT Testing Results</Link>
                  <div className={`file-size text-[#474761]`}>2 MB</div>
                </div>
              </div>
            </div>
            <div className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
              <div className="flex">
                <div className={`book-icon`}>
                  <Book fill={'#fff'} />
                </div>
                <div className=''>
                  <Link className={`text-[#1890ff]`} to={''}>Finance Reports</Link>
                  <div className={`file-size text-[#474761]`}>2 MB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
          <div className={`noti-icon`}>
            <Bell fill={'#fff'} />
          </div>
          <div className={`noti-content`}>
            <div className="flex justify-between">
              <div className={`text-white`}>Task <Link className={`text-[#1890ff]`} to={''}>#45890</Link> Merged With <Link className={`text-[#1890ff]`} to={''}>#45890</Link> In Ads Pro Admin Dashboard Project</div>
              <div className={`flex`}>
                <div className={`ur-icon`}></div>
                <div className={`text-[#474761] ml-2`}>Paul Elliott added at 4:23 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
