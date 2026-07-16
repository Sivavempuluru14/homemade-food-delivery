export const validateRegister = (formData) => {
  const errors = {};
  if (!formData.fullName.trim()) {
    errors.fullName = "Full Name is required";
  } else if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
    errors.fullName = "Only letters and spaces are allowed";
  } else if (formData.fullName.trim().length < 3) {
    errors.fullName = "Full Name must be at least 3 characters";
  } else if (formData.fullName.trim().length > 50) {
    errors.fullName = "Full Name cannot exceed 50 characters";
  }


  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (formData.email.includes(" ")) {
    errors.email = "Email cannot contain spaces";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.mobile.trim()) {
    errors.mobile = "Mobile Number is required";
  } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
    errors.mobile =
      "Mobile number must be 10 digits and start with 6, 7, 8, or 9";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.includes(" ")) {
    errors.password = "Password cannot contain spaces";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      formData.password
    )
  ) {
    errors.password =
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character";
  }

 
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
   

if (!formData.plan) {
  errors.plan = "Please select a subscription plan";
}

  if (!formData.location.trim()) {
    errors.location = "Location is required";
  } else if (formData.location.trim().length < 3) {
    errors.location = "Location must be at least 3 characters";
  }

  return errors;
};



export const validateLogin = (formData) => {
 const errors = {};

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
  ) {
    errors.email = "Enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
};