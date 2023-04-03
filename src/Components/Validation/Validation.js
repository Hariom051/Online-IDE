import * as yup from "yup";
const signupschema = yup.object().shape({
  name: yup.string().min(6).max(15).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});

const loginschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(20).required(),
});

const forgetpasswordschema = yup.object().shape({
  email: yup.string().email().required(),
});
const adminschema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(12).max(20).required(),
});
const modalschema = yup.object().shape({
  codename: yup.string().required(),
});

export {
  signupschema,
  loginschema,
  forgetpasswordschema,
  adminschema,
  modalschema,
};
