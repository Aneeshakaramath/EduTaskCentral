import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import commentById from '../mockData/commentById.json';

const getCommentById = async(commentId) => {
    if(window.environment == 'development') {
        return commentById;
    }
    const url = `${API_URLS.comment}/${commentId}`;
    const reponse = await httpRequest(httpMethods.GET,url);
    return reponse;
}

export default getCommentById;