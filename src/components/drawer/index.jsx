import { useState } from "react";
import logo from "../../assets/images/logo.png";
import VectorLogo from "../../assets/images/VectorLogo.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineYoutube } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [showSubItems, setShowSubItems] = useState(false);
  const [showSubUser, setShowSubUSer] = useState(false);


  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
    if (isCollapsed) {
      setShowSubItems(false);
      setShowSubUSer(false);
    }
  };

  return (
    <div className={`sidebar fixed left-0 top-0 h-screen bg-[#F6F8F9] shadow-slate-50 text-black p-4 ${isCollapsed ? 'collapsed w-28' : 'w-64'}`}>
      <div className="toggle-collapse " onClick={handleToggleCollapse}>
        {isCollapsed ? (
          <div className="flex justify-between ">
            <img src={VectorLogo} alt="Logo" className="h-16 w-24 p-2" />
            <div className="py-4 px-1 cursor-pointer ">
              <AiOutlineMenuUnfold size={30} color="grey" />
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <img src={logo} alt="Logo" className="h-16 w-auto p-2" />
            <div className="p-4 cursor-pointer">
              <AiOutlineMenuFold size={30} color="grey" />
            </div>
          </div>
        )}
      </div>
      <ul>
        <li class="mb-4 mt-14" onClick={() => setShowSubItems(!showSubItems)}>
          <a href="#" class="flex items-center">
            <span class="ml-2 flex">
              <AiOutlineYoutube size={24} color="grey" />
              <p className={!isCollapsed ? '' : 'hidden'}>Items</p>
            </span>
          </a>
        </li>

        {!isCollapsed && showSubItems && (
          <>
            <li className="mb-4 ml-4">
              <Link to="/admin/user/itemDetails" className="flex items-center text-black hover:text-blue">
                <span className="ml-2">Lost Items</span>
              </Link>
            </li>
            <li className="mb-4 ml-4">
              <Link to="/admin/user/foundItems" className="flex items-center text-black hover:text-blue-500">
                <span className="ml-2">Found Items</span>
              </Link>
            </li>
          </>
        )}
        <li class="mb-4" onClick={() => setShowSubUSer(!showSubUser)}>
          <a href="#" class="flex items-center">
            <span class="ml-2 flex">
              <FaUserCircle size={24} color="grey" />
              <p className={!isCollapsed ? '' : 'hidden'}>User</p>
            </span>
          </a>
        </li>
        {!isCollapsed && showSubUser && (
          <>
            <li className="mb-4 ml-4">
              <Link to="/admin/user/users" >
                <span className="ml-2">General Users</span>
              </Link>
            </li>
            <li className="mb-4 ml-4">
              <Link to="/found-items" >
                <span className="ml-2">Business Users</span>
              </Link>
            </li>
          </>
        )}
        <li class="mb-4">
          <a href="#" class="flex items-center">
            <span class="ml-2 mt-80 flex">
              <MdSettings size={24} color="grey" />
              <p className={!isCollapsed ? '' : 'hidden'}>Settings</p>
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;

