import React, { useState } from 'react'
import logo from '../../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'
import { businessUserForgotSchema } from '../../validations'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import useValidationResolver from '../../hooks/useValidationResolver'
import TextInput from '../../components/common/textInput'
import { adminResetPassword } from '../../redux/reducers/userSlice'
import { useParams } from 'react-router-dom'

function ResetPasswordView() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const resolver = useValidationResolver(businessUserForgotSchema)

  const methods = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver,
  })
  const password = methods.getValues().password

  const submitData = () => {
    try {
      const reset = dispatch(adminResetPassword({ password }, token))
      if (reset) {
        navigate('/admin/signin')
      } else {
        console.log('Password reset failed')
      }
    } catch (error) {
      console.log('submitData errors', error)
    }
  }

  return (
    <div className="pt-28 px-28">
      <div>
        <img src={logo} alt="logo" className="h-14 w-32" />
      </div>
      <div className="pt-20 ">
        <h1 className="font-bold text-4xl">Reset Password</h1>
        <p className="text-grey font-bold pt-2">
          Create a strong, secure password for your account.
        </p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <div className=" mt-6 pt-2">
            <TextInput
              type="password"
              name="password"
              autoComplete="off"
              eyeClass="absolute top-4 left-3/4 ml-24"
              placeholder="Enter new Password"
              className="w-full py-4 px-3 border border-gray-300 rounded-md"
              required
              showPassword={showNewPassword}
              setShowPassword={() => setShowNewPassword(!showNewPassword)}
            />
          </div>
          <div className="mt-2">
            <TextInput
              type="password"
              name="confirmPassword"
              eyeClass="absolute top-4 left-3/4 ml-24"
              autoComplete="off"
              placeholder=" Confirm Password"
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
              Save Password
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default ResetPasswordView
