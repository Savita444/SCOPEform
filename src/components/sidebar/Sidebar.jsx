import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import logo from "../../assets/images/L1.png";
import { Sidebar as MenuBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  MdOutlineClose,
  MdHome,
  MdOutlineArticle ,
  MdLogout,
  MdPassword,
  MdOutlinePermContactCalendar,
} from "react-icons/md";
import { RiTeamFill, RiContactsBookLine, RiFileListLine } from "react-icons/ri";
import { FiUsers, FiList, FiFileText, FiUploadCloud } from "react-icons/fi";
import {
  AiOutlineAppstoreAdd,
  AiOutlineProject,
} from "react-icons/ai";
import { BsNewspaper, BsBuilding, BsChatSquareQuote } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";
import { TitleContext } from "../../context/TitleContext";
import { IoIosOptions, IoIosPeople } from "react-icons/io";
// Sidebar menu structure
const SidebarMenu = [
  {
    menu: "Home",
    url: "/dashboard",
    mainIcon: <MdHome size={24} />,
    subMenu: [
      // {
      //   subMenus: "Intern Joining",
      //   url: "/interjoining",
      //   icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      // },
      {
        subMenus: "Interns List",
        url: "/viewinterjoining",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },

      {
        subMenus: "View Joining",
        url: "/viewjoining",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
      // {
      //   subMenus: "Completion",
      //   url: "/completion",
      //   icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      // },
      {
        subMenus: "View Completion",
        url: "/viewcompletion",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
      // {
      //   subMenus: "Id Card Issue",
      //   url: "/IdCardIssue",
      //   icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      // },

      {
        subMenus: "View Id Card",
        url: "/ViewIdCard",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },

      {
        subMenus: "View T3 Sheet",
        url: "/ViewT3Sheet",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },


    ],
  },

  {
    menu: "Our Courses",
    url: "/dashboard",
    mainIcon: <MdOutlineArticle size={24} />,
    subMenu: [
      {
        subMenus: "Add Course",
        url: "/addcourse",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Add Sub Course",
        url: "/addsubcourse",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },
      {
        subMenus: "Add Sub sub Course",
        url: "/addsubsubcourse",
        icon: <AiOutlineProject style={{ color: "red" }} size={24} />,
      },

      
    ],
  },
  
  
  
  {
    menu: "Logout",
    url: "/logout",
    mainIcon: <MdLogout size={24} />,
    subMenu: [],
  },

  // {
  //   menu: "Forgot Password",
  //   url: "/forgotpassword",
  //   mainIcon: <MdPassword size={24} />,
  //   subMenu: [],
  // },
];



const BDESidebar = [
  

  
  {
    menu: "Popup Enquiry",
    url: "/ViewPopupEnquiry",
    mainIcon: <AiOutlineProject style={{ color: "red" }} size={24} />,      
    subMenu: [],
  },

  {
    menu: "Implant Training List",
    url: "/ViewImplanttraining",
    mainIcon: <AiOutlineProject style={{ color: "red" }} size={24} />,      
    subMenu: [],
  },

  {
    menu: "Logout",
    url: "/logout",
    mainIcon: <MdLogout size={24} />,
    subMenu: [],
  },

  // {
  //   menu: "Forgot Password",
  //   url: "/forgotpassword",
  //   mainIcon: <MdPassword size={24} />,
  //   subMenu: [],
  // },
];



// Sidebar Component
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);
  const { setTitle } = useContext(TitleContext);
  const [activeMenu, setActiveMenu] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState("");

  // Retrieve email from localStorage
  const userEmail = localStorage.getItem("user_email");

  // Determine which sidebar menu to show
  const menuToRender = userEmail === "bde@sumagoinfotech.com" ? BDESidebar : SidebarMenu;

  // Close sidebar on clicking outside
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  // Close sidebar on window resize
  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle main menu click
  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
    setActiveSubMenu("");
    setTitle(menu);
  };

  // Handle sub menu click
  const handleSubMenuClick = (subMenu) => {
    setActiveSubMenu(subMenu);
  };

  return (
    <nav ref={navbarRef} className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img className="w-75 m-2" src={logo} alt="Logo" />
        </div>
        <Button variant="outline-danger" className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </Button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <MenuBar>
            <Menu>
              {menuToRender.map((item, id) => (
                <div key={id}>
                  {item.subMenu.length > 0 ? (
                    <SubMenu
                      className={`menu-link-text bg-white ${activeMenu === item.menu ? "active" : ""}`}
                      icon={item.mainIcon}
                      label={item.menu}
                      open={activeMenu === item.menu}
                      onClick={() => handleMenuClick(item.menu)}
                    >
                      {item.subMenu.map((subItem, subId) => (
                        <MenuItem
                          key={subId}
                          component={<Link to={subItem.url} />}
                          icon={subItem.icon}
                          className={`menu-link-text bg-white ${
                            activeSubMenu === subItem.subMenus ? "active" : ""
                          }`}
                          onClick={() => handleSubMenuClick(subItem.subMenus)}
                        >
                          {subItem.subMenus}
                        </MenuItem>
                      ))}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      icon={item.mainIcon}
                      className={`menu-link-text bg-white ${activeMenu === item.menu ? "active" : ""}`}
                      onClick={() => {
                        handleMenuClick(item.menu);
                        closeSidebar();
                      }}
                      component={<Link to={item.url} />}
                    >
                      {item.menu}
                    </MenuItem>
                  )}
                </div>
              ))}
            </Menu>
          </MenuBar>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;


