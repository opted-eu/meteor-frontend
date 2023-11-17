import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useEffect} from "react";

const SearchLink = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/search?" + searchParams)
    }, [])

    return (
        <>
        </>
    )
};

export default SearchLink;
