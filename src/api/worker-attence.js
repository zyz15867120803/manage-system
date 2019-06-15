import instance from 'common/js/axios';
import {url} from 'common/js/config';
import {changeDate} from 'common/js/date';

// 员工获取个人考勤信息
export function getPersonalAttence({date, daterange}, {id}) {
  let data = {
    action: 'showtime',
    id,
    point: date instanceof Date ? changeDate(date) : '',
    time1: daterange[0] ? changeDate(daterange[0]) : '',
    time2: daterange[1] ? changeDate(daterange[1]) : ''
  };

  return instance.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
