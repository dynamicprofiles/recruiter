import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import Login from "./Login";
import axios from "axios";
import {User} from "../models/User";
import ReactTooltip from "react-tooltip";


const NavNoLogin = (props:any) => {
    const [loggedin, setLoggedIn]  = useState<boolean|any>()
    //const [recentExperienceSearch, setRecentExperienceSearch] = useState<string>()
    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate();
    const location = useLocation();

    console.log("YOU are logged in ",loggedin)

    const CANDIDATE_PORT = process.env.REACT_APP_CANDIDATE_PORT || "3001";
    const CANDIDATE_HOST = process.env.REACT_APP_CANDIDATE_HOST || "localhost";
    const CANDIDATE_SITE_PROTOCOL = process.env.REACT_APP_CANDIDATE_SITE_PROTOCOL || "http";

    const CANDIDATE_URL= CANDIDATE_SITE_PROTOCOL+"://"+CANDIDATE_HOST+":"+CANDIDATE_PORT

    useEffect(()=>{
        axios.get('userinfo').then((data)=>{

            console.log("HERE>")
            setLoggedIn(true)
            //setUser(data.data)
            console.log(data.data)
        }).catch(()=>{
            console.log("IN CATCH>")
            setLoggedIn(false)
        }) },[]
    )

    const logout = async (e:SyntheticEvent) => {
        e.preventDefault()
        await axios.post("logout").then(res=>{
            setUser(null)
            setLoggedIn(false)
        }).catch(res=>{

        })
        //setUser(null)
        //setLoggedIn(false)
        //navigate('/login', { replace: true });
    }

    return (

            <header>


                <nav className="navbar navbar-expand-md navbar-dark static-top bg-dark">
                    <div className="container-fluid">
                        <div className={"col-lg-1 pr-5 pl-14"}>
                            <a className="navbar-brand" href="/public/profiles">Hubble</a>
                        </div>
                        <div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse topnav-right py-0 navbar-collapse justify-content-end" id="navbarCollapse">


                            <form className="d-flex row">
                                <div className={"col-xm-1 col-sm-6 col-md-6 col-lg-3 col-xl-3"}>
                                    <input type="text" className="form-control mr-1" id="inlineFormEmail" placeholder="Search latest skill"
                                           value={props.title}
                                           onChange={e => props.childToParent(e.target.value)} />
                                </div>

                                <div className={"col-xm-1 col-sm-6 col-md-6 col-lg-3 col-xl-3"}>
                                {
                                    loggedin==false ?
                                        <div>
                                            <Link className="btn btn-sm btn-outline-success me-2" to={"/register"} replace={true}  >
                                                Register
                                            </Link></div> : null
                                }
                                </div>


                                <div className={"col-xm-1 col-sm-6 col-md-6 col-lg-3 col-xl-2"}>
                                    <a className="btn btn-sm btn-outline-success me-2" target="_blank" href={ CANDIDATE_URL } >
                                        As Candidate
                                    </a>
                                </div>




                                <div className={"col-xm-1 col-sm-6 col-md-6 col-lg-3 col-xl-2"}>
                                {loggedin==false ?
                                    <Link className="btn btn-sm btn-outline-success me-2"  to={{pathname: '/login',}} state={{from: location}} >Login!!</Link>
                                    :
                                    <button className="btn btn-sm btn-outline-success me-2"  onClick={logout} >Logout</button>
                                }
                                </div>
                            </form>
                        </div>
                    </div>
                </nav>

            </header>
    );
};

export default NavNoLogin;