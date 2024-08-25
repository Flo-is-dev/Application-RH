import React, { useState } from "react";
import { Table, Input } from "antd";
// import "antd/dist/reset.css"; ligne commenté pour annuler le reset css par defaur ffectué par la lib antd
import data from "../data/mockProfileData";

const { Search } = Input;

const EmployeeTable = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10); // État pour contrôler le nombre de lignes par page

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value)); // Mettre à jour la taille de page
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName), //sorter - fonction spécifique à ant Design
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

  const filteredData = data.filter((item) =>
    Object.keys(item).some((key) =>
      String(item[key]).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center mb-5">
          <p className="mb-0">Show</p>
          <select
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
        dataSource={filteredData}
        pagination={{ pageSize: pageSize }}
      />
    </div>
  );
};

export default EmployeeTable;
