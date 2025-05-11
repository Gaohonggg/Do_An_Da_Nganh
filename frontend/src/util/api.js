import axios from "./axios.customize";

const creatUserApi = (name, email, password,CCCD)=> {
    const URL_API = "/auth/sign_up";
    const data = {
        name, email, password,CCCD
    }
    return axios.post(URL_API,data)
}

const loginAPI = (email, password)=> {
    const URL_API = "/auth/log_in";
    const data = {
         email, password
    }
    return axios.post(URL_API,data)
}

const logoutAPI = ()=> {
    const URL_API = "/auth/log_out";
    const data = {}
    return axios.post(URL_API,data)
}

const getUserInfoAPI = () => {
    const URL_API = "/user/info";
    return axios.get(URL_API);
};


const getFanAPI = (id) => {
    const URL_API = "/fan/get";
    const data = {
        id
   }
    return axios.post(URL_API,data);
}

const setFanAPI = (id, level) => {
    const URL_API = "/fan/set";
    const data = {
        id,level
   }
    return axios.post(URL_API,data);
};

const setLightAPI = (id, status) => {
    const URL_API = "/light/set";
    const data = {
        id,status
   }
//    console.log(data);
    return axios.post(URL_API,data);
};

const getLightAPI = (id) => {
    const URL_API = "/light/get";
    const data = {
        id
    };
    // console.log(data);
    return axios.post(URL_API,data);
}

const setDoorAPI = (id, status,door_id) => {
    const URL_API = '/door/set';
    const data = {
        id,status,door_id
   }
    return axios.post(URL_API,data);
};

const getDoorAPI = (id) => {
    const URL_API = "/door/get";
    const data = {
        id
   }
    return axios.post(URL_API,data);
}

const getId = () => {
    const URL_API = "/auth/id";
    return axios.get(URL_API);
};

const getFaceId = () => {
    const URL_API = "/door/face";
    return axios.get(URL_API);
};

const checkLogin = () => {
    const URL_API = "/auth/me";
    return axios.get(URL_API);
}

const setUserInfo = (username, email, CCCD) => {
    const userInfo = {
        username,
        email,
        CCCD
    }
    const URL_API = "/user/info";
    return axios.post(URL_API, userInfo);
}

const updatePassword = (currentPassword, newPassword) => {
    const URL_API = "/auth/change_password";
    const data = {
        currentPassword,
        newPassword
    }
    return axios.post(URL_API, data);
}

const getHistory = () => {
    const URL_API = "/user/history";
    return axios.get(URL_API);
}

const forgotPassword = (email) => {
    const URL_API = "/auth/forgot_password";
    const data = {
        email
    }
    return axios.post(URL_API, data);
}

export {
    creatUserApi,
    loginAPI,
    logoutAPI,
    getUserInfoAPI,
    getFanAPI,
    setFanAPI,
    getLightAPI,
    setLightAPI,
    getDoorAPI,
    setDoorAPI,
    getId,
    getFaceId,
    checkLogin,
    setUserInfo,
    updatePassword,
    getHistory,
    forgotPassword
}
