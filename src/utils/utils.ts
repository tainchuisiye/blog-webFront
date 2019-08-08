import { message } from 'antd';
// tslint:disable-next-line:max-line-length
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path: string) {
  return reg.test(path);
}

interface CheckFileOption {
  length?: number;
  width?: number;
  height?: number;
  file?: File;
  accept?: any;
  size?: number;
}

export function checkFile({
  length,
  width,
  height,
  file,
  accept,
  size
}: CheckFileOption) {
  if (!file) {
    message.error('file 不存在!');
    return new Promise((resolve, reject) => {
      reject();
    });
  }
  if (size && file.size > size * size) {
    message.warning('文件超出大小!');
    return new Promise((resolve, reject) => {
      reject();
    });
  }
  /** 验证文件类型 */
  if (
    accept &&
    !(accept instanceof Array) &&
    file.type.indexOf(accept) === -1
  ) {
    message.error(`文件类型错误，请选择${accept}格式的文件!`);
    return new Promise((resolve, reject) => {
      reject();
    });
    // tslint:disable-next-line:no-else-after-return
  } else if (accept && accept instanceof Array) {
    const str = file.name;
    const i = str.lastIndexOf('.');
    const len = str.length;
    const hz = str.substring(i + 1, len);
    const flag = false;
    if (accept.filter(type => type === hz).length === 0) {
      message.error(`文件类型错误，请选择${accept.join('/')}格式的文件!`);
      return new Promise((resolve, reject) => {
        reject();
      });
    }
  }
  const _w = width;
  const _h = height;
  /** 上传图片 */
  if (file.type.indexOf('image') !== -1) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        /** 验证宽度 */
        if (_w && img.width !== _w && _h === null) {
          message.error(`图片宽度为 ${_w} 高度不做限制`);
          reject();
        } else if (_h && img.height !== _h && _w === null) {
          /** 验证高度 */
          message.error(`图片高度为 ${_h} 宽度不做限制`);
          reject();
        } else if (_w && img.width !== _w && _h && img.height !== _h) {
          message.error(`图片尺寸为 ${_w} * ${_h}`);
          reject();
        } else {
          resolve({
            src: img.src,
            width: img.width,
            height: img.height
          });
        }
      };
      img.onerror = () => {
        reject();
      };
      img.src = window.URL.createObjectURL(file);
    });
  }
  return new Promise((resolve, reject) => {
    resolve();
  });
}
export function downFile({
  data = '',
  fileName = Date.now().toString(),
  type = '.csv'
}) {
  let a = document.createElement('a');
  a.href = `data:attachment/${type};charset=utf-8,\uFEFF${encodeURIComponent(
    data
  )}`;
  a.target = '_blank';
  a.download = `${fileName}${type}`;
  a.click();
  a = null;
}
export function fMoney(s) {
  const str = s ? s.toString() : '';
  const l = str.split('').reverse();
  let t = '';
  for (let i = 0; i < l.length; i += 1) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
  }
  return t
    .split('')
    .reverse()
    .join('');
}
export function toNum(s) {
  const str = s ? s.toString() : '';
  const num = s.split(',').join('');
  return +num;
}
// export function exportExcel({
//   data,
//   fileName = Date.now().toString()
// }) {
//   const blob = new Blob(['\ufeff' + data]);
//   const objectUrl = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   document.body.appendChild(a);
//   a.setAttribute('style', 'display:none');
//   a.setAttribute('href', objectUrl);
//   a.setAttribute('download', fileName);
//   a.click();
//   URL.revokeObjectURL(objectUrl);
// }
