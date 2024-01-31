import React, { useState } from 'react'
import CommonModal from '../common/commonModal'

const OTPVerificationModal = ({ isOpen, onCancel }) => {
  const [otp, setOtp] = useState('')

  const handleVerify = () => {
    console.log('Verifying OTP:', otp)
  }

  return (
    <CommonModal
      isOpen={isOpen}
      onCancel={onCancel}
      onConfirm={handleVerify}
      title="OTP Verification"
      description={
        <>
          <p>Please enter the OTP sent to</p>
          <p className="font-bold">john@ilost.com</p>
        </>
      }
      additionalContent={
        <div className="py-6">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              value={otp[index] || ''}
              onChange={(e) => {
                const newOtp = [...otp]
                newOtp[index] = e.target.value
                setOtp(newOtp)
              }}
              maxLength={1}
              className="border-2 rounded-md px-2 py-3 w-12 text-center mx-1 border-grey "
            />
          ))}
        </div>
      }
      confirmText="Verify"
    />
  )
}

export default OTPVerificationModal
