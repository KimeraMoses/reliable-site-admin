import { NavLink } from 'react-router-dom';
import { Ticket as TicketIcon } from 'icons';
import { Reply as ReplyIcon } from 'icons';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'components';
import { List, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTicketById, getUsers, addTicketReplies, getTicketComments, addTicketComments } from 'store';
import * as Yup from 'yup';

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
    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const { loading, ticket } = useSelector((state) => state?.tickets);

    useEffect(() => {
        (async () => {
            await dispatch(getTicketById(id));
            await dispatch(getTicketComments({ ticketId: id }))
            await dispatch(getUsers());
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

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
                                    <h3 className={'text-[24px] text-[#fff]'}>Ticket Title</h3>
                                    <p className={'mt-[8px] text-[#474761]'}><span className='mr-[20px]'>By Paul Elliott</span> <span>Created 3 Hours Ago - February 5th, 2022 at 5:30 PM</span></p>
                                </div>
                            </div>
                            <div className={'text-[16px] mt-[40px] mb-[40px]'}>{ticket?.description} </div>
                            <div className="form ticket-form">
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
                                        <div className="relative mb-[32px] items-end">
                                            <Input
                                                key={'commentText'}
                                                name={'commentText'}
                                                label={''}
                                                placeholder={'Share Your Comments'}
                                                type={'textarea'}
                                                rows={'7'}
                                            />
                                            <Button htmlType="submit" type="ghost" className="absolute bottom-5 right-5 px-[16px] py-[5px] text-[14px] bg-[#3699FF] text-[#fff] h-[36px]">
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
                                        onChange: page => {
                                            console.log(page);
                                        },
                                        pageSize: 10,
                                    }}
                                    dataSource={ticket?.ticketComments}
                                    footer={''}
                                    renderItem={item => (
                                        <List.Item
                                            key={item.id}
                                            actions={''}
                                            extra={''}
                                        >
                                            <div className="p-[20px] border-[1px] rounded-[8px] border-[#323248]">
                                                <div className={'w-full relative'}>
                                                    <div className="flex">
                                                        <div className="image w-[47px] rounded-[5px] overflow-hidden">
                                                            <img src="https://dummyimage.com/400x400/000/fff" alt='' />
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
                                                    <NavLink to="#" onClick={() => handleReplyInput(item.id)} className={'text-[#474761] text-[16px] absolute right-5 top-1'} >Reply</NavLink>
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
                                                                            <Button htmlType="submit" className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent">
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
                                            <div className="ml-[40px]">
                                                {
                                                    item?.ticketCommentReplies.map((data, i) => (
                                                        <div key={i} className="p-[20px] border-[1px] rounded-[8px] mt-[20px] border-[#323248]">
                                                            <div className={'w-full relative'}>
                                                                <div className="flex">
                                                                    <div className="image w-[47px] rounded-[5px] overflow-hidden">
                                                                        <img src="https://dummyimage.com/400x400/000/fff" alt='' />
                                                                    </div>
                                                                    <div className="meta ml-[16px]">
                                                                        <div className="flex align-center">
                                                                            <span className='text-[#fff] text-[16px]'>Paul Elliott</span>
                                                                            <span className='bg-[#3A2434] p-[4px] text-[#F64E60] text-[10px] rounded-[4px] ml-[16px]'>AUTHOR</span>
                                                                        </div>
                                                                        <div className="text-[#474761] text-[14px]">1 Hour</div>
                                                                    </div>
                                                                </div>
                                                                <NavLink to="#" onClick={() => handleReplyInput(data.id)} className={'text-[#474761] text-[16px] absolute right-5 top-1'} >Reply</NavLink>
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
                                                                                        <Button htmlType="submit" className="absolute bottom-5 right-4 py-[0px] px-[0px] bg-none bg-transparent">
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