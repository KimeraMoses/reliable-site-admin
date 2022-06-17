import { useOutside } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Notifications.styles.scss';
import { Spin } from 'antd';
import {
  NewUserRegistered, TicketCreated, TickedUpdated,
  OrderCreated, OrderUpdated, TicketNewComments, TicketNewReply,
  CategoryGenerator, Bills
} from './sections';
import { groupBy } from 'lib';
//import { getNotifications } from 'store';

export function Notifications({ toggleNotification }) {
  const notificationRef = useRef(null);
 
  //const dispatch = useDispatch();
  useOutside(notificationRef, toggleNotification);
  //let page = 1;

  const { notifications, loading } = useSelector((state) => state?.notifications);
  const { user } = useSelector((state) => state?.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (notifications.length) {
      const dataToSet = groupBy(notifications, 'type');
      setData(dataToSet);
    }
  }, [notifications]);

  return (
    <div
      className={`notifications fixed top-0 right-0 w-6/12 bg-[#1E1E2D] text-white `} ref={notificationRef}>
      <div className={`text-xl p-[32px] border-b-2 border-current border-dashed border-[#474761]`}>Notiffications</div>
      <div className={`notifications-wrap px-[32px] pt-[32px] pb-[32px]`}>
        {
          loading || data === null ? (
            <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative text-center`}>
              <Spin
                size="large"
                style={{ gridColumn: '1/3', alignSelf: 'center' }}
              />
            </div>
          ) : (
            <>
              {
                Object.entries(data).map(([key, value]) => {
                  return (
                    <React.Fragment key={key}>
                      {
                        parseInt(key) === 0 ?
                          <NewUserRegistered value={value} user={user} /> : parseInt(key) === 1 ?
                            <TicketCreated value={value} user={user} /> : parseInt(key) === 2 ?
                              <TickedUpdated value={value} user={user} /> : parseInt(key) === 3 ?
                                <OrderCreated value={value} user={user} /> : parseInt(key) === 4 ?
                                  <OrderUpdated value={value} user={user} /> : parseInt(key) === 5 ?
                                    <TicketNewComments value={value} user={user} /> : parseInt(key) === 6 ?
                                      <TicketNewReply value={value} user={user} /> : parseInt(key) === 7 ?
                                        <CategoryGenerator value={value} user={user} /> : <Bills value={value} user={user} />
                      }

                    </React.Fragment>

                  )
                })
              }
              <div className={`fixed bottom-0 left-0 w-full p-[32px] border-t-2 border-current border-dashed border-[#474761] text-center`}>
                <Link to={''} className={`text-[#3699FF]`}>View All Notifications</Link>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}
