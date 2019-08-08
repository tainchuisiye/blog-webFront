import 'whatwg-fetch';
import _ from 'lodash';
import { message } from 'antd';

interface OptionsProp {
  url: string;
  params?: any;
  method?: 'post' | 'get' | 'put' | 'delete';
}

async function checkStatus(response, dispet = true) {
  const { headers, status, statusText } = response;
  if (statusText !== 'OK') {
    // 接口错误 默认弹出statusText，dispet=false 自定义信息return 整个response
    if (dispet) {
      errorProcess(response, dispet);
      const error = new Error(response.statusText);
      throw error;
    } else {
      return response;
    }
  } else {
    const data = await response.json();
    let _data = data;
    if (!dispet) {
      _data = response;
    }
    return _data;
  }
}

export default function request(options: OptionsProp, dispet = true) {
  const { method, params } = options;
  let url = options.url;
  const opt = _.cloneDeep(options);
  opt.headers = { 'Content-Type': 'application/json' };
  delete opt.url;

  const _get = _params => {
    if (_params && Object.keys(_params).length !== 0) {
      // get 需要把参数拼接在url上
      const paramsArray = [];
      Object.keys(_params).forEach(key =>
        paramsArray.push(`${key}=${_params[key]}`)
      );
      if (url.search(/\?/) === -1) {
        url += `?${paramsArray.join('&')}`;
      } else {
        url += `&${paramsArray.join('&')}`;
      }
    }

    return url;
  };

  switch (method) {
    case 'post':
      opt.body = JSON.stringify(params);
      break;
    case 'get':
      url = _get(params);
      break;
    default:
      url = _get(params);
  }

  return fetch(url, { ...opt })
    .then(response => {
      return checkStatus(response, dispet);
    })
    .catch(errorProcess);
}

const ReqErrDict = {
  500: `Internal Server Error/内部服务器错误!`,
  501: `Not Implemented/未实现!`,
  502: `Bad Gateway/错误的网关!`,
  503: `Service Unavailable/服务无法获得!`,
  504: `Gateway Timeout/网关超时!!`,
  400: `Bad Request/错误请求!`,
  401: `Unauthorized/未授权!`,
  403: `Forbidden/禁止!`,
  404: `Not Found/未找到资源!`,
  405: `Method Not Allowed/方法未允许!`,
  406: `Not Acceptable/无法访问!`,
  407: `Proxy Authentication Required/代理服务器认证要求!`,
  408: `Request Timeout/请求超时!`,
  409: `Conflict/冲突!`,
  410: `Gone/已经不存在!`,
  417: `Expectation Failed/请求头信息期望失败!`
};

/**
 *
 * @param response 接口返回结果
 * @param dispet  是否处理错误信息，默认：true
 */
export function errorProcess(response, dispet: boolean = true) {
  if (dispet) {
    const { status, statusText } = response;
    if (statusText) {
      message.error(statusText);
      return response;
    }

    if (status && ReqErrDict[status]) {
      message.error(ReqErrDict[status]);
    }
  }

  return response;
}
