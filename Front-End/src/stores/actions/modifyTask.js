import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockModifyTask from '../mockData/modifyTask.json';

const modifyTask = async(modifyTaskPayload) => {
    if(window.environment == 'development') {
        return mockModifyTask;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.modifyTask,modifyTaskPayload);
    return reponse;
}

export default modifyTask;