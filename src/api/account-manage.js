import instance from 'common/js/axios';
import qs from 'qs';
import {url} from 'common/js/config';

// 员工或管理员修改密码
export function revisePassword(accountData, {username}) {
  let data = {
    action: 'password',
    username,
    password: accountData.oldPassword,
    newpassword: accountData.newPassword
  };

  return instance.post(url, qs.stringify(data)).then(res => {
    return Promise.resolve(res.data);
  });
}
