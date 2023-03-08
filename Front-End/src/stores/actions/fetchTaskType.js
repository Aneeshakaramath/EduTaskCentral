import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockTaskTYpe from '../mockData/taskType.json';

const fetchTaskType = async() => {
    if(window.environment == 'development') {
        return mockTaskTYpe;
    }
    const reponse = await httpRequest(httpMethods.GET,API_URLS.taskType);
    return reponse;
}

export default fetchTaskType;