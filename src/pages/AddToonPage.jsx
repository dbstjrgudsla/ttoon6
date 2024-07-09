import React from "react";
import Header from "../components/Header";
import { ReactComponent as Navibar } from '../img/Navibar.svg';
import SelectChar from "../components/SelectChar";
import SelectStyle from "../components/SelectStyle";
import SelectPeo from "../components/SelectPeo";
import '../styles/AddToonPage.css'


const AddToonPage = () =>{


    return(
    <>
        <Header />
        <div className="HomeWrapper">
            <div className="ContentsWrapper1">
            <Navibar />
            <SelectStyle />
            <SelectChar />
            <SelectPeo />
        </div>
        </div>
    </>

    )
}

export default AddToonPage;