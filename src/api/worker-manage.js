import instance from 'common/js/axios';
import qs from 'qs';
import {url} from 'common/js/config';

// 管理员获取对应的员工信息
export function getWorkerInfo({name, sex, age, minAge, maxAge}) {
  let data = {
    action: 'showemp',
    name,
    sex,
    agepoint: age,
    age1: minAge,
    age2: maxAge
  };

  return instance.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

export function addWorkerInfo({username, name, sex, age, phone}) {
  let data = {
    action: 'addemp',
    username,
    name,
    sex,
    age,
    phone
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}

export function reviseWorkerInfo({userName, age, phone}) {
  let data = {
    action: 'updateemp',
    username: userName,
    age,
    phone
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}

export function deleteWorkerInfo({userName}) {
  let data = {
    action: 'deleteemp',
    username: userName
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}
