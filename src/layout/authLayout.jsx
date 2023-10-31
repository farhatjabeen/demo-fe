import React, { useEffect, useState } from "react";
import './layout.scss'
import Header from "../components/header";
import Footer from "../components/footer";

export function AuthLayout(props) {

  const [headerContent, setHtmlContent] = useState('');
  const [footerContent, setFooterContent] = useState('');

  useEffect(() => {
    async function fetchHeaderContent() {
      const response = await fetch(process.env.REACT_APP_HEADER_URL);
      const html = await response.text();
      setHtmlContent(html);
    }
    async function fetchFooterContent() {
      const res = await fetch(process.env.REACT_APP_FOOTER_URL);
      const footer = await res.text();
      setFooterContent(footer);
    }
    fetchHeaderContent();
    fetchFooterContent();
  }, []);


  return (
    
    <div className="authLayout flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <main id="mainLayoutContainer">{props?.children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default AuthLayout;
