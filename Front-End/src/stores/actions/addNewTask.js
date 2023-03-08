import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockAddtask from "../mockData/addTask.json";

const addNewTask = async(taskDetails) => {
    if(window.environment == 'development') {
        return mockAddtask;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.task,taskDetails);
    return reponse;
}

export default addNewTask;