import React, {useEffect, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import Login from "./Login";
import axios from "axios";
import {User} from "../models/User";


const NavNoLogin = () => {
    const [loggedin, setLoggedIn]  = useState<boolean|any>()

    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate();
    const location = useLocation();

    console.log("YOU are logged in ",loggedin)

    const CANDIDATE_PORT = process.env.REACT_APP_CANDIDATE_PORT || "3001";
    const CANDIDATE_URL= "http://localhost:"+ CANDIDATE_PORT

    useEffect(()=>{
        axios.get('userinfo').then((data)=>{
            console.log("HERE>")
            setLoggedIn(true)
            setUser(data.data)
            console.log(data.data)
        }).catch(()=>{
            console.log("IN CATCH>")
            setLoggedIn(false)
        }) },[]
    )

    const logout = async () => {
        await axios.post("logout")
        setUser(null)
        setLoggedIn(false)
        //navigate('/login', { replace: true });
    }

    return (

            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <div>
                            <a className="navbar-brand" href="/">Hubble</a>
                        </div>
                        <div className="navbar-brand ">
                            {user && user?.email ?
                            "Welcome " + user.email
                                : <div></div>}

                        </div>
                        <div>
                            <a className="navbar-brand nav-item" target="_blank" href={ CANDIDATE_URL } >
                                As Candidate
                            </a>

                        </div>
                        <div>
                            <Link to={"/register"} className="navbar-brand nav-item" >
                                Register
                            </Link>
                        </div>
                        <div>


                            {loggedin==false ?
                                <Link className="navbar-brand"  to={{pathname: '/login',}} state={{from: location}} >Login!!</Link>
                                :
                                <div>
                                    <button  onClick={logout} >Logout</button>
                                </div>
                            }

                        </div>

                    </div>
                </nav>
            </header>
    );
};

export default NavNoLogin;