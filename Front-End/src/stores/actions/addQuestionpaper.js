import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockQuestionpaper from '../mockData/addQuestionPaper.json';

const addQuestionPaper = async(payload) => {
    if(window.environment == 'development') {
        return mockQuestionpaper;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.questionPaper,payload);
    return reponse;
}

export default addQuestionPaper;