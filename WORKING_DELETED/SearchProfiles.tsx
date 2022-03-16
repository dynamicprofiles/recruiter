import React, {SyntheticEvent, useEffect, useState} from 'react';
import axios from "axios";
import {Navigate, Router, useNavigate, useSearchParams} from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import SearchResult from "./SearchResult";

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
    console.log(searchParams.toString())
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
        }).catch(res => {
            console.log("Failed to post search QS with error ", res)
        })
    }

    return (

        <div>
            <div className={"row"}>
                <div id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                    <div className="position-sticky pt-3">
                        <ul className="nav flex-column">
                            <li className="nav-item">

                                <form onSubmit={searchProfiles} method={"GET"}>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">Search</button>
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

                                    <div className="form-check mr-10">
                                        <input className="form-check-input" type="checkbox"
                                               onChange={e => setActive(e.target.value)}
                                               value="false" id="active"/>

                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Active Profiles Only
                                        </label>
                                    </div>

                                </form>

                            </li>

                        </ul>


                    </div>
                </div>
            </div>
            <div className="row searchResult">
                <SearchResult/>
            </div>

        </div>
    );
}

export default SearchProfiles;