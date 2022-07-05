import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, List, Dropdown } from 'antd';
import { genrateFirstLetterName } from 'lib';
import { Button as CustomButton } from 'components';

export const Drafts = ({ setActive }) => {
  const { ticket } = useSelector((state) => state?.tickets);

  // Dropdown Menu
  const menu = (
    <>
      {[
        'Send and Mark Active',
        'Send and Mark Waiting',
        'Send and Mark Closed',
        'Send and Mark Closed & Locked',
        'Send and Schedule Follow-Up',
      ].map((el) => {
        return <Button onClick={() => {}}>{el}</Button>;
      })}
    </>
  );

  return (
    <>
      <div className={'ticket-list-wrap custom-table__table'}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 20,
          }}
          dataSource={ticket?.ticketComments}
          footer={''}
          renderItem={(item) => (
            <List.Item key={item.id} actions={''} extra={''}>
              <div
                id={item.id}
                className="p-[20px] border-[1px] rounded-[8px] border-[#323248]"
              >
                <div className={'w-full relative'}>
                  <div className="flex">
                    <div className="image w-[47px] rounded-[5px] overflow-hidden">
                      {item?.userImagePath ? (
                        <img
                          src={item?.userImagePath}
                          alt={item?.userFullName}
                        />
                      ) : (
                        <div className="bg-[#171723] text-[#0BB783]  px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                          {genrateFirstLetterName(item.userFullName)}
                        </div>
                      )}
                    </div>
                    <div className="meta ml-[16px]">
                      <div className="flex align-center">
                        <span className="text-[#fff] text-[16px]">
                          {item?.userFullName}
                        </span>
                        {item.createdBy === ticket.createdBy && (
                          <span className="bg-[#3A2434] p-[4px] text-[#F64E60] text-[10px] rounded-[4px] ml-[16px]">
                            AUTHOR
                          </span>
                        )}
                      </div>
                      <div className="text-[#474761] text-[14px]">1 Hour</div>
                    </div>
                  </div>
                  {ticket?.ticketStatus === 0 && (
                    <div className="flex items-center gap-[12px] text-[16px] absolute right-5 top-1">
                      <CustomButton
                        className="px-[16px] py-[5px] text-[14px] h-[36px]"
                        onClick={() => setActive('Communication')}
                      >
                        View
                      </CustomButton>
                      <Dropdown
                        overlay={menu}
                        overlayClassName="custom-table__table-dropdown-overlay"
                        className="custom-table__table-dropdown"
                        destroyPopupOnHide
                        placement="bottomRight"
                        trigger={['click', 'contextMenu']}
                      >
                        <CustomButton className="px-[16px] py-[5px] text-[14px] h-[36px]">
                          Send
                        </CustomButton>
                      </Dropdown>
                      <CustomButton className="px-[16px] py-[5px] text-[14px] h-[36px]">
                        Send and Pin
                      </CustomButton>
                      <CustomButton className="px-[16px] py-[5px] text-[14px] h-[36px]">
                        Delete
                      </CustomButton>
                    </div>
                  )}
                </div>
                <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">
                  {item?.commentText}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </>
  );
};
