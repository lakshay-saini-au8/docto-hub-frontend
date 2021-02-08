import { useState } from "react";
import {
  validateRegistration,
  loginValidation,
  resetPasswordValidation,
  updateProfileValidation,
  changePasswordValidation,
  doctorBookingValidation,
} from "./validateForm";
const useFormHandler = (callback) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const register = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = validateRegistration(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);
    if (noErrors) {
      callback();
    }
  };

  const clearForm = () => {
    setInputs({});
  };

  const login = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = loginValidation(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      callback();
    }
  };

  const resetPassword = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = resetPasswordValidation(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      callback();
    } else {
      console.log("Error", errors);
    }
  };

  const updateProfile = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = updateProfileValidation(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      callback();
    } else {
      console.log("Inputs", inputs);
      console.log("Errors", errors);
    }
  };
  const normalSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const bookDoctor = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = doctorBookingValidation(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      callback();
    } else {
      console.log("Inputs", inputs);
      console.log("Errors", errors);
    }
  };

  const changePassword = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = changePasswordValidation(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      callback();
    } else {
      console.log("Errors", errors);
    }
  };

  const handleInputChange = (event) => {
    setErrors({});
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    register,
    handleInputChange,
    clearForm,
    inputs,
    errors,
    setErrors,
    setInputs,
    resetPassword,
    login,
    updateProfile,
    changePassword,
    normalSubmit,
    bookDoctor,
  };
};

export default useFormHandler;
