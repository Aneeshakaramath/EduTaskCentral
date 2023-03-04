import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockUserType from '../mockData/userType.json';

const fetchUserType = async() => {
    if(window.environment == 'development') {
        return mockUserType;
    }
    const reponse = await httpRequest(httpMethods.GET,API_URLS.userType);
    return reponse;
}

export default fetchUserType;