import httpRequest from '../httpRequest';
import httpMethods from '../httpMethodEnum';
import API_URLS from '../apiUrls';
import mockAddComment from '../mockData/addComment.json';

const addComment = async(commentDetails) => {
    if(window.environment == 'development') {
        return mockAddComment;
    }
    const reponse = await httpRequest(httpMethods.POST,API_URLS.comment,commentDetails);
    return reponse;
}

export default addComment;