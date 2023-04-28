import React, { useState } from "react";
import styles from "./Home.module.scss";
import vector2 from "../../assets/Vector2.png";
import vector3 from "../../assets/Vector3.png";
import vector4 from "../../assets/Vector4.png";
import { useNavigate } from "react-router-dom";
import unsplash3 from "../../assets/unsplash3.png";
import unsplash4 from "../../assets/unsplash4.png";
import Footer from "../../components/Footer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Home = () => {
  const navigate = useNavigate();
  const [isScholarship, setIsScolarship] = useState(false);
  const [isAmharic, setIsAmharic] = useState(false);
  const [isAmharicLang, setIsAmharicLang] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);
  const [isChinese, setIsChinese] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div className={styles.Rectangle1}></div>

      <img className={styles.vector2} alt="Vector" src={vector2} />
      {!isAmharicLang ? (
        <p className={styles.classABCD}>classABCD</p>
      ) : (
        <p className={styles.classABCD}>ክላስ ኤቢሲዲ</p>
      )}
      <p className={styles.learning}>Learning Center</p>

      <div className={styles.Rectangle30}></div>
      <div className={styles.Rectangle31}></div>
      <button
        className={styles.Scolarship}
        onClick={() => {
          setIsScolarship(true);
          setIsAmharic(false);
          setIsEnglish(false);
          setIsChinese(false);
        }}
      >
        {!isScholarship ? (
          <>Scholarship</>
        ) : (
          <>
            <div className={styles.RectangleScolarship}>Scholarship</div>
          </>
        )}{" "}
      </button>
      <button
        className={styles.Amharic}
        onClick={() => {
          setIsScolarship(false);
          setIsAmharic(true);
          setIsEnglish(false);
          setIsChinese(false);
        }}
      >
        {!isAmharic ? (
          <>Amharic</>
        ) : (
          <>
            <div className={styles.RectangleAmharic}>Amharic</div>
          </>
        )}
      </button>
      <button
        className={styles.English}
        onClick={() => {
          setIsScolarship(false);
          setIsAmharic(false);
          setIsEnglish(true);
          setIsChinese(false);
        }}
      >
        {!isEnglish ? (
          <>English</>
        ) : (
          <>
            <div className={styles.RectangleEnglish}>English</div>
          </>
        )}
      </button>
      <button
        className={styles.Chinese}
        onClick={() => {
          setIsScolarship(false);
          setIsAmharic(false);
          setIsEnglish(false);
          setIsChinese(true);
        }}
      >
        {!isChinese ? (
          <>Chinese</>
        ) : (
          <>
            <div className={styles.RectangleChinese}>Chinese</div>
          </>
        )}{" "}
      </button>
      <div className="flex flex-row">
        <button onClick={() => navigate("/search")}>
          <div className={styles.Rectangle36}></div>
          <img className={styles.vector3} alt="Vector" src={vector3} />
        </button>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img className={styles.vector4} alt="Vector" src={vector4} />
            <p className={styles.Language}>Language </p>
          </Button>

          <Menu
            id="basic-menu"
            sx={{ left: "1467.18px", top: "115.03px" }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setIsAmharicLang(true);
              }}
            >
              Amharic
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setIsAmharicLang(false);
              }}
            >
              English
            </MenuItem>
          </Menu>
        </div>
      </div>

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
