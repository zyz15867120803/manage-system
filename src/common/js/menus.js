export const managerMenus = [
  {
    name: 'home',
    title: '首页',
    icon: 'ios-home',
    href: {
      name: 'manager-home'
    },
    closable: false
  },
  {
    name: 'worker-manage',
    title: '员工管理',
    icon: 'ios-people',
    children: [
      {
        name: 'worker-info',
        title: '员工详情',
        href: {
          name: 'worker-info'
        },
        closable: true
      }
    ]
  },
  {
    name: 'attence-manage',
    title: '考勤管理',
    icon: 'md-stats',
    children: [
      {
        name: 'attence-info',
        title: '考勤详情',
        href: {
          name: 'attence-info'
        },
        closable: true
      }
    ]
  },
  {
    name: 'notice-manage',
    title: '公告管理',
    icon: 'md-volume-up',
    children: [
      {
        name: 'system-notice',
        title: '系统公告',
        href: {
          name: 'manager-notice'
        },
        closable: true
      }
    ]
  },
  {
    name: 'account-manage',
    title: '账号管理',
    icon: 'ios-keypad',
    children: [
      {
        name: 'revise-password',
        title: '修改密码',
        href: {
          name: 'revise-password'
        },
        closable: true
      }
    ]
  },
  {
    name: 'system-manage',
    title: '系统管理',
    icon: 'ios-cog',
    children: [
      {
        name: 'system-setter',
        title: '系统设置',
        href: {
          name: 'manager-setter'
        },
        closable: true
      }
    ]
  }
];

export const workerMenus = [
  {
    name: 'home',
    title: '首页',
    icon: 'ios-home',
    href: {
      name: 'worker-home'
    },
    closable: false
  },
  {
    name: 'personal-center',
    title: '个人中心',
    icon: 'ios-people',
    children: [
      {
        name: 'personal-info',
        title: '个人信息',
        href: {
          name: 'personal-info'
        },
        closable: true
      },
      {
        name: 'account-manage',
        title: '账号管理',
        href: {
          name: 'account-manage'
        },
        closable: true
      }
    ]
  },
  {
    name: 'attence-manage',
    title: '考勤管理',
    icon: 'md-stats',
    children: [
      {
        name: 'attence-info',
        title: '个人考勤',
        href: {
          name: 'personal-attence'
        },
        closable: true
      }
    ]
  },
  {
    name: 'notice-manage',
    title: '公告管理',
    icon: 'md-volume-up',
    children: [
      {
        name: 'system-notice',
        title: '系统公告',
        href: {
          name: 'worker-notice'
        },
        closable: true
      }
    ]
  },
  {
    name: 'system-manage',
    title: '系统管理',
    icon: 'ios-cog',
    children: [
      {
        name: 'system-setter',
        title: '系统设置',
        href: {
          name: 'worker-setter'
        },
        closable: true
      }
    ]
  }
];
