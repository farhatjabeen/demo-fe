import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import VectorLogo from "../../assets/images/VectorLogo.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FiCheckCircle, FiUsers, FiUser ,FiSettings} from "react-icons/fi";
import { PiSuitcaseBold } from "react-icons/pi";
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
  const settingsTabWidth = isCollapsed ? "w-12" : "w-52";
  return (
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
            <div className="p-4 cursor-pointer pl-4">
              <AiOutlineMenuFold size={30} color="grey" />
            </div>
          </div>
        )}
      </div>
      <ul>
        <div className="mb-4 mt-14" >
          <li className={`${window.location.pathname.includes("/admin/user/foundItems")
            ? " bg-light-blue text-blue font-bold  py-2 rounded-lg "
            : " "
            }`}
           >
            <Link to="/admin/user/foundItems"  >
              <span className="pl-2 flex">
                <FiCheckCircle size={24} />
                <div className="pl-4 ">
                  <p className={!isCollapsed ? '' : 'hidden'}> Found Items</p>
                </div>
              </span>
            </Link>
          </li>
        </div>
        <li className={`mb-4  ${window.location.pathname.includes("/admin/user/users") || window.location.pathname.includes("/admin/user/businessUser") ? "bg-light-blue text-blue font-bold py-2 rounded-lg" : ""}`} onClick={() => setShowSubUSer(!showSubUser)}>
          <div className="cursor-pointer">
            <span className="pl-2 flex">
              <FiUsers size={24}  onClick={handleToggleCollapse} />
              <div className="pl-4 ">
                <p className={!isCollapsed ? '' : 'hidden'}>Users</p>
              </div>
            </span>
          </div>
        </li>
        {!isCollapsed && showSubUser && (
          <>
            <li className={`mb-4 pl-2 ${window.location.pathname === "/admin/user/users" ? "bg-light-blue text-blue font-bold py-2 rounded-lg" : ""}`}>
              <Link to="/admin/user/users">
                <span className="pl-8 flex" >
                  <FiUser size={24}  />
                  <p className="pl-2">General Users</p></span>
              </Link>
            </li>

            <li className={`mb-4  pl-2 ${window.location.pathname === "/admin/user/businessUser" ? "bg-light-blue text-blue font-bold py-3 rounded-lg" : ""}`}>
              <Link to="/admin/user/businessUser" >
                <span className="pl-8 flex" >
                  <PiSuitcaseBold size={24}  />
                  <p className="pl-2">Business Users</p></span>
              </Link>
            </li>
          </>
        )}
        <li className={`fixed bottom-4 ${window.location.pathname === "/admin/user/settings" ? "bg-light-blue text-blue font-bold py-3 rounded-lg " : ""}${settingsTabWidth}`}>
          <Link to="/admin/user/settings" >
            <span className="pl-2 flex">
              <FiSettings size={26}/>
              <div className="pl-4 ">
                <p className={!isCollapsed ? '' : 'hidden'}>Settings</p>
              </div>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;


