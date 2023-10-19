import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { SiShopware } from "react-icons/si";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { setUserProfile } from "../Toolkit/Slices/booleanSlice";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{ color }}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const dispatch = useDispatch();

  // State Variables
  const isPublic = useSelector((state) => state.bool.isPublic);
  const user = useSelector((state) => state.bool.userProfile);
  const authUser = useSelector((state) => state.user.authUser);

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {isPublic ? (
        <Link
          to="/"
          className="items-center gap-3 ml-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <SiShopware /> <span>Tender Trust</span>
        </Link>
      ) : (
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />
      )}
      {isPublic ? (
        <ul class="flex flex-row my-auto">
          <h4 className="mx-4">
            <Link
              class="items-center mx-4 flex text-xl tracking-tight dark:text-white text-slate-900"
              to="/"
            >
              Tenders
            </Link>
          </h4>
          <h4 className="mx-4">
            <Link
              to="/tender-insights"
              class="items-center mx-4  flex text-xl tracking-tight dark:text-white text-slate-900"
              href="#"
            >
              Tender Insights
            </Link>
          </h4>
          <h4 className="mx-4">
            <Link
              to="/tender-status"
              class="items-center mx-4 flex text-xl tracking-tight dark:text-white text-slate-900"
              href="#"
            >
              Tender Status
            </Link>
          </h4>
        </ul>
      ) : (
        ""
      )}

      <div className="flex">
        {/* <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        /> */}
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => dispatch(setUserProfile(!user))}
        >
          <img
            className="rounded-full w-8 h-8"
            src={avatar}
            alt="user-profile"
          />
          {authUser && (
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {authUser.user.name}
              </span>
            </p>
          )}
          <MdKeyboardArrowDown className="text-gray-400 text-14" />
        </div>

        {/* {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />} */}
        {/* {isClicked.userProfile && <UserProfile />} */}
        {user && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
