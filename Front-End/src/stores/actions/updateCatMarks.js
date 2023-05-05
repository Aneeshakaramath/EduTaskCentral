import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import addCatMark from '../mockData/addCatMark.json';

const updateCatMarks = async(payload) => {
    if(window.environment == 'development') {
        return addCatMark;
    }
    let url = `${API_URLS.catMarks}/update`;
    const reponse = await httpRequest(httpMethods.POST,url,payload);
    return reponse;
}

export default updateCatMarks;