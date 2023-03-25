import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockCourse from '../mockData/mockCourse.json';

const getCourseByUserId = async(userId) => {
    if(window.environment == 'development') {
        return mockCourse;
    }
    const url = `${API_URLS.course}/user/${userId}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default getCourseByUserId;