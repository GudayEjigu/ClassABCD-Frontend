import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import { Bars } from "react-loader-spinner";
import { useAuth } from "./context/auth";

import GoogleFontLoader from "react-google-font-loader";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import SearchPage from "./pages/search/SearchPage";
import Details from "./pages/details/Details";

const App = () => {
  const { token, user, checked } = useAuth();
  function LoginComp() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  function HomeComp() {
    return (
      <>
        {" "}
        <GoogleFontLoader
          fonts={[
            {
              font: "Poppins",
              weights: [300, "400i"],
            },
          ]}
        />
        <div className=" overflow-x">
          <Routes>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/details" element={<Details />} />
          </Routes>
          
        </div>
      </>
    );
  }

  function RoutComp() {
    if (token && user) {
      return (
        <>
          <HomeComp />
        </>
      );
    } else {
      return <LoginComp />;
    }
  }
  return (
    <div>
      <>
        {checked ? (
          <RoutComp />
        ) : (
          <div className="h-44 flex items-center justify-center min-h-screen">
            <Bars
              height="40"
              width="40"
              color="#f97316"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default App;
