<template>
  <Modal
    title="添加员工信息"
    :mask-closable="false"
    :loading="isLoading"
    ok-text="添加"
    class-name="vertical-center-modal"
    v-model="showFlag"
    @on-ok="confirmAdd('addForm')"
  >
    <Form ref="addForm" :model="addData" :rules="addRules" :label-width="50" label-position="right">
      <FormItem label="用户名" prop="username">
        <Input type="text" v-model="addData.username" clearable></Input>
      </FormItem>
      <FormItem label="姓名" prop="name">
        <Input type="text" v-model="addData.name" clearable></Input>
      </FormItem>
      <FormItem label="性别" prop="sex">
        <Select v-model="addData.sex" placeholder="请输入性别">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
        </Select>
      </FormItem>
      <FormItem label="年龄" prop="age">
        <Input type="text" v-model="addData.age" clearable></Input>
      </FormItem>
      <FormItem label="手机" prop="phone">
        <Input type="tel" v-model="addData.phone" clearable></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  export default {
    name: 'AddModal',
    data() {
      const usernameValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入用户名'));
        } else if (isNaN(value)) {
          callback(new Error('用户名只能包含数字'));
        } else if (value.length < 6) {
          callback(new Error('用户名不能少于6位'));
        } else if (value.length > 13) {
          callback(new Error('用户名不能超过13位'));
        } else {
          callback();
        }
      };
      const nameValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入姓名'));
        }
        callback();
      };
      const sexValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入性别'));
        }
        callback();
      };
      const ageValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('年龄不能为空'));
        } else if (isNaN(value)) {
          callback(new Error('请输入数值'));
        } else if (!(/^[2-5][0-9]$/.test(value))) {
          callback(new Error('输入的年龄不在范围内'));
        } else {
          callback();
        }
      };
      const phoneValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('手机号码不能为空'));
        } else if (!(/^1[34578][0-9]{9}$/.test(value))) {
          callback(new Error('手机号码输入错误'));
        } else {
          callback();
        }
      };

      return {
        showFlag: false,
        isLoading: true,
        addData: {
          username: '',
          name: '',
          sex: '',
          age: '',
          phone: '',
          address: ''
        },
        addRules: {
          username: [
            {
              validator: usernameValidate,
              trigger: 'change'
            }
          ],
          name: [
            {
              validator: nameValidate,
              trigger: 'change'
            }
          ],
          sex: [
            {
              validator: sexValidate,
              trigger: 'change'
            }
          ],
          age: [
            {
              validator: ageValidate,
              trigger: 'change'
            }
          ],
          phone: [
            {
              validator: phoneValidate,
              trigger: 'change'
            }
          ]
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
      },
      hide() {
        this.showFlag = false;
      },
      confirmAdd(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$emit('confirmAdd', this.addData);
            this.hide();
          } else {
            this.isLoading = false;
            setTimeout(() => {
              this.isLoading = true;
            }, 20);
          }
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
