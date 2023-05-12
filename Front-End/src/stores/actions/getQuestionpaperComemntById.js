import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import commentById from '../mockData/commentById.json';

const getQuestionpaperCommentById = async(commentId,examType) => {
    if(window.environment == 'development') {
        return commentById;
    }
    const url = `${API_URLS.questionpaperComment}/question/${commentId}?examType=${examType}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default getQuestionpaperCommentById;