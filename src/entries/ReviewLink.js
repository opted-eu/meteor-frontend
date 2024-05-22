import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";

const ReviewLink = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/review?" + searchParams)
    }, [])

    return (
        <>
        </>
    )
};

export default ReviewLink;
