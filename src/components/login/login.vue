<template>
  <div class="login">
    <login-wrapper>
      <login-form ref="loginForm" @login="login"></login-form>
    </login-wrapper>
  </div>
</template>

<script>
  import LoginWrapper from 'base/login-wrapper/login-wrapper';
  import LoginForm from 'base/login-form/login-form';
  import {login} from 'api/login';
  import CookieUtil from 'common/js/util';
  import {mapMutations} from 'vuex';

  export default {
    name: 'Login',
    methods: {
      login(loginform) {
        login(loginform).then(res => {
          if (res.stat === 'true') {
            CookieUtil.set('token', res.token);
            if (res.flag === '1') {
              this.setUser(res.emp[0]);
              this.$router.push({
                name: 'worker'
              });
            } else if (res.flag === '2') {
              this.setUser(res.admin[0]);
              this.$router.push({
                name: 'manager'
              });
            }
          } else if (res.stat === 'false') {
            this.$refs.loginForm.resetLoading();
            this.$Message.error({
              content: '账号或密码错误',
              duration: 2
            });
          }
        });
      },
      ...mapMutations({
        setUser: 'SET_USER'
      })
    },
    components: {
      LoginWrapper,
      LoginForm
    }
  };
</script>

<style lang="stylus" scoped>
  .login
    position: fixed
    top: 0
    bottom: 0
    width: 100%
</style>
