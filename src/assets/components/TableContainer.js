import React, { useState } from "react";
import { Table, Input } from "antd";
import "antd/dist/reset.css";

const { Search } = Input;

const EmployeeTable = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
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
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
    },
  ];

  const data = [
    {
      key: "1",
      firstName: "John",
      lastName: "Doe",
      startDate: "2024-10-06",
      department: "Sales",
      dateOfBirth: "1984-01-01",
      street: "",
      city: "AL",
      state: "AL",
      zipCode: "",
    },
    {
      key: "2",
      firstName: "",
      lastName: "",
      startDate: "2024-10-06",
      department: "Sales",
      dateOfBirth: "",
      street: "",
      city: "GU",
      state: "GU",
      zipCode: "",
    },
  ];

  const filteredData = data.filter((item) =>
    Object.keys(item).some((key) =>
      String(item[key]).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <Search
        placeholder="Search"
        enterButton
        onSearch={handleSearch}
        style={{ marginBottom: 20 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default EmployeeTable;
