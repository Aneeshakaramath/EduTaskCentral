import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockNotificationUpdate from '../mockData/mockNotificationUpdate.json';

const updateNotification = async(payload) => {
    if(window.environment == 'development') {
        return mockNotificationUpdate;
    }
    const url = `${API_URLS.notification}/status`;
    const reponse = await httpRequest(httpMethods.POST,url,payload);
    return reponse;
}

export default updateNotification;