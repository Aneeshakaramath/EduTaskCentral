import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockGroupCreate from '../mockData/createGroup.json';

const modifyGroup = async(groupDetails) => {
    if(window.environment == 'development') {
        return mockGroupCreate;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.modifyGroup,groupDetails);
    return reponse;
}

export default modifyGroup;