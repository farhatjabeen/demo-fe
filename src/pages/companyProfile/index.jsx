import React, { useState, useEffect } from 'react'
import { FaPenToSquare } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import useValidationResolver from '../../hooks/useValidationResolver'
import { FormProvider, useForm } from 'react-hook-form'
import TextInput from '../../components/common/textInput'
import { companyProfile } from '../../validations'
import {
  companyProfileData,
  editCompanyProfileData,
  userProfile,
} from '../../redux/reducers/userSlice'
import {
  categoryDetails,
  categoryDropdownValues,
  locationDetails,
  locationDropdownValues,
} from '../../redux/reducers/itemsSlice'
import FormDropdown from '../../components/common/formDropdown'

export default function CompanyProfile() {
  const [editButton, setEditButton] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [select, setSelect] = useState(false)
  const cities = useSelector(locationDetails)
  const citiesInSerbia = cities ? Object.values(cities) : []
  const categories = useSelector(categoryDetails)
  const companyCategories = categories ? Object.values(categories) : []
  const userProfileData = useSelector(userProfile)
  const [checkCurrentPassword, setCheckCurrentPassword] = useState(true)
  const [checkRetypePassword, setCheckRetypePassword] = useState(true)
  const dispatch = useDispatch()
  const resolver = useValidationResolver(companyProfile)

  const handleEditButton = () => {
    setEditButton(!editButton)
    setSelect(!select)
    setCheckCurrentPassword(true)
    setShowPassword(false)
    setShowNewPassword(false)
    setShowRegisterPassword(false)

    methods.reset({
      companyName: userProfileData?.companyName || '',
      companyCategory: userProfileData?.companyCategory || '',
      companyLocation: userProfileData?.companyLocation || '',
      name: userProfileData?.name || '',
      mobileNumber: userProfileData?.mobileNumber || '',
      emailMailId: userProfileData?.emailMailId || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }

  useEffect(() => {
    const getUser = dispatch(companyProfileData())
    dispatch(locationDropdownValues())
    dispatch(categoryDropdownValues())

    getUser?.then((res) => {
      methods.reset({
        companyName: res?.data?.companyName || '',
        companyCategory: res?.data?.companyCategory || '',
        companyLocation: res?.data?.companyLocation || '',
        name: res?.data?.name || '',
        mobileNumber: res?.data?.mobileNumber || '',
        emailMailId: res?.data?.emailMailId || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    })
  }, [])

  const methods = useForm({
    defaultValues: {
      companyName: userProfileData?.companyName || '',
      companyCategory: userProfileData?.companyCategory || '',
      companyLocation: userProfileData?.location || '',
      name: userProfileData?.name || '',
      mobileNumber: userProfileData?.mobileNumber || '',
      emailMailId: userProfileData?.emailMailId || '',
    },
    resolver,
  })

  const submitData = async (data) => {
    try {
      const name = methods.getValues().name
      const emailMailId = methods.getValues().emailMailId
      const mobileNumber = methods.getValues().mobileNumber
      const companyName = methods.getValues().companyName
      const companyCategory = methods.getValues().companyCategory
      const companyLocation = methods.getValues().companyLocation
      const newPassword = methods.getValues().newPassword
      const retypePassword = methods.getValues().confirmPassword
      const currentPassword = methods.getValues().currentPassword

      if (currentPassword) {
        const changeDetails = await dispatch(editCompanyProfileData(data))
        methods.reset({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        if (changeDetails) {
          dispatch(companyProfileData())
        }
      } else if (newPassword || retypePassword) {
        setCheckCurrentPassword(false)
        if (retypePassword) {
          setCheckRetypePassword(false)
        } else {
          setCheckRetypePassword(true)
        }
      } else {
        setCheckCurrentPassword(true)
        setCheckRetypePassword(true)
        const changeDetails = await dispatch(
          editCompanyProfileData({
            name,
            emailMailId,
            mobileNumber,
            companyName,
            companyCategory,
            companyLocation,
          })
        )
        if (changeDetails) {
          dispatch(companyProfileData())
        }
      }
    } catch (error) {
      console.log('submitData errors', error)
    }
  }

  const handleClick = () => {
    const newPassword = methods.getValues().newPassword
    const retypePassword = methods.getValues().confirmPassword
    const currentPassword = methods.getValues().currentPassword
    if (!currentPassword) {
      if (newPassword || retypePassword) {
        setCheckCurrentPassword(false)
        if (retypePassword && !newPassword) {
          setCheckRetypePassword(false)
        } else {
          setCheckRetypePassword(true)
        }
      } else {
        setCheckCurrentPassword(true)
        setCheckRetypePassword(true)
      }
    } else {
      setCheckCurrentPassword(true)
      setCheckRetypePassword(true)
    }
  }

  return (
    <div className="flex justify-center items-center flex-col md:container md:mx-auto">
      <div className="flex w-full justify-center p-6">
        <div className="font-bold xl:text-4xl md:text-4xl sm:text-3xl mb-16 mr-4">
          Company Profile
        </div>
        {editButton ? null : (
          <div>
            <button
              className="cursor-pointer w-24 h-10 rounded-xl bg-primary-color 
                border-none text-sm flex justify-center items-center"
              onClick={handleEditButton}
            >
              Edit <FaPenToSquare style={{ marginLeft: '5px' }} />
            </button>
          </div>
        )}
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitData)} className="flex justify-around w-full">
          <div className="w-full px-24">
            <div className="mb-20">
              <div className="flex justify-between mb-9">
                <div>
                  <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                    Company Name
                  </label>
                  <div className="font-medium text-xs">Company Name</div>
                </div>
                <TextInput
                  type="text"
                  placeholder="Enter your Company Name"
                  name="companyName"
                  className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl 
                                    ${editButton ? 'bg-white' : 'bg-grey88'}`}
                  autoComplete="off"
                  disable={!editButton}
                />
              </div>

              <div className="flex justify-between mb-9">
                <div>
                  <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                    Company Category
                  </label>
                  <div className="font-medium text-xs">Company Category</div>
                </div>
                <FormDropdown
                  name="companyCategory"
                  optionButtonClass={`xl:w-96 md:w-72 sm:w-60 p-4 border border-solid border-greys rounded-xl 
                                    ${editButton ? 'bg-white' : 'bg-grey88 opacity-100'}`}
                  editButton={editButton}
                  firstOptionName="Select Category"
                  valueFromDb={userProfileData?.companyCategory}
                  dropdownValues={companyCategories}
                />
              </div>

              <div className="flex justify-between mb-9">
                <div>
                  <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-[13px]">
                    Company Location
                  </label>
                  <div className="font-medium text-xs">Company Location</div>
                </div>
                <FormDropdown
                  name="companyLocation"
                  optionButtonClass={`xl:w-96 md:w-72 sm:w-60 p-4 border border-solid border-greys 
                                    rounded-xl ${editButton ? 'bg-white' : 'bg-grey88 opacity-100'}`}
                  editButton={editButton}
                  firstOptionName="Select Location"
                  valueFromDb={userProfileData?.companyLocation}
                  dropdownValues={citiesInSerbia}
                />
              </div>

              <hr className="w-full mt-8 mb-8 text-gray58 opacity-50"></hr>

              <div>
                <div className="flex justify-between mb-9">
                  <div>
                    <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                      Name
                    </label>
                    <div className="font-medium text-xs">Your Name</div>
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter your Name"
                    name="name"
                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl 
                                        ${editButton ? 'bg-white' : 'bg-grey88'}`}
                    autoComplete="off"
                    disable={!editButton}
                  />
                </div>

                <div className="flex justify-between mb-9">
                  <div>
                    <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                      Mobile Number
                    </label>
                    <div className="font-medium text-xs">Your Mobile Number</div>
                  </div>
                  <TextInput
                    type="text"
                    placeholder="Enter your Number"
                    name="mobileNumber"
                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl 
                                        ${editButton ? 'bg-white' : 'bg-grey88'}`}
                    autoComplete="off"
                    required
                    disable={!editButton}
                  />
                </div>

                <div className="flex justify-between mb-9">
                  <div>
                    <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-[13px]">
                      Mail ID
                    </label>
                    <div className="font-medium text-xs">Your Mail ID</div>
                  </div>
                  <TextInput
                    type="text"
                    placeholder="abc@xyz.com"
                    name="emailMailId"
                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl 
                                        ${editButton ? 'bg-white' : 'bg-grey88'}`}
                    autoComplete="off"
                    required
                    disable={true}
                  />
                </div>
              </div>
              <hr className="w-full mt-8 text-gray58 opacity-50"></hr>
              <div>
                <div className="font-bold text-2xl mt-12 mb-12">Change Password</div>
                <div className="flex justify-between mb-9">
                  <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                    Enter Current password
                  </label>
                  <div>
                    <TextInput
                      type="password"
                      placeholder="Current password"
                      eyeClass="absolute bottom-3 left-80 pl-5"
                      name="currentPassword"
                      className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys 
                                            rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                      autoComplete="off"
                      disable={!editButton}
                      showPassword={showRegisterPassword}
                      setShowPassword={() => setShowRegisterPassword(!showRegisterPassword)}
                    />
                    {checkCurrentPassword ? (
                      ''
                    ) : (
                      <p className="flex justify-start text-red">Current password required</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mb-9">
                  <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                    Enter New password
                  </label>
                  <div className="xl:w-96 md:w-72 sm:w-60">
                    <TextInput
                      type="password"
                      placeholder="New password"
                      name="newPassword"
                      className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys 
                                            rounded-xl ${editButton ? 'bg-white' : 'bg-grey88'}`}
                      autoComplete="off"
                      required
                      disable={!editButton}
                      eyeClass="absolute bottom-3 left-80 pl-5"
                      showPassword={showNewPassword}
                      setShowPassword={() => setShowNewPassword(!showNewPassword)}
                    />
                    {checkRetypePassword ? (
                      ''
                    ) : (
                      <p className="flex justify-start text-red">New password required</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <label className="xl:text-lg md:text-base sm:text-sm font-bold mt-3.5">
                    Re - Enter New password
                  </label>
                  <TextInput
                    type="password"
                    eyeClass="absolute bottom-3 left-80 pl-5"
                    placeholder="New password"
                    name="confirmPassword"
                    className={`xl:w-96 md:w-72 sm:w-60 h-12 p-4 border border-solid border-greys rounded-xl 
                                        ${editButton ? 'bg-white' : 'bg-grey88'}`}
                    autoComplete="off"
                    required
                    disable={!editButton}
                    showPassword={showPassword}
                    setShowPassword={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </div>

            {editButton ? (
              <div
                className="xl:w-4/12 md:w-7/12 sm:w-8/12 flex xl:ml-80 md:ml-32 sm:ml-12 mb-10 items-center 
                            justify-between"
              >
                <div>
                  <button
                    onClick={handleEditButton}
                    className="cursor-pointer xl:w-44 md:w-44 sm:w-36 xl:h-14 
                                    md:h-14 sm:h-12 border border-[solid] border-greys bg-white rounded-xl xl:text-lg md:text-lg 
                                    sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={handleClick}
                    className="cursor-pointer xl:w-44 md:w-44 sm:w-36 
                                    xl:h-14 md:h-14 sm:h-12 border border-[solid] border-primary-color bg-primary-color rounded-xl 
                                    xl:text-lg md:text-lg sm:text-base"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
