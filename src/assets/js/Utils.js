export const getImage = (i) => {
    const img = {
        'ConceptVariable': 'https://upload.wikimedia.org/wikipedia/commons/4/44/RIAN_archive_828797_Mikhail_Gorbachev_addressing_UN_General_Assembly_session.jpg',
        'TextType': 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Politics_Word_Cloud.png',
        'LearningMaterial': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/House_of_Commons_2010.jpg',
        'PoliticalParty': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/European-parliament-brussels-inside.JPG',
    }
    if (img[i]) {
        return img[i]
    } else {
        return 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Cyrus_Engerer_addressing_PL_AGM_2013.JPG'
    }
}