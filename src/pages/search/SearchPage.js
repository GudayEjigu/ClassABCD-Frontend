import React from "react";
import styles from "./SearchPage.module.scss";
import { useNavigate } from "react-router-dom";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import vector5 from "../../assets/Vector5.png";
import Footer from "../../components/Footer";

const SearchPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <div className={styles.Rectangle1}></div>
      <button onClick={() => navigate("/")}>
        <img className={styles.vector2} alt="Vector" src={vector2} />
        <p className={styles.classABCD}>classABCD</p>
        <p className={styles.learning}>Learning Center</p>
      </button>
      <div className={styles.Rectangle30}></div>
      <div className={styles.Rectangle33}></div>
      <button className={styles.Scolarship}>Scolarship</button>
      <button className={styles.Amharic}>Amharic</button>
      <button className={styles.English}>English</button>
      <button className={styles.Chinese}>Chinese</button>
      <button onClick={() => navigate("/search")}>
        <div className={styles.Rectangle36}></div>
        <img className={styles.vector3} alt="Vector" src={vector3} />
      </button>
      <img className={styles.vector4} alt="Vector" src={vector4} />
      <p className={styles.Language}>Language </p>
      <input className={styles.RectangleSearch} />
      <img className={styles.vector5} alt="Vector" src={vector5} />
      <div className={styles.Rectangle31}></div>
      <p className={styles.Search}>Search</p>
      <div className={styles.Rectangle37}></div>
      <div className={styles.Rectangle38}></div>
      <div className={styles.Rectangle39}></div>
      <div className={styles.Rectangle40}></div>
      <div className={styles.Rectangle41}></div>
      <div className={styles.Rectangle42}></div>
      <div className={styles.Rectangle47}></div>
      <div className={styles.Rectangle44}></div>
      <div className={styles.Rectangle45}></div>
      <div className={styles.Rectangle46}></div>
      <div className={styles.Rectangle48}></div>
      <p className={styles.latest}>latest </p>
      <p className={styles.Results}> Results </p>
      <p className={styles.Mostpopular}> Most popular </p>
      <Footer />
    </div>
  );
};

export default SearchPage;
