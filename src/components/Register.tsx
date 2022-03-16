import React, {Component, SyntheticEvent, useState} from 'react';
import axios from "axios";
import NavNoLogin from "./NavNoLogin";

import { Navigate } from 'react-router-dom';



class Register extends Component {
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    confirmPassword = '';
    state = {
        redirect : false,
        errorMessage: ''
    }


    submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('register',{
            email : this.email,
        }).then((res)=>{
            if (res.data.type=="error") {
                this.setState({errorMessage: res.data.message})
                setTimeout(()=>{
                    this.setState({
                        redirect: true
                    })
                },3000)
            } else {

                this.setState({errorMessage: "You are sent an email please check!"})
            }
        }).catch((res)=>{
            this.setState({errorMessage: res.data.message})
            setTimeout(()=>{
                this.setState({
                    redirect: true
                })
            },3000)
        });
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={"/login"} />
        }
        return (
            <div>
                <NavNoLogin />
                <main className="form-signin position-absolute top-50 start-50 translate-middle">

                    { this.state.errorMessage &&
                        <h5 className="error text-danger"> { this.state.errorMessage } </h5> }

                    <form onSubmit={this.submit}>
                        <h1 className="h3 mb-3 fw-normal">Realize Your Potential!</h1>


                        <div className="form-floating">
                            <input type="email" className="form-control" id="email" onChange={e=> this.email= e.target.value}
                                   placeholder="name@example.com"/>
                            <label htmlFor="email">Email address</label>
                        </div>


                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                    </form>
                </main>

            </div>
        );
    }
}

export default Register;


