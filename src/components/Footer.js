import React, { useContext } from "react";
import styles from "./Footer.module.scss";
import vector from "../assets/Vector.png";
import { TokenContext } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const {myToken} = useContext(TokenContext)
  const navigate = useNavigate()
  return (
    <>
    {myToken ?
      (<><div className={styles.Rectangle32}></div>
      <img className={styles.vector} alt="Vector" src={vector} />
      <p className={styles.classABCD}>classABCD</p>
      <p className={styles.learning}>Learning Center</p>
      <p className={styles.ourMission}>
        Our mission is to prove that learning a language is fun and rewarding.
      </p>
      <button className={styles.home}>Home</button>
      <button className={styles.aboutUs}>About us</button>
      <button className={styles.contact}>Contact us</button>
      <button className={styles.faqs}>FAQs</button>
      <p className={styles.languages}>languages.</p>
      <p className={styles.english}>English</p>
      <p className={styles.chinese}>chinese</p>
      <p className={styles.scolarship}>scholarship</p>
      <p className={styles.allrights}>2023 classABCD.All Rights reserved</p> </>): navigate("/login")}
    </>
  );
};

export default Footer;
