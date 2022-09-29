import { Spin } from "antd";
import { Button, Input } from "components";
import { Form, Formik } from "formik";
import { SearchableField } from "modules/Bills/pages/Orders/pages/AddEditOrder/sections/Sidebar/sub-sections";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUsers } from "store";
import { getClients } from "store";
import { createTicket } from "store";
import { Checkbox } from "antd";
import { getCurrentOnlineUsers } from "store";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  ticketTitle: Yup.string().required("Ticket title is required"),
  description: Yup.string().required("Ticket description is required"),
  departmentId: Yup.string().required("Department is required"),
  clientId: Yup.string().required("Client is required"),
});

export const GenerateTicket = ({ isAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, users, onlineUsers, clients } = useSelector(
    (state) => state?.users
  );
  const { departments } = useSelector((state) => state?.departments);
  const departmentLoading = useSelector((state) => state?.departments?.loading);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getUsers());
    dispatch(getCurrentOnlineUsers());
  }, []);

  let departmentsData = [{ value: "", label: "Select Department" }];
  departments?.forEach((departments) => {
    departmentsData.push({
      value: departments?.id,
      label: departments?.name,
    });
  });

  return (
    <div className="bg-[#1E1E2D] mt-[32px] p-[32px] rounded-[8px] ">
      <h6 className="text-white text-[20px]">
        Generate Ticket For {isAdmin ? "Client" : "This Article"}
      </h6>
      <Spin spinning={loading || departmentLoading}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            assignTo: "",
            status: 0,
            priority: 1,
            ticketTitle: "",
            description: "",
            departmentId: "",
            clientId: "",
            incomingFromClient: false,
          }}
          enableReinitialize
          onSubmit={
            async (values) => {
              setIsLoading(true);
              const final = {
                assignedTo: values?.assignTo,
                ticketStatus: Number(values?.status),
                ticketPriority: Number(values?.priority),
                ticketTitle: values?.ticketTitle,
                clientId: values?.clientId,
                description: values?.description,
                ticketRelatedTo: isAdmin ? 1 : 0,
                ticketRelatedToId: isAdmin ? values?.clientId : id,
                departmentId: values?.departmentId,
                incomingFromClient: values?.incomingFromClient,
              };
              await dispatch(createTicket({ data: final }));
              setIsLoading(false);
              navigate("/admin/dashboard/support/tickets/show-all/list");
            }
            // else {
            //   setIsLoading(false);
            //   toast.error("Please select appropriate values.");
            // }
            // }
          }
        >
          {({ setFieldValue, values }) => {
            let usersData = [{ label: "Auto Assign", value: "" }];
            if (values?.departmentId) {
              usersData = [];
              users
                ?.filter((user) =>
                  user?.departmentIds?.includes(values?.departmentId)
                )
                ?.forEach((user) => {
                  const isOnline = onlineUsers?.find(
                    (admin) => admin?.userId === user?.id
                  )
                    ? true
                    : false;
                  usersData.push({
                    value: user?.id,
                    label: user?.fullName
                      ? `${user?.fullName}${isOnline ? "   (Online)" : ""}`
                      : "N/A",
                    isActive: isOnline ? true : false,
                  });
                });
            } else {
              usersData = [
                { label: "Please select department first", value: "" },
              ];
            }
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
                    options={departmentsData}
                    type="select"
                    name="departmentId"
                    label="Select Department"
                  />
                  <Input
                    options={[
                      { label: "Active", value: 0 },
                      { label: "Waiting", value: 1 },
                      { label: "Closed", value: 2 },
                      { label: "Closed and Locked", value: 3 },
                    ]}
                    type="select"
                    name="status"
                    label="Status"
                  />
                  <Input
                    options={[
                      { label: "Low", value: 0 },
                      { label: "Normal", value: 1 },
                      { label: "High", value: 2 },
                    ]}
                    type="select"
                    name="priority"
                    label="Priority"
                  />

                  <Input
                    options={usersData?.sort((a, b) =>
                      a?.isActive === b?.isActive ? 0 : a?.isActive ? -1 : 1
                    )}
                    placeholder="Auto Assign"
                    type="select"
                    name="assignTo"
                    label="Assign To"
                  />
                  <SearchableField
                    name="clientId"
                    placeholder="Search client"
                    label="Client"
                    data={clients}
                  />
                  <div className="flex items-center">
                    <Checkbox
                      name="incomingFromClient"
                      value={values?.incomingFromClient}
                      onChange={(e) =>
                        setFieldValue("incomingFromClient", e.target.checked)
                      }
                    />
                    <label className="ml-2 text-white text-[14px]">
                      Incoming Ticket
                    </label>
                  </div>
                </div>
                <div className="flex items-center gap-[12px]">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isLoading}
                    className="w-[fit_content] h-[55px] mt-[32px]"
                  >
                    {isLoading ? "Generating..." : "Generate Ticket"}
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
