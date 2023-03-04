import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockLoginSuccess from '../mockData/loginsuccess.json';
const authenticateUser = async(userDetails) => {
    if(window.environment == 'development') {
        return mockLoginSuccess;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.login,userDetails);
    return reponse;
}

export default authenticateUser;