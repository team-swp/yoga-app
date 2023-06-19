import toast from "react-hot-toast";
//validate login page email
export async function emailValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

// validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required...!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email...!");
  } else if (!values.email.includes("@")) {
    error.email = toast.error("Wrong Email...!");
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      values.email
    )
  ) {
    error.email = toast.error("Invalid email address...!");
  }

  return error;
}

//validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);

  return errors;
}

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required...!");
  }

  return error;
}

function validateUsername(errors = {}, values) {
  const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/; // Dấu hiệu của các ký tự đặc biệt
  if (specialCharacters.test(values.username)) {
    errors.username = toast.error("Fullname must have no special Characters");
  }

  return errors;
}

/** validate register form */
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors, values);

  return errors;
}

export async function loginValidation(values) {
  const errors = emailVerify({}, values);
  passwordVerify(errors, values);
  return errors;
}

/** validate profile page */
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  verifyPhoneNumber(errors, values);

  return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password not match...!");
  }

  return errors;
}

export async function paymentVerify(values) {
  const errors = emailVerify({}, values);
  verifyCurrency(errors,values)
  verifyPhoneNumber(errors,values)
  validateUsername(errors,values)
  return errors;
}

function passwordVerify(errors = {}, values) {
  /* eslint-disable no-useless-escape */
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long"
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

function verifyCurrency(error = {}, values) {
  if (!values.amount) {
    error.amount = toast.error("Amount is required...!");
  } else if (isNaN(values.amount)) {
    error.amount = toast.error("Invalid Amount ...!");
  } else if (parseFloat(values.amount) % 1 !== 0) {
    error.amount = toast.error("Decimal values are not allowed...!");
  } else if (parseInt(values.amount) < 10000) {
    error.amount = toast.error("Minimum amount is 10000...!");
  }

  return error;
}

function verifyPhoneNumber(error = {}, values) {
  if (!values.phone) {
    error.phone = toast.error("Phone number is required...!");
  } else if (isNaN(values.phone)) {
    error.phone = toast.error("Invalid phone number...!");
  } else if (values.phone.length !== 10 || !values.phone.startsWith("0")) {
    error.phone = toast.error(
      "Phone number should have 10 digits and start with 0...!"
    );
  }

  return error;
}
