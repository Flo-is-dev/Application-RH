const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      name={name}
      value={value}
      id={name}
      onChange={onChange}
      className={`mt-1 block w-full p-2 shadow-sm sm:text-sm focus:outline-none  border-b-2 ${
        error ? "border-red-500" : "border-pink-500 "
      } rounded-md`}
      aria-invalid={error ? "true" : "false"}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

export default SelectField;
