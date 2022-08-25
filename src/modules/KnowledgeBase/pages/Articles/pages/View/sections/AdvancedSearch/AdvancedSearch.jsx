import { Input } from "antd";
import { Button } from "components";
import { SearchableField } from "components/Table/SearchComponent";
import { RelatedList } from "components/TicketDetails/sections";
import React from "react";
import { useSelector } from "react-redux";

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
                        <option value={option?.value} key={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
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
                      //   placeholder={field?.placeholder}
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
  const { users } = useSelector((state) => state?.users);

  let usersData = [{ value: "", label: "Any" }];
  if (users?.length) {
    users?.forEach((user) => {
      usersData.push({
        value: user?.id,
        label: user?.userName,
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
      numResult: 3,
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
      //   {
      //     label: "Username",
      //     name: "name",
      //     type: "text",
      //     variant: "text",
      //   },
      {
        label: "Date",
        name: "dateAdded",
        type: "date",
        variant: "date",
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
        // options: [
        //   { label: "select max result", value: "" },
        //   { label: "5", value: 5 },
        //   { label: "10", value: 10 },
        //   { label: "20", value: 20 },
        //   { label: "50", value: 50 },
        //   { label: "100", value: 100 },
        //   { label: "200", value: 200 },
        // ],
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
