<template>
  <div class="personal-info bg-content">
    <div class="revise-btn-wrapper">
      <Button @click="reviseUserInfo" type="info" icon="md-create">修改</Button>
    </div>
    <div class="table-wrapper">
      <Table :columns="userInfo" :data="userData"></Table>
    </div>
    <revise-modal @confirmRevise="confirmRevise" ref="reviseModal" :reviseData="userData[0]"></revise-modal>
  </div>
</template>

<script>
  import ReviseModal from 'base/revise-modal/revise-modal';
  import {mapGetters} from 'vuex';
  import {getPersonalInfo, revisePersonalInfo} from 'api/worker-info';

  export default {
    name: 'PersonalInfo',
    created() {
      this._getPersonalInfo();
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    data() {
      return {
        userInfo: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '手机',
            key: 'phone'
          }
        ],
        userData: []
      };
    },
    methods: {
      reviseUserInfo() {
        this.$refs.reviseModal.show();
      },
      confirmRevise(revisedData) {
        revisePersonalInfo(revisedData).then(res => {
          if (res.stat === 'true') {
            this._getPersonalInfo();
            this.$Message.success({
              content: '修改信息成功',
              duration: 2
            });
          } else if (res.stat === 'false') {
            this.$Message.error({
              content: '修改信息失败',
              duration: 2
            });
          }
        });
      },
      _getPersonalInfo() {
        setTimeout(() => {
          getPersonalInfo(this.user).then(res => {
            let workerTemp = res;
            if (workerTemp instanceof Array) {
              workerTemp = workerTemp.map(item => {
                if (item.sex === true) {
                  item.sex = 'male';
                } else if (item.sex === false) {
                  item.sex = 'female';
                } else {
                  item.sex = '';
                }
                return item;
              });
            }
            this.userData = workerTemp;
          });
        }, 200);
      }
    },
    components: {
      ReviseModal
    }
  };
</script>

<style lang="stylus" scoped>
  .personal-info
    display: flex
    flex-direction: column
    justify-content: center
    width: 100%
    height: 100%
    .revise-btn-wrapper
      display: flex
      justify-content: flex-end
      padding: 0 15px
    .table-wrapper
      width: 100%
      padding: 15px 15px 0
</style>
