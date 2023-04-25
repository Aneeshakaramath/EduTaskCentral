import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockAddtaskForGroup from "../mockData/mockAddtaskForGroup.json";

const addNewTask = async(taskDetails) => {
    if(window.environment == 'development') {
        return mockAddtaskForGroup;
    }
    const url = `${API_URLS.task}/groupId`;
    const reponse = await httpRequest(httpMethods.POST,url,taskDetails);
    return reponse;
}

export default addNewTask;