import axios from 'axios';
// khởi tạo một đối tượng Axios mục đích để custom và cấu hình chung cho dự án
const authorizedAxiosInstance = axios.create({
  baseURL: 'http://localhost:8017',
});
// thời gian chờ tối đa của 1 request : 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;
// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default authorizedAxiosInstance;
