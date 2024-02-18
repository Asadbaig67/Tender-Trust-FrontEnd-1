import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import Navbar_1 from "./components/Navbar_1";
import Wallet from './components/Wallet';
import CreateTender from "./pages/CreateTender";
import Assign_task from "./components/Assign_task";
import Tender from './components/Tender';
import Dashboard from "./components/Dashboardd";
import Test from "./components/Test";
import Bid from "./components/Bid";
import Login from "./components/Login";
import AllTendersDisplay from "./components/AllTendersDisplay";
import Public_tenders from "./pages/Public_tenders";
import Signup from "./components/Signup";
import Home from "./pages/Home";
// import 'rsuite/dist/rsuite.min.css';
import GovernmentAttributes from "./components/GovernmentAttributes";
import SingleTenderView from "./components/SingleTenderView";
import AssignTender from "./components/AssignTender";
import BidTender from "./components/BidTender";
import DatePicker from "./components/DatePicker";
import AllTenders from "./components/Alltenders";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  // const [isPublic, setIsPublic] = React.useState(true);
  const location = useLocation();
  const isPublicValue = useSelector((state) => state.bool.isPublic);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();


  const title = "Public Park Renovation";
  const author = "Jane Smith";
  const description = "Renovation project for the local public park. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, adipisci sequi?";


  const authUser = useSelector((state) => state.user.authUser);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      console.log("authUser", authUser);
      setCurrentMode(currentThemeMode);
    }
  }, []);


  console.log("authUser", authUser);
  console.log("isPublicValue", isPublicValue);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {/* <BrowserRouter> */}
      <div className="flex relative dark:bg-main-dark-bg">
        {!isPublicValue && (<div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: "50%" }}
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
          >
            <FiSettings />
          </button>
        </div>)}

        {!isPublicValue && (
          activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )
        )}
        <div
          className={
            activeMenu && !isPublicValue
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full"
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >


          {isPublicValue ? (<div className="fixed w-full bg-white top-0 left-0 z-50">
            {location.pathname === '/login' || location.pathname === '/signup' ? "" : <Navbar_1 />}
          </div>) : (<div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            {location.pathname === '/login' || location.pathname === '/signup' ? "" : <Navbar />}
          </div>)}


          <div className="mt-[60px]">
            {/* <div className="mt-[50px]"> */}
            {themeSettings && < ThemeSettings />}

            <Routes>
              {/* <Route path="/contractor/alltenders" element={<Tender title={title} author={author} description={description} />} />
              <Route path="/govofficial/alltenders" element={<Tender title={title} author={author} description={description} />} /> */}
              <Route path="/contractor/alltenders" element={<AllTenders />} />
              <Route path="/govofficial/alltenders" element={<AllTenders />} />
              <Route path="/activetenders" element={<AllTenders />} />
              <Route path="/govofficial/tender/create" element={<CreateTender />} />
              <Route path="/govofficial/tender/assign" element={<Assign_task />} />
              <Route path="/bid" element={<Bid />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/test" element={<Test />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/alltenderdisplay" element={<AllTendersDisplay />} />
              <Route path="/governmentattributes" element={<GovernmentAttributes />} />
              <Route path="/singletenderview" element={<SingleTenderView />} />
              <Route path="/assigntender" element={<AssignTender />} />
              <Route path="/bidtender" element={<BidTender />} />
              <Route path="/date" element={<DatePicker />} />

              {/* {ALL PUBLIC ROUTES ARE BELLOW} */}
              <Route path="/tenders" element={<Public_tenders />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          {location.pathname === '/login' || location.pathname === '/signup' ? "" : <Footer />}
        </div>
      </div>
      {/* </BrowserRouter> */}
    </div>
  );
};

export default App;
