import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import questionPaperGetByid from '../mockData/questionPaperGetByid.json';

const fetchQuestionPaperByid = async(courseId, examType) => {
    if(window.environment == 'development') {
        return questionPaperGetByid;
    }
    const url = `${API_URLS.questionPaper}/course/${courseId}?examType=${examType}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default fetchQuestionPaperByid;