import { useState } from "react";
import {
  validateRegistration,
  loginValidation,
  resetPasswordValidation,
  updateProfileValidation,
  changePasswordValidation,
  doctorBookingValidation,
  placeOrderValidation,
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
    }
  };

  const placeOrder = (event) => {
    if (event) {
      event.preventDefault();
    }
    const validationErrors = placeOrderValidation(inputs);
    const noErrors = Object.keys(validationErrors).length === 0;
    setErrors(validationErrors);

    if (noErrors) {
      callback();
    } else {
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
    placeOrder,
  };
};

export default useFormHandler;
