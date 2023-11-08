import React from "react";
import Header from "../components/header";
import Footer from "../components/footer/index";

export function MainLayout(props) {
  return (
    <div className="mainLayout flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <main>{props?.children}</main>
      </div>
      <Footer />
    </div>
  );
}

