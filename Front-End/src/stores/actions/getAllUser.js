import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockUserList from '../mockData/userList.json';

const fetchUserType = async() => {
    if(window.environment == 'development') {
        return mockUserList;
    }
    const reponse = await httpRequest(httpMethods.GET,API_URLS.user);
    return reponse;
}

export default fetchUserType;