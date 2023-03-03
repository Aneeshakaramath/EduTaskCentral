import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';

const authenticateUser = async(userDetails) => {
    const reponse = await httpRequest(httpMethods.POST,API_URLS.login,userDetails);
    return reponse;
}

export default authenticateUser;