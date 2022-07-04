import axios, { AxiosResponse } from 'axios';
// import { server } from "@/api";

const $ax = axios.create({
  baseURL: '//localhost:3000/api/v1',
  timeout: 0,
});

$ax.interceptors.request.use((config) => {
  // const token = store.getState().ui.user.token;
  // if (token) {
  //   if (config.headers) {
  //     config.headers.token = token;
  //   } else {
  //     config.headers = {
  //       token,
  //     };
  //   }
  // }
  // Make some errors
  // if (config.headers) {
  //   config.headers.token = undefined;
  // } else {
  //   config.headers = {
  //     token: undefined,
  //   };
  // }

  return config;
});

// 当响应不为 200 时，提示错误
$ax.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== '200') console.error(res.data.data);
    // if (res.data.code === "1001") store.dispatch(setTokenExpired(true));

    return res;
  },
  (err) => {
    console.log(err);
    // message.error("请求超时");
    // return Promise.reject(err);
  }
);

export default $ax;
