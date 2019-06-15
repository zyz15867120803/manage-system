<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {login} from 'api/login';
  import CookieUtil from 'common/js/util';
  import {mapMutations} from 'vuex';

  export default {
    name: 'App',
    created() {
      login({}).then(res => {
        if (res.stat === 'true') {
          CookieUtil.set('token', res.token);
          if (res.emp) {
            this.setUser(res.emp[0]);
            this.$router.push({
              name: 'worker'
            });
          } else if (res.admin) {
            this.setUser(res.admin[0]);
            this.$router.push({
              name: 'manager'
            });
          }
        } else if (res.stat === 'false') {
          this.$router.push({
            name: 'login'
          });
        }
      });
    },
    methods: {
      ...mapMutations({
        setUser: 'SET_USER'
      })
    }
  };
</script>

<style lang="stylus">
</style>
