import React, {SyntheticEvent, useEffect, useState} from 'react';
import axios from "axios";
import {Navigate, Router, useNavigate, useSearchParams} from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import { Link } from 'react-router-dom';
import {Profile} from "../models/Profile";



function SearchProfiles(props: any) {
    let navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [active, setActive] = useState('false')
    var urlParams = new URLSearchParams(window.location.search);

    //const [searchParams] = useSearchParams();
    const [searchParams, setSearchParams] = useSearchParams();
    //const params = Object.fromEntries([...searchParams]);
    let queryStringTitle = searchParams.get('title');
    let queryStringDescription = searchParams.get('description');

    let [result, setResult] = useState<[Profile]>()

    useEffect( ()=>{
        if (queryStringTitle != null ) {
            setTitle(queryStringTitle)
        }

        if (queryStringDescription != null ) {
            setDescription(queryStringDescription)
        }
        if (searchParams.toString()) {
            axios.get("public/profiles?" + searchParams.toString()).then(res => {
                console.log("Success to post search QS!")
                console.log(res)
                setResult(res.data.result)
                console.log(result)
            }).catch(res => {
                console.log("Failed to post search QS with error ", res)
            })
        }
    },[])


    const searchProfiles = async (e: SyntheticEvent) => {
        e.preventDefault()
        const params = new URLSearchParams({
            title: title,
            description: description,
            active: active,
        })
        if (searchParams.toString()) {
            setSearchParams(params)
        } else {
            navigate("public/profiles?" + params,{replace: true, state: {title: title, description: description, active: active}});
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
    if (!result) {
        return (<div>Loading Experiences...</div>) ;
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">

                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">
                            <li className="nav-item">
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
                            </li>


                        </ul>

                    </div>
                </div>
                <div className="row">
                    <ul className="list-unstyled">
                        <li>
                        {result.map(profile=> {

                            return (
                                    <div className="col-sm-6" key={profile.ID}>
                                        <div className="card">


                                            <div className="card-body">


                                                <h5 className="card-title">NAME</h5>


                                                <p className="card-text">HEADING</p>

                                                <a target="_blank" href={"http://localhost:3001/public/profile/"+profile.randomUnique}>FULL PROFILE</a>


                                                <div className="btn-toolbar">

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                            )

                        })}
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    );
}

export default SearchProfiles;