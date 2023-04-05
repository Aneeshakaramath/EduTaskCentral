import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockNotificationUpdate from '../mockData/mockNotificationUpdate.json';

const sendNotificaion = async(payload) => {
    if(window.environment == 'development') {
        return mockNotificationUpdate;
    }

    const reponse = await httpRequest(httpMethods.POST,API_URLS.notification,payload);
    return reponse;
}

export default sendNotificaion;