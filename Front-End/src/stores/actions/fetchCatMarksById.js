import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import catMarksByid from '../mockData/catMarksByid.json';

const fetchCatMarksById = async(courseId, examType) => {
    if(window.environment == 'development') {
        return catMarksByid;
    }
    const url = `${API_URLS.catMarks}/course/${courseId}?examType=${examType}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default fetchCatMarksById;