import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";

const DetailLink = () => {

    let { uid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/detail/" + uid)
    }, [])

    return (
        <>
        </>
    )
};

export default DetailLink;
