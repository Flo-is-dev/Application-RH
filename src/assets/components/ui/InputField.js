import React from "react";

const InputField = ({ label, type, name, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm mb-1 font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-1 border-b-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-pink-500 ${
        error ? "border-red-500 border" : "border-pink-500 "
      } rounded-md`}
      aria-invalid={error ? "true" : "false"}
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default InputField;
