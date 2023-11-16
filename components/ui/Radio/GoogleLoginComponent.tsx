import React, { useState } from 'react';
import styles from '@/configuration/CSS/Index.module.css';
import { useSession, signIn, signOut } from "next-auth/react";

const GoogleLoginComponent = ({
  handleSubmit,
  options,
  // onChange,
}: {
  options: { label: string; value: string }[];
  // onChange: (value: string) => void;
  handleSubmit: (val?:string)=>void;
}) => {

  const [selectedValue, setSelectedValue] = useState(0);

  const { data: session, status } = useSession();

  const popupCenter = (url:string, title:string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };


  const changeSelectedValue = (index: number) => {
    if(index == 1){
      // popupCenter("/google-signin", "Sample Sign In")
      signIn()
      setSelectedValue(index)
    }else{
      setSelectedValue(index)
      handleSubmit("no")
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
          className={`${styles.radioLabel} ${selectedValue === 1 ? styles.selected : ''}`}
        >
          {"Yes"}
          <input
            type="radio"
            value={"yes"}
            checked={selectedValue === 1}
            onChange={() => {
              changeSelectedValue(1)
            }}
            className={styles.radioInput}
          />
        </label>
        {/* {selectedValue == 1 && 
        <GoogleSSO handleSubmit={handleSubmit}/>
        } */}
        {<label
          key={"no"}
          className={`${styles.radioLabel} ${selectedValue === 2 ? styles.selected : ''}`}
        >
          {"No"}
          <input
            type="radio"
            value={"no"}
            checked={selectedValue === 2}
            onChange={() => {
              changeSelectedValue(2)
            }}
            className={styles.radioInput}
          />
        </label>}
      {/* ))} */}
    </div>
  );
};

export default GoogleLoginComponent;
