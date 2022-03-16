import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Login from "./Login";
import axios from "axios";


const NavNoLogin = () => {
    let navigate = useNavigate();
    const location = useLocation()

    const CANDIDATE_PORT = process.env.REACT_APP_CANDIDATE_PORT || "3001";
    const CANDIDATE_URL= "http://localhost:"+ CANDIDATE_PORT

    const logout = async () => {
        await axios.post("logout")
        window.location.reload();
    }

    return (

            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <div>
                            <a className="navbar-brand" href="/">Hubble</a>
                        </div>
                        <div>

                            <Link className="navbar-brand"  to={{pathname: '/logout',  }} >Logout</Link>
                            <form className="d-flex">
                            <Link className="btn btn-outline-success me-1" to={"/login"} replace={true}  onClick={logout}>
                                Log Out
                            </Link>
                            <Link className="nav-item" target={"_blank"} to={CANDIDATE_URL} >
                                As Candidate
                            </Link>

                        </form>
                        </div>

                    </div>
                </nav>
            </header>
    );
};

export default NavNoLogin;