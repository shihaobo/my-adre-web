import axios from "axios";
import qs from "qs";
import { MessagePlugin } from "tdesign-vue";
import store from "@/store";
import FileDownload from "js-file-download";
import { logOut } from "@/utils/utils.js";
const { VUE_APP_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: VUE_APP_BASE_URL,
  withCredentials: true,
  timeout: 6 * 60 * 1000,
});

// 取消重复请求start
function generateReqKey(config) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join("&");
}

const pendingRequest = new Map();
function addPendingRequest(config) {
  const requestKey = generateReqKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

function removePendingRequest(config) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}
// 取消重复请求end

instance.interceptors.request.use(
  (config) => {
    // repeat_request：是否允许重复请求
    removePendingRequest(config);
    !config.repeat_request && addPendingRequest(config);
    config.loading && store.dispatch("common/setGlobalLoading", true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    res.config.loading && store.dispatch("common/setGlobalLoading", false);
    removePendingRequest(res.config);
    switch (res.data.code) {
      case 200:
        return res;
      case 31602:
        logOut();
        return Promise.reject(res);
      default:
        MessagePlugin.error(res.data.message);
        return Promise.reject(res);
    }
  },
  (err) => {
    store.dispatch("common/setGlobalLoading", false);
    removePendingRequest(err.config || {});
    if (axios.isCancel(err)) {
      console.log("已取消的重复请求：" + err.message);
    } else {
      MessagePlugin.error("网络异常");
    }
    return Promise.reject(err);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}, config) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
        ...config,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, params = {}, config) {
  return new Promise((resolve, reject) => {
    instance.post(url, params, config).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, params = {}, config) {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        params: params,
        ...config,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, params = {}, config) {
  return new Promise((resolve, reject) => {
    instance.put(url, params, config).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 下载
 */
export function download(url, data) {
  let params = Object.assign({}, data);
  let link = url + "?" + qs.stringify(params);
  window.open(link, "__self");
}

export function download2(method = "get", url, params = {}, filename) {
  let key = method === "get" ? "params" : "data";
  let config = {
    baseURL: VUE_APP_BASE_URL,
    withCredentials: true,
    timeout: 30000,
    method: method,
    url: url,
    responseType: "blob",
    [key]: params,
  };
  axios(config).then((response) => {
    let reader = new FileReader();
    reader.readAsText(response.data);
    reader.onload = function () {
      let content = reader.result;
      if (response.data.type === "application/json") {
        MessagePlugin.error(JSON.parse(content).msg);
      } else {
        FileDownload(response.data, filename);
      }
    };
  });
}

export function preview(method = "get", url, params = {}) {
  let key = method === "get" ? "params" : "data";
  let config = {
    baseURL: VUE_APP_BASE_URL,
    withCredentials: true,
    timeout: 30000,
    method: method,
    url: url,
    responseType: "blob",
    [key]: params,
  };
  return new Promise((resolve) => {
    axios(config).then((response) => {
      let blob = new Blob([response.data]);
      let url = URL.createObjectURL(blob);
      let reader = new FileReader();
      reader.readAsText(response.data);
      reader.onload = function () {
        let content = reader.result;
        if (response.data.type === "application/json") {
          MessagePlugin.error(JSON.parse(content).msg);
        } else {
          resolve(url);
        }
      };
    });
  });
}

export default instance;
