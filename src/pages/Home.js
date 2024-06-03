import SearchForm from '../forms/SearchForm';
import Login from "../user/Login";
import SlickRecent from '../components/SlickRecent';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../user/UserContext"
import {useNavigate, useSearchParams, Link} from "react-router-dom";
import getLoggedIn from "../user/getLoggedIn";
import {ProfileContext} from "../user/ProfileContext";
import getProfile from "../user/getProfile";

const Home = () => {

    const [token, setToken] = useContext(UserContext);
    const [searchParams] = useSearchParams();
    let logout = false
    const [loggedIn, setLoggedIn] = useState('Checking');
    const navigate = useNavigate();
    const [profile, setProfile] = useContext(ProfileContext);

    const getData = () => {
        getLoggedIn(token, setLoggedIn, setToken)
        getProfile(setProfile)
    }

    useEffect(() => {
        getData()
    }, [])

    for (let param of searchParams) {
        if (param[0] === 'logout' && param[1] === 'true'){
            logout = true
        }
    }

    return (
        <>
            <h1>Welcome to Meteor</h1>

            <div className="home-login">
                {!loggedIn &&
                    <Login setToken={setToken} token={token} setProfile={setProfile}/>
                }

                {loggedIn &&
                    <>
                        {loggedIn.status === 200 && (
                            <>
                                <p>
                                    You are logged in
                                    {profile && (
                                        <>
                                            &nbsp;as:<br />
                                            <Link to='/profile/'>{profile.email}</Link>
                                        </>
                                        )
                                    }
                                </p>
                                <div align='right' style={{borderTop:'1px solid grey', paddingTop:'10px'}}>
                                    <md-text-button type="button" onClick={() => navigate('/logout/')}>Logout</md-text-button>
                                </div>
                            </>
                        )}
                    </>
                }

            </div>

            <div className="home-text">

                {logout &&
                    <>
                        <p style={{borderBottom:'1px solid grey', paddingBottom:'10px'}}>
                            <span className='message'>You are logged out!</span>
                            <br />
                            <strong>Hint:</strong> Try ticking the 'Remember Me' box when logging in to stay logged in for longer!
                        </p>
                    </>
                }

                <p>Quickly and easily query our database of political text resources. Our database is a collection of data, tools and more that have been curated for the political text community.</p>
                <p>Our platform has resources for the seasoned pro and those new to text analysis. Journalists, non-academic researchers and policy practitioners will find resources to support their political text journey. Find out which databases hold the text data that you are looking for.</p>
                <p>Do you have a specific source in mind? Try typing the name in the search bar and check if the entry already exists!</p>

                {<SearchForm />}
                
            </div>


            <br clear="all"/>
            {<SlickRecent />}
            {/*<SlickHome1 />*/}
            {/*<SlickHome2 />*/}
        </>
    )
};

export default Home;
