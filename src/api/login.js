import instance from 'common/js/axios';
import qs from 'qs';
import {url} from 'common/js/config';

export function login(loginform) {
  let data = {
    action: 'login',
    userName: loginform.username,
    passWord: loginform.password,
    flag: loginform.type === 'worker' ? '1' : loginform.type === 'manager' ? '2' : ''
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}
