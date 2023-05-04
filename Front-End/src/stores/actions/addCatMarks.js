import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import addCatMark from '../mockData/addCatMark.json';

const addCatMarks = async(payload) => {
    if(window.environment == 'development') {
        return addCatMark;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.catMarks,payload);
    return reponse;
}

export default addCatMarks;