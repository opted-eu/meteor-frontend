import SearchForm from '../forms/SearchForm';
import Login from "../user/Login";
import SlickRecent from '../components/SlickRecent';
import SlickHome1 from '../components/SlickHome1';
import SlickHome2 from '../components/SlickHome2';
import {useContext} from "react";
import {UserContext} from "../user/UserContext"
import {useSearchParams} from "react-router-dom";

const Home = () => {

    const [token, setToken] = useContext(UserContext);
    const [searchParams] = useSearchParams();
    let logout = false

    for (let param of searchParams) {
        if (param[0] === 'logout' && param[1] === 'true'){
            logout = true
        }
    }

    return (
        <>
            <h1>Welcome to Meteor</h1>

            <div className="home-login">

                {!token &&
                    <Login setToken={setToken}/>
                }

            </div>

            <div className="home-text">

                {logout &&
                    <p><strong>You are logged out!</strong></p>
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
