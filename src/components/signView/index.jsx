import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { AdminsignInSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import TextInput from "../../components/common/textInput";

function SignInView() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const resolver = useValidationResolver(AdminsignInSchema);
  console.log(resolver, "resolver");
  const methods = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
    resolver
  });
  console.log(methods, "methods");
  const submitData = async (data) => {
    navigate('/admin/user/foundItems');
    // try {
    //   dispatch(loginUser(data))
    // } catch (error) {
    //   console.log("submitData errors", error)
    // }
  };

  return (
    <div className=" pt-28  px-28">
      <div>
        <img src={logo} alt="" className="h-14 w-32" />
      </div>
      <div className="pt-20 ">
        <h1 className="font-bold text-4xl">Sign In</h1>
        <p className="text-grey font-bold pt-2">
          Sign in to the admin portal of Ilost
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <div className="mt-6 pt-2">
            <TextInput
              name="username"
              autoComplete="off"
              placeholder="Enter username"
              className="w-full py-4 px-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-2">
            <TextInput
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter password"
              className="w-full py-4 px-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-14">
            <button
              type="submit"
              className="w-full bg-light-green  text-white font-bold py-4 rounded-md focus:outline-none focus:ring focus:light-green"
            >
              Sign in
            </button>
          </div>
        </form>
      </FormProvider>

    </div>
  );
}

export default SignInView;
