import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./CreateTender.module.css";
import axios from "axios";

const CreateTender = () => {
  const account = useSelector((state) => state.web3.account);
  const contract = useSelector((state) => state.web3.contract);

  const [tender, setTender] = useState({
    tenderName: "",
    contractTitle: "",
    startDate: "",
    endDate: "",
    description: "",
    tenderNumber: "",
  });

  const handleChange = (e) => {
    setTender({ ...tender, [e.target.name]: e.target.value });
  };

  const createTask = async (event) => {
    event.preventDefault();

    try {
      const url = "http://localhost:5000/createTender";
      const description = tender.description;

      // const response = await axios.post(url, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   params: {
      //     description: JSON.stringify(description),
      //   },
      // });
      const response = await axios.post(url);

      if (response.status === 200) {
        const responseData = response.data;
        // Handle the responseData as needed
        console.log(responseData);

        if (contract && contract.methods) {
          await contract.methods
            .CreateTender(tender.description)
            .send({ from: account });
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
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const response = await axios.post(
  //     "http://localhost:5000/tendertrust/ethereum/createTender",
  //     tender.description
  //   );

  //   console.log(response.data);
  // };

  console.log(tender);
  console.log(account);
  console.log(contract);

  return (
    <div>
      <form className={`mx-auto ${styles.form_container}`}>
        <div className={styles.logo_container}></div>
        <div className={styles.title_container}>
          <p className={styles.title}>Create Tender</p>
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
            <input
              title="Input title"
              name="input-name"
              type="text"
              className={styles.input_field}
              id="email_field"
            />
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
              type="text"
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
            <input
              placeholder=""
              title="Input title"
              name="input-name"
              type="text"
              className={styles.input_field}
              id="password_field"
            />
          </div>
        </div>

        <button
          title="Sign In"
          onClick={createTask}
          type="submit"
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
