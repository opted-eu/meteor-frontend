import { Outlet, Link } from "react-router-dom";
import Nav from './Nav'
import QuickSearchForm from "../forms/QuickSearchForm";
import logo from '../assets/img/opted_logo_stylized_blue.png'
import '../assets/css/pub.css'
import '../assets/css/m3.css'
import '../assets/css/sticky-footer-navbar.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import Version from "../components/Version";

const Layout = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><img src={logo} width="50" /></Link><Link className="navbar-brand" to="/">METEOR</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            {<Nav />}
                            {<QuickSearchForm />}
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-shrink-0">
                <div className="container">
                    <Outlet />
                </div>
            </main>

            <footer className="footer mt-auto py-3">
                <div className="container">
                <div className="container-fluid">
                    <div className="footer-row">
                        <div className="footer-col-left">
                            <Link to="about">About</Link> · <Link to="privacy">Privacy Policy & Disclaimer</Link> · <Link to="imprint">Imprint</Link>
                        </div>
                        <div className="footer-col-right">
                            <a href="https://opted.eu/" target="_blank">Main OPTED Website</a> · <a href="http://twitter.com/OPTED_H2020" target="_blank"><TwitterIcon/></a> · <a href="https://github.com/opted-eu" target="_blank"><GitHubIcon/></a>
                        </div>
                    </div>

                    <div className="footer-text">
                        <p>This project has received funding from the European Union’s Horizon 2020 research & innovation programme under grant agreement No 951832. The document reflects only the authors’ views. The European Union is not liable for any use that may be made of the information contained herein.</p>
                        <p>Although the information found on this system has been produced and processed from sources believed to be reliable, no warranty, express or implied, is made regarding accuracy, adequacy, completeness, legality, reliability or usefulness of any information.</p>
                        <p>Version: <Version /></p>
                    </div>
                </div>
                </div>
            </footer>

        </>
    )
};

export default Layout;
