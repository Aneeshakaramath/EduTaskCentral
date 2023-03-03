import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';

const fetchUserType = async() => {
    const reponse = await httpRequest(httpMethods.GET,API_URLS.userType);
    return reponse;
}

export default fetchUserType;