import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movie from "./Routes/Movie";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import ReactPlayer from "react-player";
import Home from "./Routes/Home";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path={"/test"} element={<Home></Home>}></Route>
                <Route path={"/"} element={<Movie></Movie>}>
                    <Route path={"/movies/:key/:movieId"} element={<Movie></Movie>}></Route>
                </Route>
                <Route path="/tv" element={<Tv></Tv>}></Route>
                <Route path="/search" element={<Search />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
