import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useLocation } from 'react-router-dom'

export function AuthLayout(props) {
  const [customClassName, setCustomClassName] = useState("default")
  const location = useLocation();

  useEffect(() => {
    console.log("path Name", location.pathname)
    if (location.pathname.split("/").includes("findMissingItem") 
    || location.pathname.split("/").includes("addMoreDetails") || location.pathname.split("/").includes("businessignup")) {
      setCustomClassName("missing-screen")
    } else if (location.pathname.split("/").includes("mylistings") || location.pathname.split("/").includes("businessHome")) 
    {
      setCustomClassName("my-listing")
    } else if(location.pathname.split("/").includes("")){
      setCustomClassName("main-screen")
    }
  }, [location, customClassName])


  return (
    <div className={`authLayout-${customClassName} layout-image flex flex-col min-h-screen`}>
      <Header />
      <div className="flex-grow">
        <main id="authLayoutContainer">{props?.children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
