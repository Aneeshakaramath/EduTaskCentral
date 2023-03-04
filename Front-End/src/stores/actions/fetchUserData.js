import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockUserData from '../mockData/userData.json';

const fetchUserData = async() => {
    if(window.environment == 'development') {
        return mockUserData;
    }
    const reponse = await httpRequest(httpMethods.GET,API_URLS.userData);
    return reponse;
}

export default fetchUserData;