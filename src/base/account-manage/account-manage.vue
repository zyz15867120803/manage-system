<template>
  <div class="account-manage bg-content">
    <Row class="row-container">
      <Col :xs="xsCol" :lg="lgCol">
        <Card>
          <p slot="title">修改密码</p>
          <Form ref="accountForm" :model="accountData" :rules="accountRules" :label-width="60" label-position="right">
            <FormItem prop="oldPassword" label="旧密码">
              <Input ref="oldPassword" v-model="accountData.oldPassword" type="password" clearable>
              </Input>
            </FormItem>
            <FormItem prop="newPassword" label="新密码">
              <Input v-model="accountData.newPassword" type="password" clearable>
              </Input>
            </FormItem>
            <FormItem prop="confirmPassword" label="确认密码">
              <Input v-model="accountData.confirmPassword" type="password" clearable>
              </Input>
            </FormItem>
          </Form>
          <Row>
            <Col span="6" offset="4">
              <Button @click="reset" long>重置</Button>
            </Col>
            <Col span="6" offset="4" >
              <Button @click="revisePassword" type="primary" long>确定</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import {revisePassword} from 'api/account-manage';
  import {mapGetters} from 'vuex';

  export default {
    name: 'AccountManage',
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    data() {
      const oldPwdValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      const newPwdValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入新密码'));
        } else if (!(/^[0-9a-zA-Z]+$/.test(value))) {
          callback(new Error('密码只能包含数字和字母'));
        } else if (value.length < 6) {
          callback(new Error('密码长度不能少于6位'));
        } else if (value.length > 15) {
          callback(new Error('密码长度不能超过15位'));
        } else {
          callback();
        }
      };
      const confirmPwdValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请确认密码'));
        } else if (value !== this.accountData.newPassword) {
          callback(new Error('前后两次密码输入不一致'));
        } else {
          callback();
        }
      };

      return {
        xsCol: {
          span: 16,
          offset: 4
        },
        lgCol: {
          span: 8,
          offset: 8
        },
        accountData: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        accountRules: {
          oldPassword: [
            {
              validator: oldPwdValidate,
              trigger: 'change'
            }
          ],
          newPassword: [
            {
              validator: newPwdValidate,
              trigger: 'change'
            }
          ],
          confirmPassword: [
            {
              validator: confirmPwdValidate,
              trigger: 'change'
            }
          ]
        }
      };
    },
    methods: {
      reset() {
        this.$refs.accountForm.resetFields();
        this.$refs.oldPassword.focus();
      },
      revisePassword() {
        this.$refs.accountForm.validate(valid => {
          if (valid) {
            revisePassword(this.accountData, this.user).then(res => {
              if (res.stat === 'true') {
                this.$Message.success({
                  content: '修改密码成功',
                  duration: 2
                });
                this.$refs.accountForm.resetFields();
              } else if (res.stat === 'false') {
                this.$Message.error({
                  content: '修改密码失败',
                  duration: 2
                });
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .account-manage
    display: flex
    align-items: center
    width: 100%
    height: 100%
    .row-container
      flex: 1
</style>
