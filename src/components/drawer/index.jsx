import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import VectorLogo from "../../assets/images/VectorLogo.png";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { FiCheckCircle, FiUsers, FiUser, FiSettings } from "react-icons/fi";
import { PiSuitcaseBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import CommonModal from "../common/commonModal";
import { useDispatch } from "react-redux";
import { adminLogout, clearUserData } from "../../redux/reducers/userSlice";

const SideMenu = () => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [showSubUser, setShowSubUSer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
    if (isCollapsed) {
      setShowSubUSer(true);
    }
  };

  const handleLogout = async () => {
    dispatch(clearUserData());
    const logout = dispatch(adminLogout());
    logout&&navigate('/admin/signIn')
  }

  const settingsTabWidth = isCollapsed ? "w-12" : "w-52";
  return (
    <div className={`sidebar relative bg-grey-light shadow-slate-50 m-4 pl-4`}>
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
      <ul className="w-full">
        <div className="mb-4 mt-14 w-60 " >
          <li className={`${window.location.pathname.includes("/admin/user/foundItems")
            ? " bg-light-blue text-blue font-bold py-2 rounded-lg"
            : " "
            } ${!isCollapsed ? '' : 'w-10'}`}
          >
            <Link to="/admin/user/foundItems?page=1"  >
              <span className="pl-2 flex">
                <FiCheckCircle size={24} />
                <div className={!isCollapsed ? 'pl-4' : ''}>
                  <p className={!isCollapsed ? '' : 'hidden'}> Found Items</p>
                </div>
              </span>
            </Link>
          </li>
        </div>

        <li className={`mb-4`} onClick={() => setShowSubUSer(!showSubUser)}>
          <div className="cursor-pointer">
            <span className="pl-2 flex">
              <FiUsers size={24} onClick={handleToggleCollapse} />
              <div className="pl-4 ">
                <p className={!isCollapsed ? '' : 'hidden'}>Users</p>
              </div>
            </span>
          </div>
        </li>
        {!isCollapsed && showSubUser && (
          <>
            <li className={`mb-4 w-64 pl-2 ${window.location.pathname === "/admin/user/users" ? "bg-light-blue text-blue font-bold py-2 rounded-lg" : ""}`}>
              <Link to="/admin/user/users?page=1">
                <span className="pl-8 flex" >
                  <FiUser size={24} />
                  <p className="pl-2">General Users</p></span>
              </Link>
            </li>

            <li className={`mb-4 w-64 pl-2 ${window.location.pathname === "/admin/user/businessUser" ? "bg-light-blue text-blue font-bold py-2 rounded-lg" : ""}`}>
              <Link to="/admin/user/businessUser?page=1" >
                <span className="pl-8 flex" >
                  <PiSuitcaseBold size={24} />
                  <p className="pl-2">Business Users</p></span>
              </Link>
            </li>
          </>
        )}
        <li className={`fixed bottom-12 w-60 h-10 flex items-center mb-3 ${window.location.pathname === "/admin/user/settings" ? "bg-light-blue text-blue font-bold rounded-lg " : ""}${settingsTabWidth}`}>
          <Link to="/admin/user/settings" >
            <span className="pl-2 flex">
              <FiSettings size={26} />
              <div className="pl-4 ">
                <p className={!isCollapsed ? '' : 'hidden'}>Settings</p>
              </div>
            </span>
          </Link>
        </li>
        <li onClick={() => { setOpenModal(!openModal); }} className={`cursor-pointer pl-2 w-60 h-10 flex items-center fixed bottom-4 ${openModal ? "bg-light-blue text-blue font-bold rounded-lg " : ""}${settingsTabWidth}`}>
          <Link className="flex" to="/admin/user/logout" >
            <RiLogoutBoxLine size={26} />
            <p className={`pl-4 ${!isCollapsed ? '' : 'hidden'}`}>Logout</p>
          </Link>
        </li>
      </ul>
      <CommonModal isOpen={openModal} onCancel={() => setOpenModal(false)}
        title="Logout" 
        description="Are you sure" 
        confirmText="Logout" 
        onConfirm={handleLogout}
        additionalContent='you want to logout?'>

      </CommonModal>
    </div>
  );
};

export default SideMenu;


