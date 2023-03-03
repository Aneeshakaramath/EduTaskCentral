import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';

const signUpUser = async(userDetails) => {
    const reponse = await httpRequest(httpMethods.POST,API_URLS.user,userDetails);
    return reponse;
}

export default signUpUser;