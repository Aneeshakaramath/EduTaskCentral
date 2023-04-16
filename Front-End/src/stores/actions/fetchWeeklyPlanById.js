import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import weeklyPlanById from '../mockData/weeklyPlanById.json';

const fetchWeeklyPlanById = async(userId, courseId, moduleNumber, moduleName) => {
    if(window.environment == 'development') {
        return weeklyPlanById;
    }
    const url = `${API_URLS.weeklyPlan}/user/${userId}?courseId=${courseId}&&moduleNumber=${moduleNumber}&&moduleName=${moduleName}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default fetchWeeklyPlanById;