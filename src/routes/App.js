import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Register from "../user/Register";
import Guides from "../pages/Guides";
import LinkCollection from "../pages/LinkCollection";
import TeachingMaterials from "../pages/TeachingMaterials";
import Faq from "../pages/Faq";
import About from "../pages/About";
import PrivacyPolicyAndConsent from "../pages/PrivacyPolicyAndConsent";
import Imprint from "../pages/Imprint";
import Detail from "../pages/Detail";
import NoPage from "../pages/NoPage";
import NotImplemented from "../pages/NotImplemented";
import Search from "../search/Search";
import SearchLink from "../search/SearchLink";
import Login from "../user/Login";
import UseToken from "../user/UseToken";
import Logout from "../user/Logout";
import {UserContext} from "../user/UserContext";
import {ProfileContext} from "../user/ProfileContext";
import UseProfile from "../user/UseProfile";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import RequestPasswordReset from "../user/RequestPasswordReset";
import ResetPassword from "../user/ResetPassword";
import ChangePassword from "../user/ChangePassword";
import Users from "../user/Users";
import UpdateUser from "../user/UpdateUser";
import ResendVerificationEmail from "../user/ResendVerificationEmail";
import { OpenAPIProvider } from "../components/APISpecs";
import Accreditation from "../pages/Accreditation";
import Add from "../entries/Add"
import GuidesNewssource from "../pages/GuidesNewssource";
import AddCheck from "../entries/AddCheck";
import AddEntry from "../entries/AddEntry";
import Entries from "../entries/Entries";

const App = () =>  {

  const { token, setToken } = UseToken();
  const { profile, setProfile } = UseProfile();

  return (
    <UserContext.Provider value={[token, setToken]}>
        <ProfileContext.Provider value={[profile, setProfile]}>
          <BrowserRouter>
            <OpenAPIProvider>
            <Routes>

              {/* Main layout route - included in every page */}
              <Route path="/" element={<Layout />}>

                {/* ---Child routes--- */}
                {/* Home */}
                <Route index element={<Home />} />

                {/* Search pages */}
                <Route path="search/link" element={<SearchLink />} />
                <Route path="search" element={<Search />} />

                {/* Nav pages */}
                <Route path="guides" element={<Guides />} />
                <Route path="guides/newssource" element={<GuidesNewssource />} />
                <Route path="link-collection" element={<LinkCollection />} />
                <Route path="teaching-materials" element={<TeachingMaterials />} />
                <Route path="faq" element={<Faq />} />
                <Route path="about" element={<About />} />

                {/* User pages */}
                <Route path="login" element={<Login setToken={setToken} token={token} setProfile={setProfile} />} />
                <Route path="register" element={<Register />} />
                <Route path="register/resend" element={<ResendVerificationEmail />} />
                <Route path="logout" element={<Logout />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/update" element={<UpdateProfile />} />
                <Route path="password/reset" element={<RequestPasswordReset />} />
                <Route path="password/reset/:token" element={<ResetPassword />} />
                <Route path="profile/password/change" element={<ChangePassword />} />
                <Route path="admin/users" element={<Users />} />
                <Route path="admin/users/:uid" element={<UpdateUser />} />

                {/* Footer pages */}
                <Route path="privacy" element={<PrivacyPolicyAndConsent />} />
                <Route path="imprint" element={<Imprint />} />
                <Route path="accreditation" element={<Accreditation />} />

                {/* Dynamic pages */}
                <Route path="detail/:uid" element={<Detail />} />

                {/* Add Entry pages */}
                <Route path="add/check" element={<AddCheck />} />
                <Route path="add/entry" element={<AddEntry />} />
                <Route path="add" element={<Add />} />
                <Route path="edit/:uid" element={<AddEntry />} />
                <Route path="profile/entries" element={<Entries />} />

                {/* No page */}
                <Route path="*" element={<NoPage />} />

              </Route>
            </Routes>
          </OpenAPIProvider>
          </BrowserRouter>
        </ProfileContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
