<template>
  <div class="manager-notice bg-content">
    <system-notice>
      <div slot="title-btn">
        <Button @click="addNotice" type="primary" icon="md-add">添加公告</Button>
      </div>
      <div slot="content">
        <Table :columns="noticeInfo" :data="noticeData">
          <template slot-scope="{row, index}" slot="action">
            <Button type="info" size="small" @click="show(index)">View</Button>
            <Button type="primary" size="small" @click="revise(index)">revise</Button>
            <Poptip
              confirm
              transfer
              title="确认删除该这条公告吗?"
              placement="bottom-end"
              @on-ok="deleteNotice(index)"
            >
              <Button type="error" size="small">delete</Button>
            </Poptip>
          </template>
        </Table>
      </div>
    </system-notice>
    <Modal
      v-model="addFlag"
      title="添加系统公告"
      class-name="vertical-center-modal"
      :mask-closable="false"
      :loading="addLoading"
      @on-ok="confirmAdd"
      @on-cancel="cancelAdd"
    >
      <Form ref="addForm" :model="noticeContent" :rules="noticeRules">
        <FormItem prop="title" label="标题">
          <Input v-model="noticeContent.title" clearable></Input>
        </FormItem>
        <FormItem prop="message" label="内容">
          <Input type="textarea" v-model="noticeContent.message" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="reviseFlag"
      title="修改系统公告"
      class-name="vertical-center-modal"
      :mask-closable="false"
      :loading="reviseLoading"
      @on-ok="confirmRevise"
    >
      <Form ref="reviseForm" :model="reviseData" :rules="noticeRules">
        <FormItem prop="title" label="标题">
          <Input v-model="reviseData.title" clearable></Input>
        </FormItem>
        <FormItem prop="message" label="内容">
          <Input type="textarea" v-model="reviseData.message" :rows="4"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import SystemNotice from 'base/system-notice/system-notice';
  import {getNotice, addNotice, reviseNotice, deleteNotice} from 'api/system-notice';
  import {mapGetters} from 'vuex';

  export default {
    name: 'ManagerNotice',
    created() {
      this._getNotice();
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    data() {
      const titleValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('标题不能为空'));
        }
        callback();
      };
      const messageValidate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('内容不能为空'));
        }
        callback();
      };

      return {
        noticeInfo: [
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '发布时间',
            key: 'time',
            align: 'center',
            maxWidth: 300
          },
          {
            title: '操作',
            slot: 'action',
            align: 'center',
            maxWidth: 300
          }
        ],
        noticeData: [],
        addFlag: false,
        addLoading: true,
        noticeContent: {
          title: '',
          message: ''
        },
        noticeRules: {
          title: [
            {
              validator: titleValidate,
              trigger: 'change'
            }
          ],
          message: [
            {
              validator: messageValidate,
              trigger: 'change'
            }
          ]
        },
        reviseFlag: false,
        reviseLoading: true,
        reviseData: {}
      };
    },
    methods: {
      addNotice() {
        this.addFlag = true;
      },
      show(index) {
        let showData = this.noticeData[index];
        this.$Modal.info({
          title: showData.title,
          content: showData.message
        });
      },
      revise(index) {
        this.reviseData = JSON.parse(JSON.stringify(this.noticeData[index]));
        this.reviseFlag = true;
      },
      deleteNotice(index) {
        deleteNotice(this.noticeData[index], this.user).then(res => {
          if (res.stat === 'true') {
            this.noticeData.splice(index, 1);
            this.$Message.success({
              content: '删除成功',
              duration: 2
            });
          } else if (res.stat === 'false') {
            this.$Message.error({
              content: '删除失败',
              duration: 2
            });
          } else if (res.stat === 'error') {
            this.$Message.error({
              content: '无操作权限',
              duration: 2
            });
          }
        });
      },
      confirmAdd() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            addNotice(this.noticeContent, this.user).then(res => {
              if (res.stat === 'true') {
                console.log(res.notice);
                this.noticeData.unshift(res.notice[0]);
                this.$Message.success({
                  content: '添加成功',
                  duration: 2
                });
                this.$refs.addForm.resetFields();
              } else if (res.stat === 'false') {
                this.$Message.error({
                  content: '添加失败',
                  duration: 2
                });
              } else if (res.stat === 'error') {
                this.$Message.error({
                  content: '无操作权限',
                  duration: 2
                });
              }
            });
            this.addFlag = false;
          } else {
            this.addLoading = false;
            setTimeout(() => {
              this.addLoading = true;
            }, 20);
          }
        });
      },
      cancelAdd() {
        this.$refs.addForm.resetFields();
      },
      confirmRevise() {
        this.$refs.reviseForm.validate(valid => {
          if (valid) {
            reviseNotice(this.reviseData, this.user).then(res => {
              if (res.stat === 'true') {
                let index = this.noticeData.findIndex(item => {
                  return item.id === this.reviseData.id;
                });
                this.noticeData.splice(index, 1, res.notice[0]);
                this.$Message.success({
                  content: '修改成功',
                  duration: 2
                });
              } else if (res.stat === 'false') {
                this.$Message.error({
                  content: '修改失败',
                  duration: 2
                });
              } else if (res.stat === 'error') {
                this.$Message.error({
                  content: '无操作权限',
                  duration: 2
                });
              }
            });
            this.reviseFlag = false;
          } else {
            this.reviseLoading = false;
            setTimeout(() => {
              this.reviseLoading = true;
            }, 20);
          }
        });
      },
      _getNotice() {
        getNotice().then(res => {
          if (res.stat === 'true') {
            this.noticeData = res.notice.reverse();
          } else if (res.stat === 'false') {
          }
        });
      }
    },
    components: {
      SystemNotice
    }
  };
</script>

<style lang="stylus" scoped>
  .manager-notice
    min-height: 100%
</style>
