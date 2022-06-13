
import { Bell } from 'icons/Notifications/Bell.icon';
import moment from 'moment';


export function Bills({ value, user }) {
    return (
        <>
            {
                Object.keys(value).length === 1 ?
                    <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
                        <div className={`noti-icon`}>
                            <Bell fill={'#fff'} />
                        </div>
                        <div className={`noti-content`}>
                            <div className="flex justify-between">
                                <div className={`text-white`}>{value[0]?.body.replace("[[firstName]]", user.fullName)}</div>
                                <div className={`flex`}>
                                    <img src={value[0]?.userImage} className="w-[20px] h-[20px] object-cover rounded-[50%]" />
                                    <div className={`text-[#474761] ml-2`}>{`${value[0]?.fullName} added at ${moment(value[0].sentAt).format('hh:mm A')}`}</div>
                                </div>
                            </div>
                        </div>
                    </div> : <div className={`notification-block pl-[60px] pt-[13px] pb-[13px] relative`}>
                        <div className={`noti-icon`}>
                            <Bell fill={'#fff'} />
                        </div>
                        <div className={`noti-content`}>
                            <div className="flex justify-between">
                                <div className={`text-white`}>{`There are ${Object.keys(value).length} bills created.`}</div>
                                <div className={`flex`}>
                                    <img src={value?.senderImage} className="w-[20px] h-[20px] object-cover rounded-[50%]" />
                                    <div className={`text-[#474761] ml-2`}>{`${value?.senderName} added at ${moment(value?.sentAt).format('hh:mm A')}`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}