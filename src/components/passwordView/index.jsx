import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";
import { AdminChangePasswordSchema } from '../../validations';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useValidationResolver from '../../hooks/useValidationResolver';
import TextInput from "../../components/common/textInput";
import { adminResetPassword } from "../../redux/reducers/userSlice";


const PasswordView = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resolver = useValidationResolver(AdminChangePasswordSchema);
  const methods = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    resolver
  });
  const submitData = async (data) => {
    try {
      const reset = dispatch(adminResetPassword(data))
      if (reset) {
        navigate('/businessSignin');
      }
      else{
        console.log("Password reset failed");
      }
    } catch (error) {
      console.log("submitData errors", error)
    }
  };

  return (
    <div className=" pt-16 h-screen px-28 ">
      <div>
        <img src={logo} alt="" className="h-14 w-32" />
      </div>
      <div className="pt-10 ">
        <h1 className="font-bold text-4xl">Change Password</h1>
        <p className="text-grey font-bold pt-2">
          Enter your new password below, we’re just being extra safe your password.
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <div className="mt-6 pt-2">
            <label>Current Password</label>
            <TextInput
              type="password"
              name="currentPassword"
              autoComplete="off"
              placeholder="currentPassword"
              className="w-full py-4 px-3 border border-gray-300 rounded-md"
              required
              showPassword={showPassword}
              setShowPassword={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="mt-2">
            <label>New Password</label>
            <TextInput
              type="password"
              name="newPassword"
              autoComplete="off"
              placeholder="newPassword"
              className="w-full py-4 px-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-2">
            <label>Confirm Password</label>
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="confirmPassword"
              autoComplete="off"
              className="w-full py-4 px-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-14">
            <button
              type="submit"
              className="w-full bg-primary-color text-white font-bold py-4 rounded-md "
            >
              Save
            </button>
          </div>
        </form>
      </FormProvider>

    </div>
  );
}


export default PasswordView