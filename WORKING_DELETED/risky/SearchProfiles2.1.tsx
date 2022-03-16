import React, {SyntheticEvent, useEffect, useState} from 'react';
import NavNoLogin from "./NavNoLogin";
import ReactTooltip from "react-tooltip";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Profile} from "../models/Profile";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import {Chat} from "../models/Chat";
import {Mail} from "../models/Mail";

function SearchProfiles2(props:any) {

    let navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [active, setActive] = useState('false')


    const [subject, setSubject] = useState<string>()
    const [emailText, setEmailText] = useState<string>()

    const [sendMailrandomUniqie, setSendMailrandomUniqie] = useState<string>('')

    var urlParams = new URLSearchParams(window.location.search);

    //const [searchParams] = useSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    //const params = Object.fromEntries([...searchParams]);
    let queryStringTitle = searchParams.get('title');
    let queryStringDescription = searchParams.get('description');

    let [result, setResult] = useState<[Profile|any]>()

    useEffect( ()=>{
        if (queryStringTitle != null ) {
            setTitle(queryStringTitle)
        }

        if (queryStringDescription != null ) {
            setDescription(queryStringDescription)
        }
        //If there is a query string in URL, then we get data as per that. and no change in URL.
        if (searchParams.toString()) {
            axios.get("public/profiles?" + searchParams.toString()).then(res => {
                console.log("Success to post search QS!")
                console.log(res)
                setResult(res.data.result)
                console.log(result)
            }).catch(res => {
                console.log(axios.defaults.baseURL)
                console.log("Failed to post search QS with error ", res)
            })
        }
    },[])


    //You come here when you click on search button. and may have query string.

    const searchProfiles = async (e: SyntheticEvent) => {
        e.preventDefault()
        const params = new URLSearchParams({
            title: title,
            description: description,
            active: active,
        })

        //If you have query string, set it in URL.
        if (searchParams.toString()) {
            setSearchParams(params)
        } else {
            //navigate("public/profiles?" + params,{replace: true, state: {title: title, description: description, active: active}});
            navigate("?" + params,{replace: true, state: {title: title, description: description, active: active}});

            //navigate("public/profiles?" ,{replace: true, state: {from: location}});
        }

        axios.get("public/profiles?" + params).then(res => {
            console.log("Success to post search QS!")
            console.log(res)
            setResult(res.data.result)
            console.log(result)
        }).catch(res => {
            console.log("Failed to post search QS with error ", res)
        })
    }


    const sendEmailMessage = async (e: SyntheticEvent) => {
        e.preventDefault()

        console.log(sendMailrandomUniqie)
        console.log(emailText);
        console.log(subject);
        setShow(false);
        setEmailText('')
        setSubject('')
        axios.post('email/'+sendMailrandomUniqie, {
            ID: 0,
            public_profile_random_number: sendMailrandomUniqie,
            subject: subject,
            email_text: emailText,
        }).then(res=>{
            console.log("Successfully mailed " , res)
        }).catch( err=> {
            console.log("Failed to Send mail ", err)
        })
    }

    const [show, setShow] = useState(false);
    const location = useLocation()

    const handleShow = (e: SyntheticEvent, randomUnique: string) => {
        e.preventDefault()
        axios.get('userinfo').then((data)=>{
            setShow(true);
            console.log(data.data)
            setSendMailrandomUniqie(randomUnique)
        }).catch(()=>{
            navigate("/login", {state: {from: location}, replace: true})

        })
    }
    const handleClose = () => setShow(false);

    if (!result && searchParams.toString()) {
        return (<div>Loading Profiles...</div>) ;
    }

    return (
        <div>
            <NavNoLogin />
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
                        <div
                            className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                            <a href="/"
                               className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            </a>
                            <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start"
                                id="menu">

                                <li>
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-sm-0 px-2">
                                        <i className="fs-5 bi-speedometer2"></i>

                                        <span className="ms-1 d-none d-sm-inline">





                                            <form>
                                        <a href="#" className="nav-link align-middle px-0">
                                            <i className="fs-4 bi-house"></i> <span
                                            className="ms-1 d-none d-sm-inline">

                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary" onClick={searchProfiles}>Search</button>
                                    </div>
                                    <div className="d-grid p-2 form-group" data-tip data-for="registerTip">

                                        <input type="text" className="form-control" id="title"
                                               value={title}
                                               onChange={e => setTitle(e.target.value)}
                                               placeholder="Search Keyword in title"/>

                                        <ReactTooltip id="registerTip" place="right" type="success" effect="solid"
                                                      textColor='#5F4B8BFF' backgroundColor='#FFFF00'
                                                      borderColor='darkgreen' arrowColor='red'>
                                            <ul> <li>inheading: your search text </li>
                                            OR
                                                <li>inskills: your search text</li>
                                            OR
                                                <li>inlastexperience: your search text</li>
                                            </ul>
                                        </ReactTooltip>

                                    </div>
                                    <div className="d-grid p-2 form-group">

                                        <input type="text" className="form-control" id="description"
                                               value={description}
                                               onChange={e => setDescription(e.target.value)}
                                               placeholder="Search inside last job desc"/>

                                    </div>

                                    <div>
                                        <input className="form-check-input" type="checkbox"
                                               onChange={e => setActive(e.target.value)}
                                               value="false" id="active"/>

                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Active Profiles Only
                                        </label>
                                    </div>


                                </span>
                                        </a>
                                    </form>






                                        </span>

                                    </a>
                                </li>

                            </ul>
                            <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                                <a href="#"
                                   className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                   id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28"
                                         className="rounded-circle"/>
                                        <span className="d-none d-sm-inline mx-1">Joe</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow"
                                    aria-labelledby="dropdownUser1">
                                    <li><a className="dropdown-item" href="#">New project...</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider"/>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <main className="row">







                            <div className="row mt-0">
                                {result && result.length>0 ?
                                    <div>

                                    </div>

                                    : <h2>
                                        No Match, Please broden your search!
                                    </h2>
                                }
                                {result && result.map(profile=> {
                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-8 mt-0 d-flex" key={profile.ID}>
                                            <div className="card mb-2 mr-2" >


                                                <div className="card-body">

                                                    <div>
                                                        <h5 className="card-title">{profile.name}</h5>
                                                    </div>
                                                    <div>
                                                        <p className="card-text">{profile.heading}</p>
                                                    </div>
                                                    <div>
                                                        <a target="_blank" href={"http://localhost:3001/public/profile/"+profile.randomUnique}>FULL PROFILE</a>
                                                    </div>
                                                    <hr className="bg-danger border-2 border-top border-danger"/>


                                                    <Button variant="primary" onClick={(event => {handleShow(event,profile.randomUnique)})}>
                                                        Message
                                                    </Button>


                                                </div>
                                            </div>
                                        </div>
                                    )

                                })}




                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Message!</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>


                                    <form onSubmit={(e)=> sendEmailMessage(e)}  >

                                        <div className="mb-3">
                                            <label htmlFor="recipient-name"
                                                   className="col-form-label">Subject:</label>
                                            <input type="text" className="form-control"
                                                   value={subject}
                                                   onChange={e => setSubject(e.target.value)}
                                                   id="recipient-name"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message-text"
                                                   className="col-form-label">Message:</label>
                                            <textarea className="form-control"
                                                      value={emailText}
                                                      onChange={e => setEmailText(e.target.value)}
                                                      id="message-text"></textarea>
                                        </div>


                                        <button type="submit" value={"submit"} data-bs-dismiss="modal" className="btn btn-warning float-end">Send message</button>
                                    </form>

                                </Modal.Body>
                                <Modal.Footer>

                                </Modal.Footer>
                            </Modal>



                            </div>



                        </main>

                    </div>
                </div>












            </div>
        </div>
    );
}

export default SearchProfiles2;