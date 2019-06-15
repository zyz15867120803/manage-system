import instance from 'common/js/axios';
import qs from 'qs';
import {url} from 'common/js/config';

// 获取系统公告
export function getNotice() {
  let data = {
    action: 'shownotice'
  };

  return instance.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加系统公告
export function addNotice(addData, {username}) {
  let data = {
    action: 'addnotice',
    title: addData.title,
    author: username,
    message: addData.message
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}

// 修改系统公告
export function reviseNotice(reviseData, {username}) {
  let data = {
    action: 'updatenotice',
    id: reviseData.id,
    author: username,
    title: reviseData.title,
    message: reviseData.message
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}

// 删除系统公告
export function deleteNotice(deleteData, {username}) {
  let data = {
    action: 'deletenotice',
    id: deleteData.id,
    author: username
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}
