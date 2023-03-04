import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockGroupData from '../mockData/groupDetails.json';

const fetchGroupDetails = async() => {
    if(window.environment == 'development') {
        return mockGroupData;
    }
    const reponse = await httpRequest(httpMethods.GET,API_URLS.group);
    return reponse;
}

export default fetchGroupDetails;