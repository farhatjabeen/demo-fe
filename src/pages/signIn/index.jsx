import React from "react";
import SignView from "../../components/signView";
import Carousel from "../../components/carousel";

function AdminSignIn() {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-1/2 relative ">
          <Carousel />
        </div>
        <div className="h-screen w-1/2 ">
          <SignView />
        </div>
      </div>
    </>
  );
}
export default AdminSignIn;
