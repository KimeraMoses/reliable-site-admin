
import { Bell } from 'icons/Notifications/Bell.icon';
import moment from 'moment';
import { Book } from 'icons/Notifications/Book.icon';
import { Link } from 'react-router-dom';
export const CategoryGenerator = (data) => {
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
                {
                    data?.projects?.map((project, i) => (
                        <div key={i} className={`book-block p-[16px] border-1 border-current border-dashed border-[#474761]`}>
                            <div className="flex">
                                <div className={`book-icon`}>
                                    <img src={project?.img} className="w-[20px] h-[20px] object-cover rounded-[50%]" />

                                </div>
                                <div className=''>
                                    <Link className={`text-[#1890ff]`} to={''}>{project.name}</Link>
                                    <div className={`file-size text-[#474761]`}>{project.tag}</div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
        </div>
    )
}