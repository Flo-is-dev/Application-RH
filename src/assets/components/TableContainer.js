import React, { useState } from "react";
import { Table, Input } from "antd";
import data from "../data/mockProfileData";
import { useSelector } from "react-redux";
const { Search } = Input;

const EmployeeTable = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const employees = useSelector((state) => state.form.employees);
  //   const isFormSubmitted = useSelector((state) => state.form.isFormSubmitted);

  //   console.log("form deja soumis?", isFormSubmitted);

  //   const singleDataArray = isFormSubmitted ? [...employees, ...data] : [...data];
  const singleDataArray = [...employees, ...data];

  console.log(singleDataArray);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      sorter: (a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth),
    },
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
      sorter: (a, b) => a.street.localeCompare(b.street),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
      sorter: (a, b) => a.zipCode.localeCompare(b.zipCode),
    },
  ];

  const filteredData = singleDataArray.filter((item) =>
    Object.keys(item).some((key) =>
      String(item[key]).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, filteredData.length);
  const total = filteredData.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center mb-5">
          {/* <p className="mb-0">Show</p> */}
          <label htmlFor="pageSize" className="mr-2 mb-0">
            Show
          </label>
          <select
            id="pageSize"
            className="border rounded p-1 m-2"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <p className="mb-0">entries</p>
        </div>
        <Search
          placeholder="Search"
          enterButton
          onSearch={handleSearch}
          className="max-w-xs mb-2"
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData.map((item) => ({
          ...item,
          key: item.key || Date.now(),
        }))}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          onChange: handlePageChange,
          itemRender: (page, type, originalElement) => {
            if (type === "prev") {
              return (
                <button onClick={() => handlePageChange(page)}>Previous</button>
              );
            }
            if (type === "next") {
              return (
                <button onClick={() => handlePageChange(page)}>Next</button>
              );
            }
            if (type === "page") {
              return (
                <button
                  onClick={() => handlePageChange(page)}
                  style={{
                    fontWeight: currentPage === page ? "bold" : "normal",
                  }}
                >
                  {page}
                </button>
              );
            }
            return originalElement;
          },
        }}
      />
      <div className="mt-2">
        <p>
          Showing {start} to {end} of {total} entries
        </p>
      </div>
    </div>
  );
};

export default EmployeeTable;
