import axios from "axios";
import qs from "qs";
// import { MessagePlugin } from "tdesign-vue";
import store from "@/store";
import FileDownload from "js-file-download";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  timeout: 30000,
});

let urlParams = qs.parse(location.search.slice(1));

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
    console.log(urlParams, "urlParams");
    // repeat_request：是否允许重复请求
    removePendingRequest(config);
    !config.repeat_request && addPendingRequest(config);
    config.loading && store.dispatch("common/setGlobalLoading", true);
    if (urlParams.from === "OA" || urlParams.encryData) {
      config.headers = store.state.common.oaSignData;
    }
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
        var { origin } = window.location;
        var url = `${res.data.data}?from=${origin}${process.env.VUE_APP_WEB_BASE_URL}home`;
        window.location.href = url;
        return Promise.reject(res);
      default:
        // MessagePlugin.error(res.data.message);
        return Promise.reject(res);
    }
  },
  (err) => {
    store.dispatch("common/setGlobalLoading", false);
    removePendingRequest(err.config || {});
    if (axios.isCancel(err)) {
      console.log("已取消的重复请求：" + err.message);
    } else {
      // MessagePlugin.error("网络异常");
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
  window.open(link, "__blank");
}

export function download2(method = "get", url, params = {}, filename) {
  let key = method === "get" ? "params" : "data";
  let config = {
    baseURL: process.env.VUE_APP_BASE_URL,
    withCredentials: true,
    timeout: 30000,
    method: method,
    url: url,
    responseType: "blob",
    [key]: params,
  };
  if (urlParams.from === "OA") {
    config.headers = store.state.common.oaSignData;
  }
  axios(config).then((response) => {
    console.log(response, "response");
    let reader = new FileReader();
    reader.readAsText(response.data);
    reader.onload = function () {
      // let content = reader.result;
      if (response.data.type === "application/json") {
        // MessagePlugin.error(JSON.parse(content).msg);
      } else {
        FileDownload(response.data, filename);
      }
    };
  });
}

export default instance;
