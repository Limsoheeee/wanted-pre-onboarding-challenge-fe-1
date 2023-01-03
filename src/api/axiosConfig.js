import axios from "axios";
import {getAccessToken} from "../utils"

const config = {
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: "",
  },
};

const api = axios.create(config);

api.interceptors.request.use(function (config) {
    const accessToken = getAccessToken();

  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
    config.headers.Authorization = accessToken;
  return config;
});

export const memberApis = {
  // 회원가입
  signUp: async (payload) => await api.post(`users/create`, payload),

  // 로그인
  login: async (payload) => await api.post(`users/login`, payload),
};

export const todoApis = {
  // 글목록
  list: async() => await api.get(`/todos`),  
  // 글쓰기
  create: async (payload) => await api.post(`/todos`, payload),
};

export const todoIdApis = async ({
	method,
	url,
	throwWhenError = false,
	payload,
}) => {
	try {
		const response = await config[method](url, payload);
		return response;
	} catch (error) {
	}
};

