import logo from './logo.svg';
import './App.css';
import NavNoLogin from "./components/NavNoLogin";
import {Route,Routes, Navigate } from "react-router-dom";
import {SyntheticEvent, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "./components/Login";
import SearchProfiles2 from "./components/SearchProfiles2";
import Status from "./components/Status";
import Register from "./components/Register";

//http://localhost:8000/public/profiles?title=asdsad&description=&active=false
function App(props: any) {

  return (
    <div className="App">

      <Routes>
          <Route path={"/status"} element={<Status />}/>

          <Route path={"/login"} element={<Login />}/>


          <Route path={"/"}  element={<Navigate to={"/public/profiles"} />}/>
        <Route path={"/public/profiles"} element={<SearchProfiles2 />}/>

          <Route path={"/register"} element={<Register />}/>

      </Routes>


    </div>
  );
}

export default App;
