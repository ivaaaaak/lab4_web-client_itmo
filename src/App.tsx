import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
// @ts-ignore
import common from "./styles/common.module.css";

function App() {
    return (
        <div className={common.container}>
            <Header/>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="/*" element={<MainPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
