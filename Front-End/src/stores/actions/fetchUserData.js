import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';

const fetchUserData = async() => {
    const reponse = await httpRequest(httpMethods.GET,API_URLS.userData);
    return reponse;
}

export default fetchUserData;