import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import Wallet from './components/Wallet';
import CreateTender from "./pages/CreateTender";
import Assign_task from "./components/Assign_task";
import Tender from './components/Tender';
import Dashboard from "./components/Dashboardd";
import Test from "./components/Test";
import Bid from "./components/Bid";
import Login from "./components/Login";
// import 'rsuite/dist/rsuite.min.css';

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  // const [isPublic, setIsPublic] = React.useState(true);
  const isPublicValue = useSelector((state) => state.isPublic.isPublic);
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);


  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </div>
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
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Routes>
                <Route path="/alltenders" element={<Tender />} />
                <Route path="/activetenders" element={<Tender />} />
                <Route path="/create" element={<CreateTender />} />
                <Route path="/assigntask" element={<Assign_task />} />
                <Route path="/bid" element={<Bid />} />
                <Route path="/" element={<Wallet />} />
                <Route path="/test" element={<Test />} />
                <Route path="/login" element={<Login />} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
