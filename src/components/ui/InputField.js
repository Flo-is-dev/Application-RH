import React from "react";

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 p-2 block w-full shadow-sm sm:text-sm border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
      aria-invalid={error ? "true" : "false"}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default InputField;
