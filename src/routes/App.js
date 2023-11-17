import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Guides from "../pages/Guides";
import LinkCollection from "../pages/LinkCollection";
import TeachingMaterials from "../pages/TeachingMaterials";
import Faq from "../pages/Faq";
import About from "../pages/About";
import PrivacyPolicyAndConsent from "../pages/PrivacyPolicyAndConsent";
import Imprint from "../pages/Imprint";
import Detail from "../pages/Detail";
import QuickSearch from "../search/QuickSearch";
import NoPage from "../pages/NoPage";
import Search from "../search/Search";
import AdvancedSearch from "../search/AdvancedSearch";
import SearchLink from "../search/SearchLink";

const App = () =>  {
  return (
      <BrowserRouter>
        <Routes>

          {/* Main layout route - included in every page */}
          <Route path="/" element={<Layout />}>

            {/* ---Child routes--- */}
            {/* Home */}
            <Route index element={<Home />} />

            {/* Search pages */}
            <Route path="quicksearch/:query" element={<QuickSearch />} />
            <Route path="search/link" element={<SearchLink />} />
            <Route path="search" element={<Search />} />
            <Route path="advanced-search" element={<AdvancedSearch />} />

            {/* Nav pages */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="guides" element={<Guides />} />
            <Route path="link-collection" element={<LinkCollection />} />
            <Route path="teaching-materials" element={<TeachingMaterials />} />
            <Route path="faq" element={<Faq />} />
            <Route path="about" element={<About />} />

            {/* Footer pages */}
            <Route path="privacy-policy-and-consent" element={<PrivacyPolicyAndConsent />} />
            <Route path="imprint" element={<Imprint />} />

            {/* Dynamic pages */}
            <Route path="detail/:uid" element={<Detail />} />

            {/* No page */}
            <Route path="*" element={<NoPage />} />

          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
