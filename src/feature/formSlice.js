import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "Alabama",
    zipCode: "",
    department: "Sales",
  },
  errors: {},
  isFormSubmitted: false,
  // TODO ajouter mock de départ dans inital state
  employees: [],
  //   TODO pourquoi on a employees? Ne peut -on pas y ajouter ici le mockk?
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = { ...action.payload };
    },
    // setFormSubmitted: (state, action) => {
    //   state.isFormSubmitted = action.payload;
    // },
    resetFormData: (state) => {
      state.formData = initialState.formData;
      state.errors = {};
      state.isFormSubmitted = false;
    },
    addEmployee: (state) => {
      const newEmployee = {
        ...state.formData,
        key: Date.now(),
      };
      state.employees.unshift(newEmployee);
    },
  },
});

export const {
  setFormData,
  setErrors,
  //   setFormSubmitted,
  resetFormData,
  addEmployee,
} = formSlice.actions;
export default formSlice.reducer;
