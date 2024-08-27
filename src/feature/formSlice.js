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
  employees: [],
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
    setFormSubmitted: (state, action) => {
      state.isFormSubmitted = action.payload;
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
      state.errors = {}; // Réinitialise les erreurs aussi si nécessaire
      state.isFormSubmitted = false; // Réinitialise l'état de soumission
    },
    addEmployee: (state) => {
      state.employees.unshift(state.formData); // Ajoute les données du formulaire à la liste des employés + persiste avec ReduxPersiste
    },
  },
});

export const {
  setFormData,
  setErrors,
  setFormSubmitted,
  resetFormData,
  addEmployee,
} = formSlice.actions;
export default formSlice.reducer;
