import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { locationDetails, searchKey } from "../redux/reducers/itemsSlice";

export function AuthLayout(props) {
  const [customClassName, setCustomClassName] = useState("default")
  const location = useLocation();
  const searchValue = useSelector(searchKey);
  console.log(searchValue?.list?.length, "searchValue")

  useEffect(() => {
    console.log("path Name", location.pathname)
    if (location.pathname.split("/").includes("findMissingItem") ||
      location.pathname.split("/").includes("addMoreDetails") || location.pathname.split("/").includes("businessignup")) {

      console.log("hi from first if")

      if (location.pathname.split("/").includes("findMissingItem")) {
        if (searchValue?.list?.length === undefined) {
          console.log("hi from zero")
          setCustomClassName("no-missing-items")
        }
        if (searchValue?.list?.length < 4) {
          console.log("hi from less than 4")
          setCustomClassName("missing-items")
        }
        if (searchValue?.list?.length > 4 && searchValue?.list?.length < 8) {
          console.log("hi from less than 8")
          setCustomClassName("missing-items-half-page")
        }
        if (searchValue?.list?.length > 8) {
          console.log("hi from greater than 8")
          setCustomClassName("missing-items-full-page")
        }
      } else {
        console.log("hi from first else")
        setCustomClassName("missing-screen")
      }

    } else if (location.pathname.split("/").includes("mylistings") || location.pathname.split("/").includes("businessHome")) {

      console.log("hi from second if")
      setCustomClassName("my-listing")

    } else if (location.pathname.split("/").includes("")) {

      console.log("hi from third if")
      setCustomClassName("main-screen")

    }
  }, [location, customClassName, searchValue])


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
