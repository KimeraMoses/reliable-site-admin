import { Input } from "antd";
import { Button } from "components";
import { SearchableField } from "components/Table/SearchComponent";
import { RelatedList } from "components/TicketDetails/sections";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { DatePicker as $DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { getCurrentOnlineUsers } from "store";

export const TicketSearch = (props) => {
  const {
    values,
    OnChange,
    setValues,
    AdvancedSearchOptions,
    onSubmit,
    isLoading,
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <div className="w-full p-2 rounded-md">
        <h4 className="text-white font-medium text-md mb-4">Advanced Search</h4>
        <div className="w-full flex justify-between flex-wrap flex-col lg:flex-row">
          {AdvancedSearchOptions?.fields?.map((field) => {
            if (field?.variant === "searchable") {
              return (
                <div className="w-full lg:w-1/2" key={field?.name}>
                  <div className="flex items-center justify-between mr-3 py-1  border-b-[1px] border-b-[#323248] border-dashed">
                    <div className="text-white w-1/4 mr-2">{field?.label}</div>
                    <SearchableField
                      name="client"
                      placeholder="Type to search client"
                      data={field?.options}
                      values={values}
                      setValues={setValues}
                    />
                  </div>
                </div>
              );
            } else if (field?.variant === "select") {
              return (
                <div className="w-full lg:w-1/2" key={field?.name}>
                  <div className="flex items-center justify-between mr-3 py-1 border-b-[1px] border-b-[#323248] border-dashed">
                    <div className="text-white w-1/4 mr-2">{field?.label}</div>
                    <select
                      value={values[field?.name]}
                      onChange={OnChange}
                      placeholder="Any"
                      name={field?.name}
                      className="form-select appearance-none text-[14px] block w-full p-2 text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
                    >
                      {field?.options?.map((option) => (
                        <option
                          value={option?.value}
                          key={option?.value}
                          className={option?.isActive ? "text-[#3dff02]" : ""}
                        >
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            } else if (field?.variant === "dateRange") {
              return (
                <div className="w-full lg:w-1/2" key={field?.name}>
                  <div className="flex items-center justify-between mr-3 py-1 border-b-[1px] border-b-[#323248] border-dashed">
                    <div className="text-white w-1/4 mr-2">{field?.label}</div>
                    <$DatePicker.RangePicker
                      onChange={(date) => {
                        const startDate = moment(date[0]).format("DD-MM-YYYY");
                        const endDate = moment(date[1]).format("DD-MM-YYYY");
                        setValues({
                          ...values,
                          [field?.name]: `${startDate}, ${endDate}`,
                        });
                      }}
                      name="dateAdded"
                      dropdownClassName="custom-date-picker-dd"
                      format="MM/DD/YYYY"
                      separator={<></>}
                      className="custom-date-picker w-full h-[52px] bg-[#171723] rounded-[8px] text-[#92928F] flex items-center justify-between px-[16px]"
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="w-full lg:w-1/2" key={field?.name}>
                  <div className="flex items-center justify-between mr-3 py-1 border-b-[1px] border-b-[#323248] border-dashed">
                    <div className="text-white w-1/4 mr-2">{field?.label}</div>
                    <Input
                      value={values[field?.name]}
                      onChange={OnChange}
                      name={field?.name}
                      type={field?.type}
                      className="custom-table__input p-2 text-[#92928F]"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="text-right mr-2 -mt-8">
          <Button htmlType="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const AdvancedSearch = () => {
  const { clients } = useSelector((state) => state?.users);
  const { users, onlineUsers } = useSelector((state) => state?.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentOnlineUsers());
  }, []);

  let usersData = [];
  if (users?.length) {
    users?.forEach((user) => {
      const isOnline = onlineUsers?.find((admin) => admin?.userId === user?.id)
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
  }

  const AdvancedSearchOptions = {
    searchValues: {
      ticketNo: "",
      dateAdded: "",
      status: "",
      email: "",
      client: "",
      admin: "",
      title: "",
      priority: "",
      numResult: 100,
    },
    fields: [
      {
        label: "Ticket No.",
        name: "ticketNo",
        type: "text",
        variant: "text",
        placeholder: "36",
      },
      {
        label: "Search String",
        name: "title",
        type: "text",
        variant: "text",
        placeholder: "36",
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        variant: "text",
        placeholder: "100",
      },

      {
        label: "Date",
        name: "dateAdded",
        type: "date",
        variant: "dateRange",
        placeholder: "12-13-2022",
      },
      {
        label: "Client",
        name: "client",
        type: "text",
        variant: "searchable",
        options: clients,
      },
      {
        label: "Admin",
        name: "admin",
        type: "select",
        placeholder: "Select Admin",
        variant: "select",
        options: usersData,
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        variant: "select",
        options: [
          { label: "Any", value: "" },
          { label: "Active", value: 0 },
          { label: "Waiting", value: 1 },
        ],
      },
      {
        label: "Priority",
        name: "priority",
        type: "select",
        variant: "select",
        options: [
          { label: "Any", value: "" },
          { label: "Urgent", value: 0 },
          { label: "Not Urgent", value: 1 },
        ],
      },

      {
        label: "Max Results",
        name: "numResult",
        type: "number",
        variant: "text",
        placeholder: 0,
      },
    ],
  };

  return (
    <div className="p-[40px] flex flex-col gap-[30px]">
      <RelatedList isSearch AdvancedSearchOptions={AdvancedSearchOptions} />
      {/* <Details /> */}
    </div>
  );
};

export default AdvancedSearch;
