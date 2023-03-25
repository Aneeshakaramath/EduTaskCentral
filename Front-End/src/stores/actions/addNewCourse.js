import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockAddCourse from "../mockData/mockAddCourse.json";

const addNewCourse = async(addNewCoursePayload) => {
    if(window.environment == 'development') {
        return mockAddCourse;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.course,addNewCoursePayload);
    return reponse;
}

export default addNewCourse;