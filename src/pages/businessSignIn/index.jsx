import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import TextInput from '../../components/common/textInput'
import useValidationResolver from '../../hooks/useValidationResolver'
import { loginSchema } from '../../validations'
import { businessForgotPassword, loginUser } from '../../redux/reducers/userSlice'
import { Link } from 'react-router-dom'
import { Toast } from '../../components/toast'

export default function BusinessSignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const resolver = useValidationResolver(loginSchema)
  const navigate = useNavigate()

  const methods = useForm({
    defaultValues: {
      emailMailId: '',
      password: '',
    },
    resolver,
  })

  const handleForgot = async () => {
    try {
      await methods.trigger('emailMailId')
      if (methods.formState.errors.emailMailId) {
        Toast({type:"error", message:'Email is not valid'})
        return
      }
      const emailMailId = methods.getValues().emailMailId
      dispatch(businessForgotPassword({ emailMailId }))
    } catch (error) {
      console.log('handleForgot error', error)
    }
  }

  const submitData = async (data) => {
    try {
      const login = await dispatch(loginUser(data))
      if (login) {
        navigate('/')
      }
    } catch (error) {
      console.log('submitData errors', error)
    }
  }
  return (
    <div className="flex justify-center mb-28">
      <div className="bg-white xl:w-2/6 md:w-3/5 sm:w-4/5 border-Gray53 border rounded-lg p-8">
        <h1 className="font-light text-2xl">Welcome!</h1>
        <h2 className="font-medium text-3xl mt-5 mb-10">Sign in to your business</h2>
        <div className="flex relative  flex-col justify-center ">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitData)}>
              <div className="flex  flex-col">
                <label className="font-normal text-base">Email address</label>
                <TextInput
                  type="text"
                  placeholder="Enter your Email address"
                  name="emailMailId"
                  className="h-14 w-full border border-black2 rounded-md placeholder:text-sm p-4 my-3"
                  autoComplete="off"
                  required
                />
                <label className="font-normal text-base mt-8">Password</label>
                <TextInput
                  type="password"
                  placeholder="Enter your Password"
                  name="password"
                  eyeClass="absolute bottom-7 left-3/4 ml-16"
                  className="h-14 w-full border border-black2 rounded-md placeholder:text-sm p-4 my-3"
                  autoComplete="off"
                  showPassword={showPassword}
                  required
                  setShowPassword={() => setShowPassword(!showPassword)}
                />
                <button
                  className="cursor-pointer bg-primary-color w-full h-14 rounded-md mt-8"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </FormProvider>
          <div className="absolute bottom-16 mt-5 right-3">
            <button
              onClick={handleForgot}
              className="cursor-pointer text-xs text-Gray30 font-light"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="text-Gray49 font-light mt-14 flex justify-center">
          Don't have an Account&nbsp;?
          <Link className="text-black font-semibold" to="/businessignup">
            &nbsp;Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
