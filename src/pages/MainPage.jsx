import React from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import "../styles/MainPage.css";
import { ReactComponent as OnBoarding } from "../img/OnBoarding.svg";

const MainPage = () => {
  return (
    <>
      <Header />
      <OnBoarding />
    </>
  );
};

export default MainPage;
