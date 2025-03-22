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

const setFanAPI = (id, level) => {
    const URL_API = "/fan";
    const data = {
        id,level
   }
    return axios.post(URL_API,data);
};

const setLightAPI = (id, status) => {
    const URL_API = "/light";
    const data = {
        id,status
   }
    return axios.post(URL_API,data);
};

export {
    creatUserApi,
    loginAPI,
    logoutAPI,
    getUserInfoAPI,
    setFanAPI,
    setLightAPI
}
