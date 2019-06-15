import instance from 'common/js/axios';
import {url} from 'common/js/config';
import {changeDate} from 'common/js/date';

// 管理员查看或查询员工考勤信息
export function getWorkersAttence({name, sex, age, date, minAge, maxAge, daterange = []}) {
  let data = {
    action: 'showtime',
    name,
    sex,
    agepoint: age,
    age1: minAge,
    age2: maxAge,
    timepoint: date instanceof Date ? changeDate(date) : '',
    time1: daterange[0] ? changeDate(daterange[0]) : '',
    time2: daterange[1] ? changeDate(daterange[1]) : ''
  };

  return instance.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
