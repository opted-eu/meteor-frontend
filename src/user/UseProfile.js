import { useState } from 'react';

export default function UseProfile() {
    const getProfile = () => {
        return localStorage.getItem('profile');
    };

    const [profile, setProfile] = useState(getProfile());

    //console.log('usetoken=' + token)

    const saveProfile = profile => {
        if (profile) {
            localStorage.setItem('profile', JSON.stringify(profile));
            setProfile(profile);
        } else {
            setProfile(null)
        }
    };

    return {
        setProfile: saveProfile,
        profile
    }
}