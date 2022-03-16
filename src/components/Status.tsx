import React, {useEffect, useState} from 'react';
import axios from "axios";

function Status(props:any) {
    const [health, setHealth] = useState<any | null>()

    useEffect(() => {
        axios.get("status").then(res => {
            setHealth("HEALTHY")
        }).catch(res => {
            console.log(res)
            res.status(404).send('Not found');
        })
    })

    return (
        <div>Status check page!</div>
    );
}

export default Status;