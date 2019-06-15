<template>
  <Modal
    :title="title"
    :mask-closable="false"
    :loading="isLoading"
    ok-text="提交"
    class-name="vertical-center-modal"
    v-model="showFlag"
    @on-ok="confirmRevise('reviseForm')"
  >
    <Form ref="reviseForm" :model="revisedData" :rules="revisedRules" :label-width="40" label-position="right">
      <FormItem label="姓名">
        <Input type="text" v-model="revisedData.name" readonly></Input>
      </FormItem>
      <FormItem label="性别">
        <Input type="text" v-model="revisedData.sex" readonly></Input>
      </FormItem>
      <FormItem label="年龄" prop="age">
        <Input type="text" v-model="revisedData.age" clearable></Input>
      </FormItem>
      <FormItem label="手机" prop="phone">
        <Input type="tel" v-model="revisedData.phone" clearable></Input>
      </FormItem>
    </Form>
  </Modal>
</template>

<script>
  export default {
    name: 'ReviseModal',
    props: {
      reviseData: {
        type: Object,
        default() {
          return {
            name: '',
            sex: '',
            age: '',
            phone: ''
          };
        }
      },
      title: {
        type: String,
        default: '修改个人信息'
      }
    },
    data() {
      const ageValidate = (rule, value, callback) => {
        if (!value) {
          callback(new Error('年龄不能为空'));
        } else if (isNaN(value)) {
          callback(new Error('年龄必须为数值'));
        } else if (value < 18 || value > 60) {
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
        revisedData: {
          name: this.reviseData.name,
          sex: this.reviseData.sex,
          age: this.reviseData.age,
          phone: this.reviseData.phone
        },
        revisedRules: {
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
      confirmRevise(name) {
        console.log(this.reviseData);
        console.log(this.revisedData);
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$emit('confirmRevise', this.revisedData);
            this.hide();
          } else {
            this.isLoading = false;
            setTimeout(() => {
              this.isLoading = true;
            }, 20);
          }
        });
      }
    },
    watch: {
      reviseData(newReviseData) {
        this.revisedData = Object.assign(this.revisedData, newReviseData);
      }
    }
  };
</script>

<style lang="stylus" scoped>

</style>
