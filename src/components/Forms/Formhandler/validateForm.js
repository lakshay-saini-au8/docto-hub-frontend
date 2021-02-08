function validatePhoneNumber(input_str) {
  // eslint-disable-next-line
  var re = /^[\+]?[(]?[0-9]{0,3}[)]?[-\s\.]?[0-9]{0,3}[-\s\.]?[0-9]{4,6}$/im;

  return re.test(input_str);
}
export const validateRegistration = (inputs) => {
  const errors = {};

  if (!inputs.firstname || !inputs.firstname.trim()) {
    errors.firstname = "First Name Required";
  }

  if (!inputs.email) {
    errors.email = "Email Required!!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Invalid Format of email address";
  }
  if (!inputs.password) {
    errors.password = "Password Required";
  } else if (inputs.password.length < 8) {
    errors.password = "Min Length is 8";
  }

  if (!inputs.confirm_password) {
    errors.confirm_password = "Password Required";
  } else if (inputs.confirm_password !== inputs.password) {
    errors.confirm_password = "Passwords Dont Match";
  }

  if (!inputs.mobile) {
    errors.mobile = "Phone Number Required";
  } else if (inputs.mobile.length < 6) {
    errors.mobile = "Minimum 6 digits";
  } else if (!validatePhoneNumber(inputs.mobile)) {
    errors.mobile = "Phone Number should have only Digits";
  }

  return errors;
};

export const loginValidation = (inputs) => {
  const errors = {};
  if (!inputs.email) {
    errors.email = "Email Required!!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Invalid Format of email address";
  }

  if (!inputs.password) {
    errors.password = "Password Required";
  } else if (inputs.password.length < 8) {
    errors.password = "Min Length is 8";
  }
  return errors;
};

export const resetPasswordValidation = (inputs) => {
  const errors = {};
  if (!inputs.email) {
    errors.email = "Email Required!!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Invalid Format of email address";
  }
  return errors;
};

export const updateProfileValidation = (inputs) => {
  const errors = {};
  if (!inputs.firstname || !inputs.firstname.trim()) {
    errors.firstname = "First Name Required";
  }

  if (!inputs.lastname || !inputs.lastname.trim()) {
    errors.lastname = "Last Name Required";
  }

  if (!inputs.mobile) {
    errors.mobile = "Phone Number Required";
  } else if (inputs.mobile.length < 6) {
    errors.mobile = "Minimum 6 digits";
  } else if (!validatePhoneNumber(inputs.mobile)) {
    errors.mobile = "Phone Number should have only Digits";
  }

  if (inputs.zipcode && inputs.zipcode.length !== 6) {
    errors.zipcode = "Is Should be 6 digits";
  } else if (inputs.zipcode && !validatePhoneNumber(inputs.zipcode)) {
    errors.zipcode = "Enter Only Numbers";
  }

  if (inputs.price < 0) {
    errors.price = "Price should be greater than 0";
  } else if (inputs.price === "notSet") {
    errors.price = "Set A price";
  }

  return errors;
};

export const changePasswordValidation = (inputs) => {
  const errors = {};

  if (!inputs.password) {
    errors.password = "Password Required";
  } else if (inputs.password.length < 8) {
    errors.password = "Min Length is 8";
  }

  if (!inputs.newpassword) {
    errors.newpassword = "New Password Required";
  } else if (inputs.newpassword.length < 8) {
    errors.newpassword = "Min Length is 8";
  }

  if (!inputs.confirmnewpassword) {
    errors.confirmnewpassword = "Password Required";
  } else if (inputs.confirmnewpassword !== inputs.newpassword) {
    errors.confirmnewpassword = "Passwords Dont Match";
  }

  return errors;
};

export const doctorBookingValidation = (inputs) => {
  const errors = {};

  if (!inputs.firstname || !inputs.firstname.trim()) {
    errors.firstname = "First Name Required";
  }

  if (!inputs.lastname || !inputs.lastname.trim()) {
    errors.lastname = "Last Name Required";
  }

  if (!inputs.email) {
    errors.email = "Email Required!!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Invalid Format of email address";
  }
  if (!inputs.mobile) {
    errors.mobile = "Phone Number Required";
  } else if (inputs.mobile.length < 6) {
    errors.mobile = "Minimum 6 digits";
  } else if (!validatePhoneNumber(inputs.mobile)) {
    errors.mobile = "Phone Number should have only Digits";
  }

  if (!inputs.payment_method) {
    errors.payment_method = "Select A Payment Method";
  }
  if (!inputs.booking_date) {
    errors.booking_date = "Select A Date";
  }
  if (!inputs.booking_time) {
    errors.booking_time = "Select A Time";
  }
  return errors;
};
