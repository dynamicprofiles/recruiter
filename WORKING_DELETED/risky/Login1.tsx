import React, {SyntheticEvent, useState} from 'react';
import '../Login.css';
import axios from "axios";
import {Link, Navigate, useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import NavNoLogin from './NavNoLogin'


const Login = (props:any) => {
    const [email, setEmail] = useState<any | null>()
    const [password, setPassword] = useState<any | null>()
    const [redirect, setRedirect] = useState<boolean>(false)
    const [errormessage, setErrormessage] = useState<string>('')
    const [newRedirect, setNewRedirect] = useState<string>('')
    const navigate = useNavigate();
    const location = useLocation()
    let { from } : any = location.pathname || { from: { pathname: "/" } }

    const submit = async (e:SyntheticEvent) => {
        e.preventDefault()
        await axios.post("login",{
            email , password
        }).then((res)=>{
            if (res.data.type=="error") {
                if (res.data?.redirect) {
                    console.log("Redirecting...")
                    setNewRedirect(res.data.redirect)
                } else {
                    console.log(res.data.message)
                    setErrormessage(res.data.message)
                    setTimeout(() => {
                        setErrormessage('')
                    }, 2000);
                    setRedirect(false)
                }
            } else {
                setRedirect(true)
                setErrormessage('')
            }
            console.log(res.data)
        }).catch((error)=>{
            setErrormessage(error)
            console.log(error)
            setRedirect(false)
        })
    }

    if (newRedirect!=="") {
        return <Navigate to={newRedirect} replace={true}/>
    }

    if (redirect) {
        //console.log(props.location.state.previous)
        //navigate(props.location?.state?.previous)
        console.log("Reached here to redirect!")
        //console.log(location.state?["from])
        if (from) {
            console.log(from)
            navigate(from.pathname)
            //navigate(props.location.state?.from)
        }
        //navigate(-1)
        //return <Navigate to={"/"} replace={true}/>
    }


    return (
        <div>
            <NavNoLogin />
            <main className="form-signin position-absolute top-50 start-50 translate-middle">


                <form onSubmit={submit}>

                    { errormessage &&
                        <h5 className="error text-danger"> { errormessage } </h5> }

                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput"
                               onChange={e => setEmail(e.target.value)}
                               placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword"
                               onChange={e => setPassword(e.target.value)}
                               placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

                    <Link to={"/public/forgotpassword"} replace={true} className="nav-item nav-link" >
                        Forgot Password
                    </Link>

                </form>
            </main>

        </div>
    );
};

export default Login;