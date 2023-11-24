import React from "react";

export function AdminAuthLayout(props) {

  return (

    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <main>{props?.children}</main>
      </div>
    </div>
  );
}

export default AdminAuthLayout;
