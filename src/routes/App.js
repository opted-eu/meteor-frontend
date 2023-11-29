import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {useState} from "react";
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
import QuickSearch from "../search/QuickSearch";
import NoPage from "../pages/NoPage";
import Search from "../search/Search";
import AdvancedSearch from "../search/AdvancedSearch";
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

const App = () =>  {

  const { token, setToken } = UseToken();
  const { profile, setProfile } = UseProfile();

  return (
      <UserContext.Provider value={[token, setToken]}>
        <ProfileContext.Provider value={[profile, setProfile]}>
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
                <Route path="guides" element={<Guides />} />
                <Route path="link-collection" element={<LinkCollection />} />
                <Route path="teaching-materials" element={<TeachingMaterials />} />
                <Route path="faq" element={<Faq />} />
                <Route path="about" element={<About />} />

                {/* User pages */}
                <Route path="login" element={<Login setToken={setToken} />} />
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

                {/* Dynamic pages */}
                <Route path="detail/:uid" element={<Detail />} />

                {/* No page */}
                <Route path="*" element={<NoPage />} />

              </Route>
            </Routes>
          </BrowserRouter>
        </ProfileContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
