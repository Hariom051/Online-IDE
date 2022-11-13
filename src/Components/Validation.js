import * as yup from 'yup';
 const signupschema=yup.object().shape({
name:yup.string().required(),
email:yup.string().email().required(),
password:yup.string().min(6).max(10).required()
});

 const loginschema=yup.object().shape({
 email:yup.string().email().required(),
 password:yup.string().min(6).max(10).required()
})

const forgetpasswordschema=yup.object().shape({
    email:yup.string().email().required()
})
export {signupschema,loginschema,forgetpasswordschema};
