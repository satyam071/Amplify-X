import React from "react";
import {Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage/Home.Page";
import AuthPage from "./Pages/Auth.Page";
import ListenRelease from "./Pages/Listen_Music.Page";
import CreateRelease from "./Pages/Create_Music.Page";
import ErrorPage from "./Pages/Error.Page";
import NavBar from "./Pages/HomePage/Components/NavBar";
import Footer from "./Pages/HomePage/Components/Footer";
import CreateAlbum from "./Pages/Create_album";
import MusicPage from "./Pages/MusicPage";

interface Props {

}

const App: React.FC<Props> = (props) =>{
  return (
    <div className="font-cormorant  text-xl bg-black text-white">
      <NavBar/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace/>}></Route>
          <Route path="/home" element={<HomePage/>}></Route>
          <Route path="/auth" element={<AuthPage/>}></Route>
          <Route path="/listen-music" element={<ListenRelease/>}></Route>
          <Route path="/create-music" element={<CreateRelease/>}></Route>
          <Route path="/create-album" element={<CreateAlbum/>}></Route>
          <Route path="/music/:id" element={<MusicPage/>}></Route>
          <Route path="/*" element={<ErrorPage/>}></Route>
        </Routes>
      <Footer/>
    </div>
  );
};

export default App;