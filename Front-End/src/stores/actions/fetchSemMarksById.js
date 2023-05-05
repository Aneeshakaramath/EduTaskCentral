import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import semMarksGetById from '../mockData/semMarksGetById.json';

const fetchCatMarksById = async(courseId, examType) => {
    if(window.environment == 'development') {
        return semMarksGetById;
    }
    const url = `${API_URLS.semMarks}/course/${courseId}?examType=${examType}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default fetchCatMarksById;