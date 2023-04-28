import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockCommentsForGroup from '../mockData/mockCommentsForGroup.json';

const fetchCommentsForSelectedGroup = async(groupId) => {
    if(window.environment == 'development') {
        return mockCommentsForGroup;
    }
    let url = `${API_URLS.groupComments}/group/${groupId}`
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default fetchCommentsForSelectedGroup;