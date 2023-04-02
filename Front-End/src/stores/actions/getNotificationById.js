import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockNotification from '../mockData/mockNotification.json';

const getNotificationByUserId = async(userId) => {
    if(window.environment == 'development') {
        return mockNotification;
    }
    const url = `${API_URLS.notification}/user/${userId}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default getNotificationByUserId;