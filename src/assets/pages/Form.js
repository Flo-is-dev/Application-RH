import { useState } from "react";
import InputField from "../components/ui/InputField";
import SelectField from "../components/ui/SelectField";
import states from "../data/states";
import departments from "../data/department";
import DatePickerContainer from "../components/DatePickerContainer";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "Alabama",
    zipCode: "",
    department: "Sales",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.street) newErrors.street = "Street is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Employee data submitted: ", formData);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white border-2 rounded-lg border-orange-300 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#eb9282,0_0_15px_#eb9282,0_0_30px_#eb9282]">
      <h1 className="text-3xl font-bold text-center mb-4">HRnet</h1>
      <a
        href="/Tab"
        className="text-purple-600 hover:underline block text-center mb-4"
      >
        View Current Employees
      </a>
      <h2 className="text-xl font-semibold text-center mb-4">
        Create Employee
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <InputField
          label="Date of Birth"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />
        <DatePickerContainer />
        <InputField
          label="Start Date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
        />
        <fieldset className="border border-gray-300 p-4 rounded-md">
          <legend className="text-lg font-semibold">Address</legend>
          <InputField
            label="Street"
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            error={errors.street}
          />
          <InputField
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />
          <SelectField
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            options={states}
            error={errors.state}
          />
          <InputField
            label="Zip Code"
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
          />
        </fieldset>
        <SelectField
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          options={departments}
          error={errors.department}
        />
        <button
          type="submit"
          className="w-full bg-orange-400 text-white p-2 rounded-md hover:bg-orange-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
