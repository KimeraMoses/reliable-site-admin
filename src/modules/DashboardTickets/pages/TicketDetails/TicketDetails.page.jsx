import { NavLink } from 'react-router-dom';
import { Ticket as TicketIcon } from 'icons';
import { Reply as ReplyIcon } from 'icons';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'components';
import { List, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTicketById, addTicketReplies, addTicketComments, getUsers, editTicket } from 'store';
import * as Yup from 'yup';
import { useTranslation } from "react-i18next";
import moment from 'moment';
import { genrateFirstLetterName, getDifference, } from 'lib';
import { checkModule } from 'lib/checkModule';


const CustomSelectUpdate = ({ label, name, options, value, disabled, onChange, className }) => {
    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={name} className="mb-[16px] text-white text-[14px]">
                {label}
            </label>
            <select
                name={name}
                disabled={disabled}
                value={value}
                onChange={(e) => {
                    onChange(e);
                }}
                className="form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
            >
                {options?.map((option) => (
                    <option value={option?.value} key={option?.value}>
                        {option?.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

const initialValues = {
    commentText: ''
};

const initialRepliesValues = {
    commentText: ''
};

const validationSchema = Yup.object().shape({
    commentText: Yup.string().required('Comment text is required'),
});

const validationSchemaReplies = Yup.object().shape({
    commentText: Yup.string().required('Comment text is required')
});

export const TicketDetails = () => {
    const { id } = useParams();
    const { t } = useTranslation("/Tickets/ns");
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, ticket } = useSelector((state) => state?.tickets);
    const { commentLoading } = useSelector((state) => state?.ticketComments);
    const { repliesLoading } = useSelector((state) => state?.ticketReplies);
    const { userModules } = useSelector((state) => state?.modules);
    const { users } = useSelector((state) => state?.users);
    const isSelected = (id) => selected.indexOf(id) !== -1;
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let repliesId = params.get('id');

    const fields = [
        {
            name: 'assignedTo',
            label: t('assignTo'),
            type: 'select',
            value: ticket?.assignedTo,
            options: () => {
                let usersData = [{ 'value': '', 'label': 'Select' }];
                users.forEach((user) => {
                    usersData.push({
                        value: user?.id,
                        label: user?.fullName,
                    });
                });
                return usersData
            }
        },
        {
            name: 'ticketStatus',
            label: t('status'),
            type: 'select',
            value: ticket?.ticketStatus,
            options: () => {
                return [{ 'value': '', 'label': 'Select' }, { 'value': 0, 'label': 'Active' }, { 'value': 1, 'label': 'Closed' }, { 'value': 2, 'label': 'Disabled' }]
            }
        },
        {
            name: 'ticketPriority',
            label: t('priority'),
            type: 'select',
            value: ticket?.ticketPriority,
            options: () => {
                return [{ 'value': '', 'label': 'Select' }, { 'value': 0, 'label': 'Urgent' }, { 'value': 1, 'label': 'NotUrgent ' }]
            }
        },
    ];

    const { permissions } = checkModule({
        module: 'Users',
        modules: userModules,
    });

    useEffect(() => {
        (async () => {
            await dispatch(getTicketById(id));
            await dispatch(getUsers());
            goToViolation(repliesId);
        })();
    }, []);

    const handleReplyInput = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    }


    const goToViolation = (id) => {
        const violation = document.getElementById(id);
        if (violation) {
            violation.scrollIntoView();
        }
    };

    const handleUpdateTicket = (e) => {
        if (e.target.value !== '') {
            const newValues = {
                description: ticket?.description,
                id: id,
                ticketRelatedTo: ticket?.ticketRelatedTo,
                ticketRelatedToId: ticket?.ticketRelatedToId,
                departmentId: ticket?.departmentId
            };

            if (e.target.name === 'assignedTo') {
                newValues[e.target.name] = e.target.value;
                newValues['ticketPriority'] = parseInt(ticket?.ticketPriority);
                newValues['ticketStatus'] = parseInt(ticket?.ticketStatus);
            } else if (e.target.name === 'ticketStatus') {
                newValues[e.target.name] = parseInt(e.target.value);
                newValues['assignedTo'] = ticket?.assignedTo;
                newValues['ticketPriority'] = parseInt(ticket?.ticketPriority);
            } else {
                newValues[e.target.name] = parseInt(e.target.value);
                newValues['assignedTo'] = ticket?.assignedTo;
                newValues['ticketStatus'] = parseInt(ticket?.ticketStatus);
            }

            (async () => {
                await dispatch(editTicket({ data: newValues }));
                if (e.target.name === 'assignedTo') {
                    navigate(`/admin/dashboard/tickets/list/show`);
                } else {
                    await dispatch(getTicketById(id));
                }
            })();
        }
    }

    return (
        <div className="p-4 md:px-6">
            <div className="ticket-wrap bg-[#1E1E2D] text-[#ffffff] p-[40px] rounded-lg">
                {
                    loading || ticket === null ? (
                        <div className='text-center'>
                            <Spin
                                size="large"
                                style={{ gridColumn: '1/3', alignSelf: 'center' }}
                            />
                        </div>
                    ) : (
                        <div className="w-8/12">
                            <div className="flex">
                                <div className="w-[50px] tick">
                                    <TicketIcon />
                                </div>
                                <div className='ml-[20px]'>
                                    <h3 className={'text-[24px] text-[#fff]'}>{ticket?.ticketTitle}</h3>
                                    <p className={'mt-[8px] text-[#474761]'}><span className='mr-[20px]'>By {ticket?.createdByName}</span> <span>{`Created ${getDifference(new Date(ticket.createdOn))} - ${moment(ticket?.createdOn).format('MMMM Do, YYYY h:m A')}`}</span></p>
                                </div>
                            </div>
                            <div className={'text-[16px] mt-[40px] mb-[40px]'}>{ticket?.description} </div>
                            <div className={`form ticket-form `}>
                                <div className="grid grid-cols-3 gap-[20px] mb-[32px] items-end">
                                    {fields.map((field) => (
                                        <div className="flex items-end" key={field?.name}>
                                            <CustomSelectUpdate
                                                key={field.name}
                                                name={field.name}
                                                label={field?.label}
                                                placeholder={field.placeholder}
                                                type={field.type}
                                                options={field.options()}
                                                className={'custom-select'}
                                                value={field.value}
                                                onChange={(e) => handleUpdateTicket(e)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    enableReinitialize
                                    onSubmit={async (values) => {
                                        const newValues = {
                                            commentText: values?.commentText,
                                            ticketId: id
                                        };
                                        (async () => {
                                            await dispatch(addTicketComments(newValues));
                                            await dispatch(getTicketById(id));
                                        })();
                                    }}
                                >
                                    <Form>
                                        <div className={`relative mb-[32px] items-end ${ticket?.ticketStatus > 0 && 'pointer-events-none opacity-30'}`}>
                                            <Input
                                                key={'commentText'}
                                                name={'commentText'}
                                                label={''}
                                                placeholder={'Share Your Comments'}
                                                type={'textarea'}
                                                rows={'7'}
                                            />
                                            <Button
                                                htmlType="submit"
                                                loading={commentLoading}
                                                className="absolute bottom-5 right-5 px-[16px] py-[5px] text-[14px] bg-[#3699FF] text-[#fff] h-[36px]">
                                                Send
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <div className={'ticket-list-wrap custom-table__table'}>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    pagination={{
                                        pageSize: 20,
                                    }}
                                    dataSource={ticket?.ticketComments}
                                    footer={''}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            actions={''}
                                            extra={''}
                                        >
                                            <div id={item.id} className="p-[20px] border-[1px] rounded-[8px] border-[#323248]">
                                                <div className={'w-full relative'}>
                                                    <div className="flex">
                                                        <div className="image w-[47px] rounded-[5px] overflow-hidden">
                                                            {
                                                                item?.userImagePath ?
                                                                    <img src={item?.userImagePath} alt={item?.userFullName} />
                                                                    :
                                                                    <div className="bg-[#171723] text-[#0BB783]  px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                                                                        {genrateFirstLetterName(item.userFullName)}
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className="meta ml-[16px]">
                                                            <div className="flex align-center">
                                                                <span className='text-[#fff] text-[16px]'>{item?.userFullName}</span>
                                                                {
                                                                    item.createdBy === ticket.createdBy && (
                                                                        <span className='bg-[#3A2434] p-[4px] text-[#F64E60] text-[10px] rounded-[4px] ml-[16px]'>AUTHOR</span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="text-[#474761] text-[14px]">1 Hour</div>
                                                        </div>
                                                    </div>
                                                    {
                                                        ticket?.ticketStatus === 0 && <NavLink to="#" onClick={() => handleReplyInput(item.id)} className={'text-[#474761] text-[16px] absolute right-5 top-1'} >Reply</NavLink>
                                                    }
                                                </div>
                                                <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">{item?.commentText}</div>
                                                {
                                                    isSelected(item.id) && (
                                                        <div className={'reply-box mt-[20px] relative'}>
                                                            <Formik
                                                                initialValues={initialRepliesValues}
                                                                validationSchema={validationSchemaReplies}
                                                                enableReinitialize
                                                                onSubmit={async (values) => {
                                                                    const newValues = {
                                                                        commentText: values?.commentText,
                                                                        ticketCommentId: item.id
                                                                    };
                                                                    (async () => {
                                                                        await dispatch(addTicketReplies(newValues));
                                                                        await dispatch(getTicketById(id));
                                                                        setSelected([]);
                                                                    })();
                                                                }}
                                                            >
                                                                {({ errors, touched, values }) => {
                                                                    return (
                                                                        <Form>
                                                                            <div className={'relative'}>
                                                                                <Field
                                                                                    className="modal__form-el-field"
                                                                                    key="commentText"
                                                                                    type="text"
                                                                                    name="commentText"
                                                                                    placeholder="Write Something"
                                                                                />
                                                                                <Button htmlType="submit" loading={repliesLoading}
                                                                                    className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent">
                                                                                    <ReplyIcon />
                                                                                </Button>
                                                                            </div>
                                                                            {touched['commentText'] && errors['commentText'] && (
                                                                                <div className="error mt-[8px]">
                                                                                    {errors['commentText']}
                                                                                </div>
                                                                            )}
                                                                        </Form>
                                                                    );
                                                                }}
                                                            </Formik>
                                                        </div>

                                                    )
                                                }
                                            </div>
                                            <div className="ml-[40px]">
                                                {
                                                    item?.ticketCommentReplies.map((data, i) => (
                                                        <div key={i} id={data?.id} className="p-[20px] border-[1px] rounded-[8px] mt-[20px] border-[#323248]">
                                                            <div className={'w-full relative'}>
                                                                <div className="flex">
                                                                    <div className="image w-[47px] rounded-[5px] overflow-hidden">
                                                                        {
                                                                            data?.userImagePath ?
                                                                                <img src={item?.userImagePath} alt={data?.userFullName} />
                                                                                :
                                                                                <div className="bg-[#171723] text-[#0BB783] px-[8px] py-[4px] uppercase w-[40px] h-[40px] rounded-[4px] flex justify-center items-center">
                                                                                    {genrateFirstLetterName(data?.userFullName)}
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                    <div className="meta ml-[16px]">
                                                                        <div className="flex align-center">
                                                                            <span className='text-[#fff] text-[16px]'>{data?.userFullName}</span>
                                                                            <span className='bg-[#3A2434] p-[4px] text-[#F64E60] text-[10px] rounded-[4px] ml-[16px]'>AUTHOR</span>
                                                                        </div>
                                                                        <div className="text-[#474761] text-[14px]">1 Hour</div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    ticket?.ticketStatus === 0 && <NavLink to="#" onClick={() => handleReplyInput(item.id)} className={'text-[#474761] text-[16px] absolute right-5 top-1'} >Reply</NavLink>
                                                                }
                                                            </div>
                                                            <div className="text-[16px] text-[#92928F] mt-[20px] leading-7">{data?.commentText}</div>
                                                            {
                                                                isSelected(data.id) && (
                                                                    <div className={'reply-box mt-[20px] relative'}>
                                                                        <Formik
                                                                            initialValues={initialRepliesValues}
                                                                            validationSchema={validationSchemaReplies}
                                                                            enableReinitialize
                                                                            onSubmit={async (values) => {
                                                                                const newValues = {
                                                                                    commentText: values?.commentText,
                                                                                    ticketCommentId: item.id,
                                                                                    ticketCommentParentReplyId: data.id
                                                                                };
                                                                                (async () => {
                                                                                    await dispatch(addTicketReplies(newValues));
                                                                                    await dispatch(getTicketById(id));
                                                                                    setSelected([]);
                                                                                })();
                                                                            }}
                                                                        >
                                                                            {({ errors, touched, values }) => {
                                                                                return (
                                                                                    <Form>
                                                                                        <Field
                                                                                            className="modal__form-el-field"
                                                                                            key="commentText"
                                                                                            type="text"
                                                                                            name="commentText"
                                                                                            placeholder="Write Something"
                                                                                        />
                                                                                        {touched['commentText'] && errors['commentText'] && (
                                                                                            <div className="error mt-[8px]">
                                                                                                {errors['commentText']}
                                                                                            </div>
                                                                                        )}
                                                                                        <Button htmlType="submit" loading={repliesLoading} className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent">
                                                                                            <ReplyIcon />
                                                                                        </Button>
                                                                                    </Form>
                                                                                );
                                                                            }}
                                                                        </Formik>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>

                                                    ))
                                                }
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}