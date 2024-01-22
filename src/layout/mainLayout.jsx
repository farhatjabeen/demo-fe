import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer/index";

import { useLocation } from 'react-router-dom'

export function MainLayout(props) {
  const [customClassName, setCustomClassName] = useState("default")
  const location = useLocation();

  useEffect(() => {
    console.log("path Name", location.pathname)
    if (location.pathname.split("/").includes("findMissingItem") || location.pathname.split("/").includes("addMoreDetails")) {
      setCustomClassName("missing-screen")
    } else if (location.pathname.split("/").includes("mylistings")) {
      setCustomClassName("my-listing")
    }
  }, [location, customClassName])
  return (
    <div className={`mainLayout-${customClassName} layout-image flex flex-col min-h-screen`}>
      <Header />
      <div className="flex-grow">
        <main>{props?.children}</main>
      </div>
      <Footer />
    </div>
  );
}

