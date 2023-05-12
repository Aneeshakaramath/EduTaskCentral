import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import addNewGroupComment from '../mockData/addComment.json';

const addCommentForGroup = async(payload) => {
    if(window.environment == 'development') {
        return addNewGroupComment;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.questionpaperComment,payload);
    return reponse;
}

export default addCommentForGroup;