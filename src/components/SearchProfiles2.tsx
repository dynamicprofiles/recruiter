import React, {SyntheticEvent, useEffect, useState} from 'react';
import NavNoLogin from "./NavNoLogin";
import ReactTooltip from "react-tooltip";
import {Navigate, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Profile} from "../models/Profile";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import {Chat} from "../models/Chat";
import {Mail} from "../models/Mail";

function SearchProfiles2(props:any) {

    const CANDIDATE_PORT = process.env.REACT_APP_CANDIDATE_PORT || "3001";
    const CANDIDATE_HOST = process.env.REACT_APP_CANDIDATE_HOST || "localhost";
    const CANDIDATE_SITE_PROTOCOL = process.env.REACT_APP_CANDIDATE_SITE_PROTOCOL || "http";

    const CANDIDATE_URL= CANDIDATE_SITE_PROTOCOL+"://"+CANDIDATE_HOST+":"+CANDIDATE_PORT


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
        } else {
            const params = new URLSearchParams({
                title: '',
                description: description,
                active: active,
            })
            setSearchParams(params)
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

    /*const childToParent = (childdata :string) => {
        searchProfiles()
        setTitle(childdata);

        console.log(childdata)
    }*/
    //You come here when you click on search button. and may have query string.

    //const searchProfiles = async (e: SyntheticEvent) => {
    const childToParent = async (childdata :string) => {
        setTitle(childdata);

        const params = new URLSearchParams({
            title: childdata,
            description: description,
            active: active,
        })
        console.log("SEARCHING NOW ", title)
        //If you have query string, set it in URL.
        if (searchParams.toString()) {
            setSearchParams(params)
            axios.get("public/profiles?" + params).then(res => {
                console.log("Success to post search QS!")
                console.log(res)
                setResult(res.data.result)
                //console.log(result)
            }).catch(res => {
                console.log("Failed to post search QS with error ", res)
            })
        }
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
            console.log(data)
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
            <NavNoLogin title={title} childToParent={childToParent} />
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">

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
                                        <div className="col-lg-3 col-xl-2 col-md-6 col-sm-8 mt-0 d-flex" key={profile.ID}>
                                            <div className="card mb-2 mr-2" >


                                                <div className="card-body">

                                                    <div>
                                                        <h5 className="card-title">{profile.name}</h5>
                                                    </div>
                                                    <div>
                                                        <p className="card-text">{profile.heading}</p>
                                                    </div>
                                                    <div>
                                                        <a target="_blank" href={CANDIDATE_URL+"/public/profile/"+profile.randomUnique}>FULL PROFILE</a>
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