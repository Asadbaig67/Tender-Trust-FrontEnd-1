import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateTender.module.css";
import dayjs from "dayjs";
import axios from "axios";
// import DatePicker from "../components/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useStateContext } from "../contexts/ContextProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateTender = () => {
  const { currentColor } = useStateContext();
  const account = useSelector((state) => state.web3.account);
  const contract = useSelector((state) => state.web3.contract);

  const currentDate = new Date();

  const [startDate, setStartDate] = useState(
    dayjs(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    )
  );

  const [endDate, setEndDate] = useState(
    dayjs(
      `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    )
  );

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  const [tender, setTender] = useState({
    tenderName: "",
    contractTitle: "",
    description: "",
  });

  const handleChange = (e) => {
    setTender({ ...tender, [e.target.name]: e.target.value });
  };

  // console.log("Contract Is This", contract);
  // console.log("Contract Methods Are ", contract.methods);
  // console.log("Account Is This", account);

  const startTimestamp = Math.floor(
    new Date(startDate.format("YYYY-MM-DD")).getTime() / 1000
  );
  const endTimestamp = Math.floor(
    new Date(endDate.format("YYYY-MM-DD")).getTime() / 1000
  );

  const createTask = async (event) => {
    event.preventDefault();
    if (!contract) {
      alert("Please Connect Your MetaMask First");
    } else {
      try {
        const url = "http://localhost:5000/createTender";

        const data = {
          name: tender.tenderName,
          contractTitle: tender.contractTitle,
          description: tender.description,
          // tenderNumber: parseInt(tender.tenderNumber),
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        };

        const response = await axios.post(url, data);

        if (response.status === 200) {
          const responseData = response.data;
          console.log(responseData);
          if (contract && contract.methods) {
            console.log("Bhupendra Jogi");
            const metaMaskResults = await contract.methods
              .createTender(
                tender.tenderName,
                tender.contractTitle,
                tender.description,
                // parseInt(tender.tenderNumber),
                "gfghh",
                "kjhgfdf"
              )
              .send({ from: account });

            console.log(metaMaskResults);
            // if (metaMaskResults.status) {
            //   alert("Tender Created Successfully");
            // } else {
            //   alert("Tender Not Created Successfully");
            // }
          }
        } else {
          alert("Task cannot be added");
        }
      } catch (error) {
        // Handle errors here
        console.error("There was a problem with the axios request:", error);
      } finally {
        console.log("finally");
      }
    }
  };

  const GetTenders = async (e) => {
    e.preventDefault();
    try {
      // const url = "http://localhost:5000/viewAllTenders";
      const url = "http://localhost:5000/getAllTenders";

      const data = {
        name: tender.tenderName,
        contractTitle: tender.contractTitle,
        description: tender.description,
       // tenderNumber: parseInt(tender.tenderNumber),
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      };

      const response = await axios.post(url, data);

      if (response.status === 200) {
        const responseData = response.data;
        // Handle the responseData as needed
        console.log(responseData);
      } else {
        alert("Task cannot be added");
      }
    } catch (error) {
      // Handle errors here
      console.error("There was a problem with the axios request:", error);
    } finally {
      console.log("finally");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await axios.post(
  //     "http://localhost:5000/tendertrust/ethereum/createTender",
  //     tender.description
  //   );

  //   console.log(response.data);
  // };

  return (
    <div>
      <form className={`mx-auto ${styles.form_container}`}>
        <div className={styles.title_container}>
          <h1 className="text-3xl font-bold gha">Create Tender</h1>
          <span className={styles.subtitle}>
            Please carefully fill all the necessary information.
          </span>
        </div>
        <br />
        <div className="grid gap-4 grid-cols-3">
          <div className={`${styles.input_container}`}>
            <label className={styles.input_label} htmlFor="email_field">
              Tender Name
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              {/* SVG path here */}
            </svg>
            <input
              title="Input title"
              name="tenderName"
              onChange={handleChange}
              type="text"
              className={styles.input_field}
              id="email_field"
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="password_field">
              Contract Title
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              {/* SVG path here */}
            </svg>
            <input
              placeholder=""
              title="Input title"
              onChange={handleChange}
              name="contractTitle"
              type="text"
              className={styles.input_field}
              id="password_field"
            />
          </div>
          <div className={`${styles.input_container}`}>
            <label className={styles.input_label} htmlFor="email_field">
              Start Date
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              {/* SVG path here */}
            </svg>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={startDate} onChange={handleStartDateChange} />
            </LocalizationProvider>
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="password_field">
              Description
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              {/* SVG path here */}
            </svg>
            <input
              placeholder=""
              title="Input title"
              name="description"
              onChange={handleChange}
              type="text"
              className={styles.input_field}
              id="password_field"
            />
          </div>
          <div className={`${styles.input_container}`}>
            <label className={styles.input_label} htmlFor="email_field">
              Tender #
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              {/* SVG path here */}
            </svg>
            <input
              title="Input title"
              name="tenderNumber"
              onChange={handleChange}
              type="number"
              className={styles.input_field}
              id="email_field"
            />
          </div>
          <div className={styles.input_container}>
            <label className={styles.input_label} htmlFor="password_field">
              End Date
            </label>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.icon}
            >
              {/* SVG path here */}
            </svg>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={endDate} onChange={handleEndDateChange} />
            </LocalizationProvider>
          </div>
        </div>

        <button
          title="Sign In"
          onClick={createTask}
          // onClick={GetTenders}
          type="submit"
          style={{ backgroundColor: currentColor }}
          className={`mr-auto ${styles.sign_in_btn}`}
        >
          <span>Add Tender</span>
        </button>

        {/* <div className={styles.separator}>
          <hr className={styles.line} />
          <span>Or</span>
          <hr className={styles.line} />
        </div>
        <p className={styles.note}>Terms of use & Conditions</p> */}
      </form>
    </div>
  );
};

export default CreateTender;
