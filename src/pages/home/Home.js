import React from "react";
import styles from "./Home.module.scss";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import { useNavigate } from "react-router-dom";
import unsplash3 from "../../assets/unsplash3.png";
import unsplash4 from "../../assets/unsplash4.png";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.Rectangle1}></div>
      <button onClick={() => navigate("/")}></button>
      <img className={styles.vector2} alt="Vector" src={vector2} />
      <p className={styles.classABCD}>classABCD</p>
      <p className={styles.learning}>Learning Center</p>

      <div className={styles.Rectangle30}></div>
      <div className={styles.Rectangle31}></div>
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
      <p className={styles.Mostpopular}> Most popular</p>
      <div className={styles.Rectangle37}>
        <img className={styles.unsplash} alt="unsplash" src={unsplash3} />
      </div>

      <p className={styles.MostRecent}> Most Recent </p>
      <div className={styles.Frame26}>
        <img className={styles.unsplash4} alt="unsplash" src={unsplash4} />
        <p className={styles.TheclassABCD}>
          The classABCD is an online language education website teaching English
          and Chinese. It is the best platform to learn English, Chinese and
          many other languages
        </p>
        <p className={styles.date}>2023-10-21᎐</p>
      </div>

      <p className={styles.Toprated}> Top rated </p>
      <p className={styles.Mostpopular2}> Most popular </p>
      <p className={styles.Related}> Related </p>
      <Footer />
    </div>
  );
};

export default Home;
