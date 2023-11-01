import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { RiMenuUnfoldLine, RiSettings4Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Link } from "react-router-dom";

const DashBoard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    setShowItems(false);
    setShowUsers(false);
  };

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="h-screen flex">
      <div className="bg-slate-100 p-6">
        <div className={`flex ${isDrawerOpen ? "w-20" : "w-20"}`}>
          <div className="fixed  ">
            <img src={logo} alt="Logo" className="h-14 w-32" />
          </div>
          <div
            className="cursor-pointer  fixed py-4 pl-56"
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? (
              <MdOutlineMenuOpen size={30} />
            ) : (
              <RiMenuUnfoldLine size={24} />
            )}
          </div>
        </div>

        <div
          className={`transition-all duration-300 ${
            isDrawerOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="p-4 mt-20 flex" onClick={toggleItems}>
            <div>
              <ImYoutube size={24} />
            </div>
            {isDrawerOpen && (
              <div className="pl-2 cursor-pointer">
                <p className="hover:text-blue-800 ">Items</p>
              </div>
            )}
          </div>

          {isDrawerOpen && showItems && (
            <div className="pl-8">
              <div>
                <Link to="/foundItems">
                  <p className="hover:text-blue-800 hover:bg-sky-200  rounded-lg cursor-pointer  p-2">
                    Found Items
                  </p>
                </Link>
              </div>
            </div>
          )}

          <div className="p-4 flex" onClick={toggleUsers}>
            <div>
              <FaUserCircle size={24} />
            </div>
            {isDrawerOpen && (
              <div className="pl-2 cursor-pointer">
                <p className="hover:text-blue-800 ">Users</p>
              </div>
            )}
          </div>

          {isDrawerOpen && showUsers && (
            <div className="pl-8">
              <div>
                <p className="cursor-pointer hover:text-blue-800 hover:bg-sky-200   rounded-lg   p-2">
                  General Users
                </p>
              </div>
              <div>
                <p className="cursor-pointer hover:text-blue-800 hover:bg-sky-200  rounded-lg   p-2">
                  Business Users
                </p>
              </div>
            </div>
          )}

          <div className="p-4 flex mt-80">
            <div>
              <RiSettings4Fill size={24} />
            </div>
            {isDrawerOpen && (
              <div className="pl-2">
                <p className="hover:text-blue-800  cursor-pointer">Settings</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
