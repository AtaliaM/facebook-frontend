import facebookApi from './apis/facebook-api';
import Cookies from 'universal-cookie';

const getCookie = (cookieName) => {
    const cookies = new Cookies();
    const cookie = cookies.get(cookieName);
    return cookie;
}

const registerOrLoginUser = (method, reqBody) => {
    if (method === "login") {
        return facebookApi.post("/users/login", reqBody)
    }
    return facebookApi.post("/users", reqBody)
};

const getAuthUser = (path) => {
    const userToken = getCookie('userToken');
    return facebookApi.get(`${path}`, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const postAuthUser = (path, object) => {
    const userToken = getCookie('userToken');
    return facebookApi.post(`${path}`, object || userToken, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const patchAuthUser = (path, object) => {
    const userToken = getCookie('userToken');
    return facebookApi.patch(`${path}`, object, {
        headers: { Authorization: "Bearer " + userToken },
    });
};

const editAuthPost = (postId, post) => {
    const userToken = getCookie('userToken');
    return facebookApi.patch(`/posts/${postId}`, post, {
        headers: { Authorization: "Bearer " + userToken }
    });
}

const deleteAuthPost = (postId) => {
    const userToken = getCookie('userToken');
    return facebookApi.delete(`/posts/${postId}`, {
        headers: { Authorization: "Bearer " + userToken }
    });
}

const getUserFile = (userId,fileType) => {
    return facebookApi.get(`/users/${userId}/${fileType}`);
}

const postUserFile = (fileToPost, fileType) => {
    const userToken = getCookie('userToken');
    return facebookApi.post(`/users/me/${fileType}`, fileToPost, {
        headers: { Authorization: "Bearer " + userToken }
    });
}


const deleteUserFile = (fileType) => {
    const userToken = getCookie('userToken');
    return facebookApi.delete(`/users/me/${fileType}`, {
        headers: { Authorization: "Bearer " + userToken }
    })
}

export {
    registerOrLoginUser,
    getAuthUser,
    postAuthUser,
    patchAuthUser,
    deleteAuthPost,
    editAuthPost,
    getUserFile,
    postUserFile,
    deleteUserFile,
}