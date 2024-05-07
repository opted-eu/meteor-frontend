async function getProfile(setProfile) {

    const profileString = localStorage.getItem('profile');
    try {
        let profileJSON = JSON.parse(profileString)
        setProfile(profileJSON)
        return profileJSON
    }
    catch {
        return null
    }
}

export default getProfile;
