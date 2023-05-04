import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import {  ThreeCircles } from "react-loader-spinner";
import { useAuth } from "./context/auth";

import GoogleFontLoader from "react-google-font-loader";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import SearchPage from "./pages/search/SearchPage";
import Details from "./pages/details/Details";
import { LanguageContext } from "./context/LanguageContext";
import { TokenContext } from "./context/TokenContext";
import Chineese from "./pages/chineese/Chineese";
import English from "./pages/english/English";
import Scolarship from "./pages/scolarship/Scolarship";
const App = () => {
  const { token, user, checked } = useAuth();
  const [isEnglishLang, setIsEnglishLang] = useState(true);
  const [isAmharicLang, setIsAmharicLang] = useState(false);
  const [isOromoLang, setIsOromoLang] = useState(false);
  const [myToken, setMyToken] = useState(null);

  function LoginComp() {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  function HomeComp() {
    return (
      <>
        <TokenContext.Provider value={{ myToken, setMyToken }}>
          <LanguageContext.Provider
            value={{
              isEnglishLang,
              setIsEnglishLang,
              isAmharicLang,
              setIsAmharicLang,
              isOromoLang,
              setIsOromoLang,
            }}
          >
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
                <Route path="/scolarship" element={<Scolarship />} />
                <Route path="/english" element={<English />} />
                <Route path="/chineese" element={<Chineese />} />
                <Route path="/details/:id" element={<Details />} />
              </Routes>
            </div>
          </LanguageContext.Provider>
        </TokenContext.Provider>
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
            <ThreeCircles
              height="400"
              width="400"
              color="#f97316"
              ariaLabel="ThreeCircles-loading"
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
