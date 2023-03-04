import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockLogoutSuccessResponse from '../mockData/logout.json';

const logout = async() => {
    if(window.environment == 'development') {
        return mockLogoutSuccessResponse;
    }
    const reponse = await httpRequest(httpMethods.GET,API_URLS.logout);
    return reponse;
}

export default logout;