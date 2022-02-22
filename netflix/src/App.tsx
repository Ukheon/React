import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import ReactPlayer from "react-player";
function App() {
    return (
        // <ReactPlayer url="https://www.youtube.com/watchv?v=718032"></ReactPlayer>
        <Router>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home></Home>}>
                    <Route path={"/movies/:movieId"} element={<Home></Home>}></Route>
                </Route>
                <Route path="/tv" element={<Tv></Tv>}></Route>
                <Route path="/search" element={<Search />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
