import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockAddWeeklyPlan from '../mockData/mockAddWeeklyPlan.json';

const submitWeeklyPlan = async(payload) => {
    if(window.environment == 'development') {
        return mockAddWeeklyPlan;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.weeklyPlan,payload);
    return reponse;
}

export default submitWeeklyPlan;