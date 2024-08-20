import React from "react";
import { FaChevronDown } from "react-icons/fa";

const SelectDropdown = ({ label, options, isOpen, toggleOpen, onSelect }) => {
  return (
    <div className="relative">
      <div
        className="font-semibold text-base cursor-pointer flex justify-center"
        onClick={toggleOpen}
      >
        {label} <FaChevronDown className="cursor-pointer text-xs mt-2 ml-2" />
      </div>
      {isOpen && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
          style={{ width: "139px" }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => onSelect(option.value)}
              className={`p-2 cursor-pointer hover:bg-pink-200 ${
                option.value === label ? "bg-pink-500 text-white" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
