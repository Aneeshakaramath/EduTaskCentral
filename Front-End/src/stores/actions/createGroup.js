import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockGroupCreate from '../mockData/createGroup.json';

const createNewGroup = async(groupDetails) => {
    if(window.environment == 'development') {
        return mockGroupCreate;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.group,groupDetails);
    return reponse;
}

export default createNewGroup;