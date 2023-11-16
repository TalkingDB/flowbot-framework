import React, { useState } from 'react';
import styles from '@/configuration/CSS/Index.module.css';
import { useSession, signIn, signOut } from "next-auth/react";

const GoogleLoginComponent = ({
  handleSubmit,
  value,
  options,
  // onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  // onChange: (value: string) => void;
  handleSubmit: (val?: string) => void;
}) => {

  const [selectedValue, setSelectedValue] = useState(value);

  const { data: session, status } = useSession();

  const changeSelectedValue = (item: string) => {
    if (item === "Yes") {
      // popupCenter("/google-signin", "Sample Sign In")
      if (status === "authenticated") {
        handleSubmit(session.user.email || "")
      } else {
        signIn("google")
      }
      setSelectedValue(item)
    } else {
      setSelectedValue(item)
      handleSubmit("No")
      // onChange("no")
    }
  }

  console.log(status)

  console.log(selectedValue)
  return (
    <div className={styles.radioGroup}> {/* Apply a class from the imported CSS module */}
      {/* {options.map((option, index) => ( */}
      <label
        key={"yes"}
        className={`${styles.radioLabel} ${selectedValue === "Yes" ? styles.selected : ''}`}
      >
        {"Yes"}
        <input
          type="radio"
          value={"yes"}
          checked={selectedValue === "Yes"}
          onChange={() => {
            changeSelectedValue("Yes")
          }}
          className={styles.radioInput}
        />
      </label>
      {/* {selectedValue == 1 && 
        <GoogleSSO handleSubmit={handleSubmit}/>
        } */}
      {<label
        key={"no"}
        className={`${styles.radioLabel} ${selectedValue === "No" ? styles.selected : ''}`}
      >
        {"No"}
        <input
          type="radio"
          value={"no"}
          checked={selectedValue === "No"}
          onChange={() => {
            changeSelectedValue("No")
          }}
          className={styles.radioInput}
        />
      </label>}
      {/* ))} */}
    </div>
  );
};

export default GoogleLoginComponent;
