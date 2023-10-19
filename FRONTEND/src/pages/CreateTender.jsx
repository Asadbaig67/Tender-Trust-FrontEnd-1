import React from "react";
import styles from "./CreateTender.module.css";

const CreateTender = () => {
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
              name="input-name"
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
              name="input-name"
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
              name="input-name"
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
              name="input-name"
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

        <button title="Sign In" type="submit" className={`mr-auto ${styles.sign_in_btn}`}>
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
