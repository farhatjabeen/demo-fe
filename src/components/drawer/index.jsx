import { useState } from "react";
import logo from "../../assets/images/logo.png";
import VectorLogo from "../../assets/images/VectorLogo.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Items");

  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  const handleMenuSelect = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className={`sidebar fixed left-0 top-0 h-screen bg-[#F6F8F9] shadow-slate-50 text-black p-4 ${isCollapsed ? 'collapsed w-28' : 'w-64'}`}>
      <div className="toggle-collapse" onClick={handleToggleCollapse}>
        {isCollapsed ? (
          <div className="flex justify-between">
            <img src={VectorLogo} alt="Logo" className="h-16 w-24 p-2" />
            <div className="py-4 px-1">
              <AiOutlineMenuUnfold size={30} color="black-800" />
            </div>
          </div>
        ) : ( // open
          <div className="flex justify-between">
            <img src={logo} alt="Logo" className="h-16 w-auto p-2" />
            <div className="p-4">
              <AiOutlineMenuFold size={30} color="black-800" />
            </div>
          </div>
        )}
      </div>
      {isCollapsed ? (
        <ul>
          <li class="mb-4" onClick={() => handleMenuSelect("Items")}>
            {/* <a href="#" class="flex items-center "> */}
            <a href="#" class={`flex items-center ${selectedMenu === "Items" ? "text-blue-500" : "text-black"}`}>
              <span class="ml-2">Items</span>
            </a>
          </li>
          {!isCollapsed && selectedMenu === "Items" && (
            <>
              <li className="mb-4 ml-4">
                <Link to="/lost-items" className="flex items-center text-black hover:text-blue-500">
                  <span className="ml-2">Lost Items</span>
                </Link>
              </li><li className="mb-4 ml-4">
                <Link to="/found-items" className="flex items-center text-black hover:text-blue-500">
                  <span className="ml-2">Found Items</span>
                </Link>
              </li>
            </>
          )}
          <li class="mb-4">
            <a href="#" class="flex items-center">
              <span class="ml-2">Settings</span>
            </a>
          </li>
        </ul>
      ) : ( // open
        <ul>
          <li class="mb-4">
            <a href="#" class="flex items-center">
              <span class="ml-2">Items</span>
            </a>
          </li>
          <li class="mb-4">
            <a href="#" class="flex items-center">
              <span class="ml-2">Settings</span>
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SideMenu;
