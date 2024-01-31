import React from 'react'
import './index.css'

const LoginScreen = (props) => {
  return (
    <div className="login-container">
      <div className="salutation-container">
        <p className="font-medium-24">Welcome to I Lost!</p>
        <p className="font-regular-18">Please enter your Email ID to proceed</p>
      </div>
      <div className="login-fields-container">
        <i className="yt-user-profile-disable"></i>
      </div>
    </div>
  )
}

export default LoginScreen
