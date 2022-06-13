
import { Bell } from 'icons/Notifications/Bell.icon';
import moment from 'moment';
export const OrderUpdated = (data) => {
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
            </div>
        </div>
    )
}