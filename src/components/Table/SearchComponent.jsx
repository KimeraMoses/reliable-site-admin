import { Input } from "antd";
import React, { useState } from "react";

const SearchableField = (props) => {
  const { label, name, disabled, placeholder, data, setValues, values } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const keyWordHandler = (e) => {
    const { value } = e.target;
    setValues({ ...values, client: value });
    setSearchTerm(value);
    setIsSelected(false);
    if (searchTerm.length < 1) {
      setValues({ ...values, client: "" });
    }

    if (searchTerm !== "") {
      const Results = data?.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replace(/-/g, " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  return (
    <div className="w-full">
      <>
        {label ? (
          <label htmlFor={name} className="mb-[16px] text-white text-[14px]">
            {label}
          </label>
        ) : null}
        <Input
          placeholder={placeholder}
          type="search"
          disabled={disabled}
          name={name}
          className="custom-table__input p-2 text-[#92928F]"
          value={isSelected ? values?.client : searchTerm}
          onChange={keyWordHandler}
        />

        {searchTerm.length > 1 && (
          <div className="relative w-full text-left">
            {searchResults.length > 0 ? (
              <ul className="absolute top-0 right-0 left-0 border-0 margin-0 bg-[#171723] pl-0 rounded shadow-md list-none max-h-48 overflow-y-auto z-50">
                {searchTerm &&
                  searchResults.map((result) => {
                    return (
                      <li
                        onClick={() => {
                          setIsSelected(true);
                          setValues({ ...values, client: result?.fullName });
                          setSearchTerm("");
                          setSearchResults([]);
                        }}
                        key={result.id}
                        className="px-2 py-1.5 cursor-pointer capitalize border-t border-[#323248] hover:bg-[#323248] text-[#92928f]"
                      >
                        {result.fullName}
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <div className="overflow-hidden absolute top-0 right-0 left-0 m-0 border-1 border-[#323248] bg-[#171723] z-50 rounded-md pt-2 px-2.5 pb-3 shadow-md text-[#92928f]">
                Ooops, No Client match for{" "}
                <strong className="text-primary">{searchTerm}</strong> found!
              </div>
            )}
          </div>
        )}
      </>
    </div>
  );
};

const SearchComponent = (props) => {
  const { values, OnChange, setValues, AdvancedSearchOptions } = props;

  return (
    <div className="w-full p-2 border-[1px] border-[#323248]  rounded-md">
      <h4 className="text-white font-medium text-md mb-4">Advanced Search</h4>
      <div className="w-full flex justify-between flex-wrap flex-col lg:flex-row">
        {AdvancedSearchOptions?.fields?.map((field) => {
          if (field?.variant === "searchable") {
            return (
              <div className="w-full lg:w-1/2">
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
              <div className="w-full lg:w-1/2">
                <div className="flex items-center justify-between mr-3 py-1 border-b-[1px] border-b-[#323248] border-dashed">
                  <div className="text-white w-1/4 mr-2">{field?.label}</div>
                  <select
                    value={values?.status}
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
              <div className="w-full lg:w-1/2">
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
    </div>
  );
};

export default SearchComponent;
