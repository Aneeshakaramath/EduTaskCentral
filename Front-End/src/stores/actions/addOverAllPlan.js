import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockAddOverAllPlan from '../mockData/addOverAllPlan.json';

const addOverAllPlan = async(overAllPlanDetails) => {
    if(window.environment == 'development') {
        return mockAddOverAllPlan;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.overAllPlan,overAllPlanDetails);
    return reponse;
}

export default addOverAllPlan;