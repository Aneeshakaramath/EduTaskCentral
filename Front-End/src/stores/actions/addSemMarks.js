import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import addSemMarkMock from '../mockData/addSemMark.json';

const addSemMark = async(payload) => {
    if(window.environment == 'development') {
        return addSemMarkMock;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.semMarks,payload);
    return reponse;
}

export default addSemMark;