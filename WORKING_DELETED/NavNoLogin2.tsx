import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Login from "./Login";


const NavNoLogin = () => {
    let navigate = useNavigate();


    return (

            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">Hubble</a>
                        <a className="navbar-brand" href="/login">Login</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">



                            </ul>

                        </div>
                    </div>
                </nav>
            </header>
    );
};

export default NavNoLogin;