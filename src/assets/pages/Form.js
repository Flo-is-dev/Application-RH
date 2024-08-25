// Form.js
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setErrors } from "../../feature/formSlice";
import InputField from "../components/ui/InputField";
import SelectField from "../components/ui/SelectField";
import states from "../data/states";
import departments from "../data/department";
import DatePickerContainer from "../components/DatePickerContainer";
import ModaleButton from "../components/ModaleButton";
import { Link } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const { formData, errors } = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of Birth is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.street) newErrors.street = "Street is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    dispatch(setErrors(newErrors));
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-md mx-auto px-4 bg-white rounded-lg">
      <h1 className="text-3xl mb-6 font-semibold text-center text-gray-800">
        HRnet
      </h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4">Create Employee</h2>
        <Link
          to="/Tab"
          className="text-pink-500 hover:text-pink-700  mb-4 block underline"
        >
          View Current Employees
        </Link>
      </div>

      <form className="space-y-4">
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
        <DatePickerContainer
          label="Date of Birth"
          error={errors.dateOfBirth}
          value={formData.dateOfBirth}
          disableFutureDates={true}
          onDateChange={(date) => dispatch(setFormData({ dateOfBirth: date }))}
        />
        <DatePickerContainer
          label="Start Date"
          error={errors.startDate}
          value={formData.startDate}
          disablePastDates={false}
          onDateChange={(date) => dispatch(setFormData({ startDate: date }))}
        />
        <fieldset className="border border-gray-200 p-4 rounded-lg">
          <legend className="text-lg font-semibold px-4">Address</legend>
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
        <ModaleButton validateForm={validateForm} />
      </form>
    </div>
  );
};

export default Form;
