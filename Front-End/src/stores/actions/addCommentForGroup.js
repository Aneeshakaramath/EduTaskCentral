import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import addNewGroupComment from '../mockData/addComment.json';

const addCommentForGroup = async(commentDetails) => {
    if(window.environment == 'development') {
        return addNewGroupComment;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.groupComments,commentDetails);
    return reponse;
}

export default addCommentForGroup;