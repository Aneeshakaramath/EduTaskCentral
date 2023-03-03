import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';

const logout = async() => {
    const reponse = await httpRequest(httpMethods.GET,API_URLS.logout);
    return reponse;
}

export default logout;