import instance from 'common/js/axios';
import qs from 'qs';
import {url} from 'common/js/config';

// 员工获取个人信息
export function getPersonalInfo({id}) {
  let data = {
    action: 'showemp',
    id
  };

  return instance.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function revisePersonalInfo({id, age, phone}) {
  let data = {
    action: 'updateemp',
    id,
    age,
    phone
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  })
}
