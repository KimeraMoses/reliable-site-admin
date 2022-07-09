import { Spin } from 'antd';
import { Button, Input } from 'components';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket } from 'store';

export const GenerateTicket = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, users, clients } = useSelector((state) => state?.users);
  const { departments } = useSelector((state) => state?.departments);
  const departmentLoading = useSelector((state) => state?.departments?.loading);
  let usersData = [{ value: '', label: 'Select User' }];
  users?.forEach((user) => {
    usersData.push({
      value: user?.id,
      label: user?.fullName,
    });
  });
  let clientsData = [{ value: '', label: 'Select Client' }];
  clients?.forEach((user) => {
    clientsData.push({
      value: user?.id,
      label: user?.fullName,
    });
  });
  let departmentsData = [{ value: '', label: 'Select Department' }];
  departments?.forEach((departments) => {
    departmentsData.push({
      value: departments?.id,
      label: departments?.name,
    });
  });
  return (
    <div className="bg-[#1E1E2D] mt-[32px] p-[32px] rounded-[8px]">
      <h6 className="text-white text-[20px]">
        Generate Ticket For This Article
      </h6>
      <Spin spinning={loading || departmentLoading}>
        <Formik
          initialValues={{
            assignTo: '',
            status: 0,
            priority: 0,
            ticketTitle: '',
            description: '',
            departmentId: '',
            clientId: '',
          }}
          enableReinitialize
          onSubmit={async (values) => {
            if (values?.assignTo) {
              const final = {
                assignedTo: values?.assignTo,
                ticketStatus: Number(values?.status),
                ticketPriority: Number(values?.priority),
                ticketTitle: values?.ticketTitle,
                clientId: values?.clientId,
                description: values?.description,
                ticketRelatedTo: 0,
                ticketRelatedToId: id,
                departmentId: values?.departmentId,
              };
              await dispatch(createTicket({ data: final }));
              navigate('/admin/dashboard/support/tickets/show-all/list');
            } else {
              toast.error('Please select appropriate values.');
            }
          }}
        >
          {() => {
            return (
              <Form>
                <div className="mt-[40px] grid grid-cols-3 gap-[16px]">
                  <Input
                    type="text"
                    name="ticketTitle"
                    placeholder="Enter Ticket Title..."
                    label="Title"
                  />
                  <Input
                    type="text"
                    name="description"
                    placeholder="Enter Short Description..."
                    label="Description"
                  />
                  <Input
                    options={usersData}
                    type="select"
                    name="assignTo"
                    label="Assign To"
                  />
                  <Input
                    options={[
                      { label: 'Active', value: 0 },
                      { label: 'Waiting', value: 1 },
                    ]}
                    type="select"
                    name="status"
                    label="Status"
                  />
                  <Input
                    options={[
                      { label: 'Urgent', value: 0 },
                      { label: 'Not Urgent', value: 1 },
                    ]}
                    type="select"
                    name="priority"
                    label="Priority"
                  />
                  <Input
                    options={departmentsData}
                    type="select"
                    name="departmentId"
                    label="Select Department"
                  />
                  <Input
                    options={clientsData}
                    type="select"
                    name="clientId"
                    label="Select Client"
                  />
                </div>
                <div className="flex items-center gap-[12px]">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-[fit_content] h-[55px] mt-[32px]"
                  >
                    Generate Ticket
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Spin>
    </div>
  );
};
