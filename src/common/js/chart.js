// 获取对应年龄的总人数，男性人数和女性人数
export function getNumByAge(workersData) {
  if (!workersData.length) {
    return [];
  }
  let rows = [];
  for (let i = 0; i < workersData.length; i++) {
    let isExist = false;
    rows.forEach(item => {
      if (item[0] === workersData[i].age) {
        isExist = true;
        if (workersData[i].sex === 'male') {
          item[1] += 1;
          item[2] += 1;
        } else if (workersData[i].sex === 'female') {
          item[1] += 1;
          item[3] += 1;
        }
      }
    });
    if (!isExist) {
      if (workersData[i].sex === 'male') {
        rows[rows.length] = [workersData[i].age, 1, 1, 0];
      } else if (workersData[i].sex === 'female') {
        rows[rows.length] = [workersData[i].age, 1, 0, 1];
      }
    }
  }

  rows.sort((a, b) => {
    return a[0] - b[0];
  });

  return rows.map(item => {
    return {
      'age': item[0] + '岁',
      'totalNum': item[1],
      'maleNum': item[2],
      'femaleNum': item[3]
    };
  });
}

// 获取对应年龄的总人数
export function getTotalNumByAge(workersData) {
  if (!workersData.length) {
    return [];
  }
  let rows = [];
  for (let i = 0; i < workersData.length; i++) {
    let isExist = false;
    rows.forEach(item => {
      if (item[0] === workersData[i].age) {
        isExist = true;
        item[1] += 1;
      }
    });
    if (!isExist) {
      rows[rows.length] = [workersData[i].age, 1];
    }
  }

  rows.sort((a, b) => {
    return a[0] - b[0];
  });

  return rows.map(item => {
    return {
      'age': item[0] + '岁',
      'totalNum': item[1]
    };
  });
}

// 获取对应性别的总人数
export function getNumBySex(workersData) {
  let maleNum = 0;
  let femaleNum = 0;
  workersData.forEach(item => {
    if (item.sex === 'male') {
      maleNum++;
    } else if (item.sex === 'female') {
      femaleNum++;
    }
  });
  return [
    {'sex': 'male', 'totalNum': maleNum},
    {'sex': 'female', 'totalNum': femaleNum}
  ];
}

// 员工个人获取每天考勤记录中的第一条记录
function getFirstAttenct(attenceData) {
  let attenceTemp = attenceData.slice().reverse().map(item => {
    return new Date(item.time1);
  });
  let rowsTemp = [attenceTemp[0]];
  for (let i = 1; i < attenceTemp.length; i++) {
    let preYear = attenceTemp[i - 1].getFullYear();
    let nowYear = attenceTemp[i].getFullYear();
    let preMonth = attenceTemp[i - 1].getMonth();
    let nowMonth = attenceTemp[i].getMonth();
    let preDate = attenceTemp[i - 1].getDate();
    let nowDate = attenceTemp[i].getDate();
    if (preYear !== nowYear || preMonth !== nowMonth || preDate !== nowDate) {
      rowsTemp.push(attenceTemp[i]);
    }
  }

  return rowsTemp;
}

// 员工获取对应月份的考勤天数
export function getDayByMonth(attenceData) {
  if (!attenceData.length) {
    return [];
  }
  let rowsTemp = getFirstAttenct(attenceData);
  let rows = [];
  for (let i = 0; i < rowsTemp.length; i++) {
    let isExist = false;
    rows.forEach(row => {
      if (row[0] === rowsTemp[i].getMonth()) {
        isExist = true;
        row[1]++;
      }
    });
    if (!isExist) {
      rows[rows.length] = [rowsTemp[i].getMonth(), 1];
    }
  }

  rows.sort((a, b) => {
    return a[0] - b[0];
  });

  return rows.map(item => {
    return {
      month: (item[0] + 1) + '月',
      days: item[1]
    };
  });
}

// 员工获取对应时间点的考勤天数
export function getDayByHours(attenceData) {
  if (!attenceData.length) {
    return [];
  }
  let rowsTemp = getFirstAttenct(attenceData);
  let rows = [];
  for (let i = 0; i < rowsTemp.length; i++) {
    let isExist = false;
    rows.forEach(row => {
      if (row[0] === rowsTemp[i].getHours()) {
        isExist = true;
        row[1]++;
      }
    });
    if (!isExist) {
      rows[rows.length] = [rowsTemp[i].getHours(), 1];
    }
  }

  rows.sort((a, b) => {
    return a[0] - b[0];
  });

  return rows.map(item => {
    return {
      hour: item[0] + '点',
      days: item[1]
    };
  });
}

// 获取每个员工每天的第一条考勤信息
function getWorkersFirstAttence(attenceData) {
  let attenceTemp = attenceData.slice().reverse().map(item => {
    return {
      id: item.id,
      sex: item.sex,
      date: new Date(item.time1)
    };
  });
  let rowsTemp = [attenceTemp[0]];
  for (let i = 1; i < attenceTemp.length; i++) {
    let preId = attenceTemp[i - 1].id;
    let nowId = attenceTemp[i].id;
    let preYear = attenceTemp[i - 1].date.getFullYear();
    let nowYear = attenceTemp[i].date.getFullYear();
    let preMonth = attenceTemp[i - 1].date.getMonth();
    let nowMonth = attenceTemp[i].date.getMonth();
    let preDate = attenceTemp[i - 1].date.getDate();
    let nowDate = attenceTemp[i].date.getDate();
    if (preId !== nowId || preYear !== nowYear || preMonth !== nowMonth || preDate !== nowDate) {
      rowsTemp.push(attenceTemp[i]);
    }
  }

  return rowsTemp;
}

// 获取总人数，男性人数和女性人数
function getPersonNum(rowsTemp) {
  let personNum = [[], 0, 0];
  rowsTemp.forEach(item => {
    let isExist = false;
    personNum[0].forEach(id => {
      if (id === item.id) {
        isExist = true;
      }
    });
    if (!isExist) {
      personNum[0].push(item.id);
      if (item.sex === 'male') {
        personNum[1]++;
      } else if (item.sex === 'female') {
        personNum[2]++;
      }
    }
  });
  return [personNum[0].length, personNum[1], personNum[2]];
}

// 获取员工对应月份每人的平均考勤天数，男性每人的平均考勤天数和女性每人的考勤天数
export function getDayByMonthEveryone(attenceData) {
  if (!attenceData.length) {
    return [];
  }
  let rowsTemp = getWorkersFirstAttence(attenceData);
  let rows = [];
  rowsTemp.forEach(item => {
    let isExist = false;
    rows.forEach(row => {
      if (row[0] === item.date.getMonth()) {
        isExist = true;
        if (item.sex === 'male') {
          row[1]++;
          row[2]++;
        } else if (item.sex === 'female') {
          row[1]++;
          row[3]++;
        }
      }
    });
    if (!isExist) {
      if (item.sex === 'male') {
        rows[rows.length] = [item.date.getMonth(), 1, 1, 0];
      } else if (item.sex === 'female') {
        rows[rows.length] = [item.date.getMonth(), 1, 0, 1];
      }
    }
  });
  rows.sort((a, b) => {
    return a[0] - b[0];
  });
  let personNum = getPersonNum(rowsTemp);
  return rows.map(item => {
    return {
      'month': (item[0] + 1) + '月',
      'aveDays': item[1] / personNum[0],
      'aveDaysOfMale': item[2] / personNum[1],
      'aveDaysOfFemale': item[3] / personNum[2]
    };
  });
}

// 获取员工对应时间点的考勤次数，男性的考勤次数和女性的考勤次数
export function getDayByHourAndSex(attenceData) {
  if (!attenceData.length) {
    return [];
  }
  let rowsTemp = getWorkersFirstAttence(attenceData);
  let rows = [];
  rowsTemp.forEach(item => {
    let isExist = false;
    rows.forEach(row => {
      if (row[0] === item.date.getHours()) {
        isExist = true;
        row[1]++;
        if (item.sex === 'male') {
          row[2]++;
        } else if (item.sex === 'female') {
          row[3]++;
        }
      }
    });
    if (!isExist) {
      if (item.sex === 'male') {
        rows[rows.length] = [item.date.getHours(), 1, 1, 0];
      } else if (item.sex === 'female') {
        rows[rows.length] = [item.date.getHours(), 1, 0, 1];
      }
    }
  });

  rows.sort((a, b) => {
    return a[0] - b[0];
  });

  return rows.map(item => {
    return {
      'hour': item[0] + '点',
      'totalNum': item[1],
      'maleNum': item[2],
      'femaleNum': item[3]
    };
  });
}

// 获取平均每人每月的考勤天数，男性平均每人每月的考勤天数和女性每人每月的考勤天数
export function getDayByPersonAndMonth(attenceData) {
  if (!attenceData.length) {
    return [];
  }
  let rowsTemp = getWorkersFirstAttence(attenceData);
  let rows = [rowsTemp.length, 0, 0];
  let monthes = [];
  rowsTemp.forEach(item => {
    let isExist = false;
    if (item.sex === 'male') {
      rows[1]++;
    } else if (item.sex === 'female') {
      rows[2]++;
    }
    monthes.forEach(month => {
      if (month[0] === item.date.getFullYear() && month[1] === item.date.getMonth()) {
        isExist = true;
      }
    });
    if (!isExist) {
      monthes[monthes.length] = [item.date.getFullYear(), item.date.getMonth()];
    }
  });
  let monthNum = monthes.length;
  let personNum = getPersonNum(rowsTemp);

  return [
    {
      'sex': 'all',
      'aveDaysByPersonAndMonth': rows[0] / personNum[0] / monthNum
    },
    {
      'sex': 'male',
      'aveDaysByPersonAndMonth': rows[1] / personNum[1] / monthNum
    },
    {
      'sex': 'female',
      'aveDaysByPersonAndMonth': rows[2] / personNum[2] / monthNum
    }
  ];
}
