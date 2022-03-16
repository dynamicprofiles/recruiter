import React, {useEffect, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import Login from "./Login";
import axios from "axios";
import {User} from "../models/User";
import ReactTooltip from "react-tooltip";


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
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark py-0 ">


                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Hubble</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </div>















                    <div className="collapse topnav-right py-0 navbar-collapse justify-content-end" id="navbarCollapse">

                        <div className="container row">
                            <form className="form-inline d-flex col">
                                <input type="text" className="form-control mr-1" id="inlineFormEmail" placeholder="Search latest skill"/>
                                <input type="text" className="form-control" id="inlineFormEmail" placeholder="Search full"/>
                            </form>
                        </div>
                        <form className="d-flex row">
                            <div className="container col">
                            {user && user?.email ?
                                "Welcome " + user.email
                                : <div></div>}
                            <div className="col">
                            <a className="btn btn-sm btn-outline-success me-2" target="_blank" href={ CANDIDATE_URL }>
                                Candidate
                            </a>
                            </div>
                            {
                                loggedin==false ?
                            <div>
                                <Link className="btn btn-sm btn-outline-success me-2" to={"/register"} replace={true}  >
                                Register
                                </Link></div> : null
                            }
                            <div>
                            {loggedin==false ?
                                <Link className="btn btn-sm btn-outline-success me-2"  to={{pathname: '/login',}} state={{from: location}} >Login!!</Link>
                                :
                                <button className="btn btn-sm btn-outline-success me-2"  onClick={logout} >Logout</button>
                            }
                            </div>
                            </div>
                        </form>
                    </div>

                </nav>

            </header>
    );
};

export default NavNoLogin;