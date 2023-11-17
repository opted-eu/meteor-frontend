import SearchForm from '../forms/SearchForm';
import SlickRecent from '../components/SlickRecent';
import SlickHome1 from '../components/SlickHome1';
import SlickHome2 from '../components/SlickHome2';

const Home = () => {
    return (
        <>
            <h1>Welcome to the METEOR Platform</h1>
            <p>Quickly and easily query our database of political text data, tools and more! Find out which databases hold the text data that you are looking for. Do you have a specific source in mind? Try typing the name in the search bar and check if the entry already exists!</p>
            {<SearchForm />}
            {<SlickRecent />}
            {/*<SlickHome1 />*/}
            {/*<SlickHome2 />*/}
        </>
    )
};

export default Home;
