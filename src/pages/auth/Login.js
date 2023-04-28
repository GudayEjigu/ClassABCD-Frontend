import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom/dist";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/Logo";
import { useAuth } from "../../context/auth";
import vector2 from "../../assets/Vector2.png";
import { CheckBox } from "@material-ui/icons";
import frame from "../../assets/Frame.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const LoginHandler = () => {
    loginMutationSubmitHandler();
  };

  const loginMutation = useMutation(
    async (newData) =>
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}login`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );

  const loginMutationSubmitHandler = async (values) => {
    try {
      loginMutation.mutate(
        { phone: userName, password },
        {
          onSuccess: (responseData) => {
            login(
              responseData?.data?.data?.token,
              responseData?.data?.data?.user
            );
            console.log({ user: responseData?.data?.data });
            navigate("/");

            toast.success("Login success!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          },
          onError: (err) => {
            console.log({ err });
            toast(err?.response?.data?.message ?? "user not found");
          },
        }
      );
    } catch (err) {
      toast(err?.response?.data?.message ?? "user not found2");
    }
  };
  return (
    <div>
      <div className={styles.Rectangle1}></div>
      <img className={styles.vector2} alt="vector2" src={vector2} />
      <p className={styles.classABCD}>classABCD</p>
      <p className={styles.learning}>Learning Center</p>
      <p className={styles.TheclassABCD}>
        {" "}
        The classABCD is an online language education website teaching English
        and Chinese. It is the best platform to learn English, Chinese and many
        other languages{" "}
      </p>
      <div className={styles.Rectangle3}></div>

      <label className={styles.phoneNo}>Phone no:</label>
      <input
        placeholder="+251 91173 90 28"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        className={styles.Rectangle22}
        type="number"
      />
      <br />
      <label className={styles.password}>Password:</label>
      <input
        placeholder="Enter Password"
        className={styles.Rectangle23}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
      />

      <checkbox className={styles.checkbox} />
      <label className={styles.keep}>keep me signed in</label>
      <button className={styles.forgot}>Forgot Password?</button>
      <br />
      {loginMutation.isLoading ? (
        <>
          {" "}
          <button disabled className={styles.Rectangle25}>
            <p className={styles.login}>Logging</p>
          </button>
        </>
      ) : (
        <button
          onClick={LoginHandler}
          type="submit"
          className={styles.Rectangle25}
        >
          <p className={styles.login}>Login</p>
        </button>
      )}
      <button className={styles.Rectangle21}>
        
      <div className={styles.Register}>Register</div>
      </button>
      <img className={styles.frame} alt="frame" src={frame} />

      <Button onClick={handleOpen}>verification</Button>
      <Modal open={open} onClose={handleClose}>
        <Box className={styles.frame4}>
          <Typography className={styles.forgot2}>Forgot password</Typography>
          <Typography className={styles.TheclassABCD2}>
            The classABCD is an online language education website teaching
            English and Chinese. It is the best platform to learn English,
            Chinese and many other languages The classABCD
          </Typography>
          <Typography className={styles.verification}>
            verification code
          </Typography>
          <input
            placeholder=" Enter a verification code"
            type="number"
            className={styles.Rectangle28}
          />

          <button className={styles.frame3}>
            <p className={styles.send}> send</p>
          </button>
        </Box>
      </Modal>

      <Button onClick={handleOpen2}>forgot</Button>
      <Modal open={open2} onClose={handleClose2}>
        <Box className={styles.frame2}>
          <Typography className={styles.forgot2}>Forgot password</Typography>
          <Typography className={styles.phone2}>Phone number</Typography>
          <input
            placeholder=" enter your phone number"
            type="number"
            className={styles.Rectangle27}
          />

          <button className={styles.frame3}>
            <p className={styles.send}> send</p>
          </button>
        </Box>
      </Modal>

      <Button onClick={handleOpen3}>NewPassword</Button>
      <Modal open={open3} onClose={handleClose3}>
        <Box className={styles.frame5}>
          <Typography className={styles.forgot2}>Forgot password</Typography>
          <Typography className={styles.create}>Create new password</Typography>
          <input type="number" className={styles.Rectangle29} />
          <Typography className={styles.confirm}>Confirm password</Typography>
          <input type="number" className={styles.Rectangle30} />

          <button className={styles.frame6}>
            <p className={styles.send2}> Save</p>
          </button>
        </Box>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default Login;
