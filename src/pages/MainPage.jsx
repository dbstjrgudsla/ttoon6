import React from "react";
import Header from "../components/Header";
import Contents from "../components/Contents";
import '../styles/MainPage.css'

const MainPage = () => {
    return (
        <>
        <Header />
        <div className="Wrapper"  style={{ display: 'flex',flexDirection:'column',alignItems: 'center',height:'89vh'}}>
        <Contents />
        </div>
        </>
    );
}

export default MainPage;