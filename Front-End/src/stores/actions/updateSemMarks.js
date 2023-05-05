import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import addSemMark from '../mockData/addSemMark.json';

const updateCatMarks = async(payload) => {
    if(window.environment == 'development') {
        return addSemMark;
    }
    let url = `${API_URLS.semMarks}/update`;
    const reponse = await httpRequest(httpMethods.POST,url,payload);
    return reponse;
}

export default updateCatMarks;