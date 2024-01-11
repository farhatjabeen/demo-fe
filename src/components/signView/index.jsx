import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { AdminSignInSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import TextInput from "../../components/common/textInput";
import { adminForgotPassword, loginAdminUser } from "../../redux/reducers/userSlice";

function SignInView() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resolver = useValidationResolver(AdminSignInSchema);

  const methods = useForm({
    defaultValues: {
      emailMailId: "",
      password: ""
    },
    resolver
  });
  const handleForgot = async () => {
    try {
      await methods.trigger('emailMailId');

      if (methods.formState.errors.emailMailId) {
        console.log('Email is not valid');
        return;
      }
      const emailMailId = methods.getValues().emailMailId;
      dispatch(adminForgotPassword({ emailMailId }));
    } catch (error) {
      console.log('handleForgot error', error);
    }
  };
  const submitData =async(data) => {
    try {
      const login = await dispatch(loginAdminUser(data));
      if (login) {
        navigate('/admin/user/foundItems')
      }
    }
    catch (error) {
      console.log("submitData errors", error)
    }
  };

  return (
    <div className="pt-28 px-28">
      <div>
        <img src={logo} alt="logo" className="h-14 w-32" />
      </div>
      <div className="pt-20 ">
        <h1 className="font-bold text-4xl">Sign In</h1>
        <p className="text-grey font-bold pt-2">
          Sign in to the admin portal of Ilost
        </p>
      </div>
      <div className="relative">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitData)}>
            <div className=" mt-6 pt-2">
              <TextInput
                name="emailMailId"
                autoComplete="off"
                placeholder="Enter email"
                className="w-full py-4 px-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-2">
              <TextInput
                type="password"
                name="password"
                eyeClass='absolute top-4 left-3/4 ml-24'
                autoComplete="off"
                placeholder="Enter password"
                className="w-full py-4 px-3 border border-gray-300 rounded-md"
                required
                showPassword={showPassword}
                setShowPassword={() => setShowPassword(!showPassword)}
              />
            </div>
            <div className="mt-20">
              <button
                type="submit"
                className="cursor-pointer w-full bg-primary-color  text-white font-bold py-4  rounded-md "
              >
                Sign in
              </button>
            </div>
          </form>
        </FormProvider>
        <div className=" absolute bottom-24 mt-4 right-2 ">
          <button
            className='cursor-pointer text-base font-normal' onClick={handleForgot}>
            Forgot Password?
          </button>
        </div>
      </div>
      </div>
      );
}

      export default SignInView;
