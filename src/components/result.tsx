import React from 'react';
import {Link} from "react-router-dom";

function Result(props:any) {
    return (
        <li>
            <div className="col-sm-4">
                <div className="card">


                    <div className="card-body">


                        <h5 className="card-title">NAME</h5>


                        <p className="card-text">HEADING</p>

                        <Link to={`/profile/`} target="_blank">
                            FULL PROFILE
                        </Link>

                        <div className="btn-toolbar">

                        </div>


                    </div>


                </div>
            </div>

        </li>
    );
}

export default Result;