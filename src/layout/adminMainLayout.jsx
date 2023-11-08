import React, { useState } from "react";
import Drawer from "../components/drawer";

export function AdminMainLayout(props) {
  return (
    <div className="flex min-h-screen">
      <Drawer />
      <div className="flex-grow overflow-y-auto bg-[#ffffff]">
        <main>{props?.children}</main>
      </div>
    </div>
  );
}

