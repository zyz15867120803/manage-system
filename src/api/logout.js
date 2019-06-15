import instance from 'common/js/axios';
import qs from 'qs';
import {url} from 'common/js/config';

export function logout() {
  let data = {
    action: 'logout'
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}
