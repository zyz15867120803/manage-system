<template>
  <Form ref="loginForm" :model="loginForm" :rules="loginRules">
    <FormItem prop="username">
      <Input ref="username" v-model.trim="loginForm.username" type="text" placeholder="用户名" size="large" clearable>
        <Icon type="ios-person-outline" slot="prepend" class="icon-cls" />
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input v-model.trim="loginForm.password" type="password" placeholder="密码" size="large" clearable>
        <Icon type="ios-lock-outline" slot="prepend" class="icon-cls" />
      </Input>
    </FormItem>
    <FormItem>
      <RadioGroup v-model="loginForm.type" size="large" class="type">
        <Radio label="worker" class="type-item">用户</Radio>
        <Radio label="manager" class="type-item">管理员</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button @click="login('loginForm')" :loading="isloading" type="primary" size="large" long>
        <span v-if="!isloading">登录</span>
        <span v-else>登录中...</span>
      </Button>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        isloading: false,
        loginForm: {
          username: '',
          password: '',
          type: 'worker'
        },
        loginRules: {
          username: [
            {
              required: true,
              message: '用户名不能为空',
              trigger: 'change'
            }
          ],
          password: [
            {
              required: true,
              message: '密码不能为空',
              trigger: 'change'
            }
          ]
        }
      };
    },
    methods: {
      login(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$emit('login', this.loginForm);
          } else {
            this.$refs.username.focus();
          }
        });
      },
      resetLoading() {
        this.isloading = false;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .type
    display: flex
    justify-content: center
    align-items: center
    .type-item
      flex: 1
      text-align: center
</style>
