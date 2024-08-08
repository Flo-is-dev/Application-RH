const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full p-2 shadow-sm sm:text-sm border ${
        error ? "border-red-500" : "border-gray-300"
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
