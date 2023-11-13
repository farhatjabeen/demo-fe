import { useState } from "react";
import logo from "../../assets/images/logo.png";
import VectorLogo from "../../assets/images/VectorLogo.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineYoutube } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [showSubUser, setShowSubUSer] = useState(false);


  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
    if (isCollapsed) {
      setShowSubUSer(true);
    }
  };

  return (
    // <div className={`sidebar   fixed left-0 top-0 h-screen bg-[#F6F8F9] shadow-slate-50 text-black p-4 ${isCollapsed ? 'collapsed w-28' : 'w-64'}`}>
    <div className="sidebar relative bg-[#F6F8F9] shadow-slate-50 m-4">
      <div className="toggle-collapse " onClick={handleToggleCollapse}>
        {isCollapsed ? (
          <div className="flex justify-between ">
            <img src={VectorLogo} alt="Logo" className="h-16 w-auto p-2" />
            <div className="py-4 px-1 cursor-pointer ">
              <AiOutlineMenuUnfold size={30} color="grey" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <img src={logo} alt="Logo" className="h-16 w-auto" />
            <div className="p-4 cursor-pointer ml-4">
              <AiOutlineMenuFold size={30} color="grey" />
            </div>
          </div>
        )}
      </div>
      <ul>
        <div class="mb-4 mt-14 " >
        <li className={`${window.location.pathname === "/admin/user/foundItems"
              ? " bg-light-blue text-blue font-bold  py-2   rounded-lg "
              : " "
            }`}>
          <Link to="/admin/user/foundItems"  >
            <span class="ml-2 flex">
              <AiOutlineYoutube size={24} color="grey" />
              <div className="pl-4 ">
                <p className={!isCollapsed ? '' : 'hidden'}> Found Items</p>
              </div>
            </span>
          </Link>
        </li>
        </div>
        <li class="mb-4" onClick={() => setShowSubUSer(!showSubUser)}>
          <div className="cursor-pointer">
            <span class="ml-2 flex">
              <FaUserCircle size={24} color="grey"  />
              <div className="pl-4 cursor-pointer">
                <p className={!isCollapsed ? '' : 'hidden'}>Users</p>
              </div>
            </span>
          </div>
        </li>
        {!isCollapsed && showSubUser && (
          <>
            <li className="mb-4 ml-4">
              <Link to="/admin/user/users" className={`${window.location.pathname === "/admin/user/users"
                  ? " bg-light-blue text-blue font-bold  py-3  pr-16 rounded-lg "
                  : " "
                }`}>
                <span className="pl-8">General Users</span>
              </Link>
            </li>
            <li className="mb-4 ml-4 ">
              <Link to="/admin/user/businessUser" className={`${window.location.pathname === "/admin/user/businessUser"
                  ? " bg-light-blue text-blue font-bold  py-3  pr-14  rounded-lg "
                  : ""
                }`}>
                <span className="pl-8">Business Users</span>
              </Link>
            </li>
          </>
        )}
        <li className="fixed bottom-4" >
          <div>
            <span class="ml-2  flex">
              <MdSettings size={24}  color="grey"/>
              <div className="pl-4">
                <p className={!isCollapsed ? '' : 'hidden'}>Settings</p>
              </div>
            </span>
          </div>
        </li>
        </ul>
    </div>
  );
};

export default SideMenu;


