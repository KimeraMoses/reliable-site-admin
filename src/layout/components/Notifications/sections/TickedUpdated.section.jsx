
import { Bell } from 'icons/Notifications/Bell.icon';
import moment from 'moment';
export const TickedUpdated = (data) => {
    return (
        <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
            <div className={`noti-icon`}>
                <Bell fill={'#fff'} />
            </div>
            <div className={`noti-content`}>
                <div className="flex justify-between">
                    <div className={`text-white`}>{data?.body}</div>
                    <div className={`flex`}>
                        <img src={data?.senderImage} className="w-[20px] h-[20px] object-cover rounded-[50%]" />
                        <div className={`text-[#474761] ml-2`}>{`${data?.senderName} added at ${moment(data.sentAt).format('hh:mm A')}`}</div>
                    </div>
                </div>
                <div className={`book-blocks`}>
                    {
                        data?.tasks?.map((task, i) => (
                            <div key={i} className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
                                <div className="flex items-center justify-between w-full">
                                    <div className="wid _1"><div className="text-[12px]">{task?.name}</div></div>
                                    <div className="wid _2"><div className="bg-txt text-[10px]">{task?.tag}</div></div>
                                    <div className="imgs">
                                        {
                                            task?.imgs?.map((img) => (
                                                <div className='img-single'>
                                                    <img src={img} alt='' />
                                                </div>
                                            ))
                                        }
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
                        ))
                    }
                </div>
            </div>
        </div>
    )
}