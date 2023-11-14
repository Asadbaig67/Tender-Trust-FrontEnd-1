import React, { useState } from "react";
import { IoIosMore } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useStateContext } from "../contexts/ContextProvider";
// import Button from "./Button";
import product9 from "../data/product9.jpg";

const Tender = ({ title, author, description }) => {
  const { currentColor, currentMode } = useStateContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="w-auto bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl">
              <div className="">
                {/* <img className="md:w-96 h-50 " src={product9} alt="" /> */}
                <div className="">
                  <p className="font-semibold text-lg">{title}</p>
                  <p className=" ">{author}</p>
                  <p className="text-sm mt-3 ">{description}</p>
                  {/* <div className="mt-3">
                    <Button
                      // variant="contained"
                      // color="primary"
                      onClick={handleOpen}
                      sx={{
                        // borderRadius: "20px",
                        backgroundColor: currentColor,
                        color: currentMode === "light" ? "black" : "white",
                      }}
                    >
                      View Details
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
      <div className="w-auto mx-3 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Tender</p>
          <button type="button" className="text-xl font-semibold text-gray-500">
            <IoIosMore />
          </button>
        </div>
        <div className="mt-10">
          {/* <img className="md:w-96 h-50 " src={product9} alt="" /> */}
          <div className="mt-8">
            <p className="font-semibold text-lg">{title}</p>
            <p className="text-gray-400 ">{author}</p>
            <p className="mt-8 text-sm text-gray-400">{description}</p>
            <div className="mt-3">
              <Button
                // variant="contained"
                // color="primary"
                onClick={handleOpen}
                sx={{
                  // borderRadius: "20px",
                  backgroundColor: currentColor,
                  color: currentMode === "light" ? "black" : "white",
                }}
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tender;
