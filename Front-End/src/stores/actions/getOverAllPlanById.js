import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockOverAllPlan from '../mockData/mockOverAllPlan.json';

const getOverALLPlanById = async(userId, CourseId) => {
    if(window.environment == 'development') {
        return mockOverAllPlan;
    }
    // http://localhost:5000/api/overAllPlan/user/6401607f067c1d45ba3db495?courseId=641ee029dd34c03d7f7aafb8
    let url = `${API_URLS.overAllPlan}/user/${userId}?courseId=${CourseId}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default getOverALLPlanById;