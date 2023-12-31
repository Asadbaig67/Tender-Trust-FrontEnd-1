import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { Button } from ".";
import { useNavigate } from "react-router-dom";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { IoLogInOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { TiUserAdd } from "react-icons/ti";
import { setUser } from "../Toolkit/Slices/authUserSlice";
import { setpublic } from "../Toolkit/Slices/booleanSlice";
import { setMetaMaskCred } from "../Toolkit/Slices/Web3Slice";
import Wallet from "./Wallet";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.user.authUser);

  // Logout function
  const HandleLogout = () => {
    dispatch(setUser(null));
    dispatch(setpublic(true));
    dispatch(
      setMetaMaskCred({
        web3: null,
        contract: null,
        account: null,
      })
    );
    navigate("/");
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-78">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
      </div>
      {/* <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> Ehtisham </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            tender.trust@gmail.com{" "}
          </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <div className="mt-5">
        <Stack direction="column" spacing={2}>
          {authUser ? (
            <>
              <Button
                variant="contained"
                style={{ backgroundColor: currentColor }}
                endIcon={<BiLogOut />}
                onClick={HandleLogout}
              >
                <Link to="/signup">Logout</Link>
              </Button>
              <Wallet />
            </>
          ) : (
            <>
              <Button
                variant="contained"
                style={{ backgroundColor: currentColor }}
                endIcon={<TiUserAdd />}
              >
                <Link to="/signup">Sign-Up</Link>
              </Button>
              <Button
                style={{ backgroundColor: currentColor }}
                variant="contained"
                endIcon={<IoLogInOutline />}
              >
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default UserProfile;
