import Vue from 'vue';
import Router from 'vue-router';
// import Login from 'components/login/login';
// import Manager from 'components/manager/manager';
// import Worker from 'components/worker/worker';
// import WorkerHome from 'base/worker-home/worker-home';
// import PersonalInfo from 'base/personal-info/personal-info';
// import AccountManage from 'base/account-manage/account-manage';
// import PersonalAttence from 'base/personal-attence/personal-attence';
// import WorkerNotice from 'base/worker-notice/worker-notice';
// import ManagerHome from 'base/manager-home/manager-home';
// import WorkerInfo from 'base/worker-info/worker-info';
// import AttenceInfo from 'base/attence-info/attence-info';
// import ManagerNotice from 'base/manager-notice/manager-notice';
// import SystemSetter from 'base/system-setter/system-setter';

Vue.use(Router);

const Login = () => import('components/login/login');
const Manager = () => import('components/manager/manager');
const Worker = () => import('components/worker/worker');
const WorkerHome = () => import('base/worker-home/worker-home');
const PersonalInfo = () => import('base/personal-info/personal-info');
const AccountManage = () => import('base/account-manage/account-manage');
const PersonalAttence = () => import('base/personal-attence/personal-attence');
const WorkerNotice = () => import('base/worker-notice/worker-notice');
const ManagerHome = () => import('base/manager-home/manager-home');
const WorkerInfo = () => import('base/worker-info/worker-info');
const AttenceInfo = () => import('base/attence-info/attence-info');
const ManagerNotice = () => import('base/manager-notice/manager-notice');
const SystemSetter = () => import('base/system-setter/system-setter');
const FaceAttencr = () => import('components/face-attence/face-attence');

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/manager',
      name: 'manager',
      component: Manager,
      children: [
        {
          path: 'manager-home',
          name: 'manager-home',
          component: ManagerHome
        },
        {
          path: 'worker-info',
          name: 'worker-info',
          component: WorkerInfo
        },
        {
          path: 'attence-info',
          name: 'attence-info',
          component: AttenceInfo
        },
        {
          path: 'manager-notice',
          name: 'manager-notice',
          component: ManagerNotice
        },
        {
          path: 'account-manage',
          name: 'revise-password',
          component: AccountManage
        },
        {
          path: 'system-setter',
          name: 'manager-setter',
          component: SystemSetter
        }
      ]
    },
    {
      path: '/worker',
      name: 'worker',
      component: Worker,
      children: [
        {
          path: 'worker-home',
          name: 'worker-home',
          component: WorkerHome
        },
        {
          path: 'personal-info',
          name: 'personal-info',
          component: PersonalInfo
        },
        {
          path: 'account-manage',
          name: 'account-manage',
          component: AccountManage
        },
        {
          path: 'personal-attence',
          name: 'personal-attence',
          component: PersonalAttence
        },
        {
          path: 'worker-notice',
          name: 'worker-notice',
          component: WorkerNotice
        },
        {
          path: 'system-setter',
          name: 'worker-setter',
          component: SystemSetter
        }
      ]
    },
    {
      path: '/face-attence',
      name: 'face-attence',
      component: FaceAttencr
    }
  ]
});
