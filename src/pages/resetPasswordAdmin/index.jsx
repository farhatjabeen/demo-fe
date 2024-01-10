import React from "react";
import Carousel from "../../components/carousel";
import ResetPasswordView from "../../components/resetPasswordview";

function AdminResetPassword() {
  return (
    <div className="flex">
      <div className="h-screen w-1/2 relative ">
        <Carousel />
      </div>
      <div className="h-screen w-1/2 ">
        <ResetPasswordView/>
      </div>
    </div>
  );
}
export default AdminResetPassword;