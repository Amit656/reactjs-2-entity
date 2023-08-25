import {
  required, email, helpers, minLength, maxLength,
} from '@vuelidate/validators';

const validators = {
  nameReq: required,
  warehouseReq: required,
  locTypeReq: required,
  emailRequired: helpers.withMessage('The email field is required', required),
  email: helpers.withMessage('Invalid email format', email),
  passReq: helpers.withMessage('The password field is required', required),
  passMin: minLength(8),
  passWith: helpers.withMessage(
    () => 'The password requires an uppercase, lowercase, number and special character',
    (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value),
  ),
  accountNumberReq: maxLength(20),
  zipCodeLen: maxLength(6),
};

export default validators;
