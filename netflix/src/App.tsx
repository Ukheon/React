import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./Routes/Movie";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import ReactPlayer from "react-player";
import Home from "./Routes/Home";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import styled from "styled-components";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home></Home>}></Route>
                <Route path={"/movies"} element={<Movie></Movie>}>
                    <Route path={"/movies/:key/:movieId"} element={<Movie></Movie>}></Route>
                </Route>
                <Route path="/tv" element={<Tv></Tv>}></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/search/:id" element={<div></div>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
