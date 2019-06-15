<template>
  <div class="manager-home bg-content">
    <div class="header-title">
      <p class="title">今日考勤</p>
    </div>
    <div class="attence-wrapper">
      <Table :columns="attenceInfo" :data="attenceData"></Table>
    </div>
  </div>
</template>

<script>
  import {getWorkersAttence} from 'api/manager-attence';

  export default {
    name: 'ManagerHome',
    created() {
      this._getWorkersAttence();
      this.timer = setInterval(() => {
        this._getWorkersAttence();
      }, 60 * 1000);
    },
    activated() {
      this.timer && clearInterval(this.timer);
      this._getWorkersAttence();
      this.timer = setInterval(() => {
        this._getWorkersAttence();
      }, 60 * 1000);
    },
    deactivated() {
      this.timer && clearInterval(this.timer);
    },
    data() {
      return {
        attenceInfo: [
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '性别',
            key: 'sex',
            align: 'center'
          },
          {
            title: '年龄',
            key: 'age',
            align: 'center'
          },
          {
            title: '签到时间',
            key: 'time1',
            align: 'center'
          },
          {
            title: '签退时间',
            key: 'time2',
            align: 'center'
          }
        ],
        attenceData: []
      };
    },
    methods: {
      _getWorkersAttence() {
        let date = new Date();
        getWorkersAttence({date}).then(res => {
          this.attenceData = res.reverse() || [];
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .manager-home
    min-height: 100%
    .header-title
      padding: 10px 15px
      border-bottom: 1px solid #dddee1
      .title
        font-size: 14px
        font-weight: bold
    .attence-wrapper
      padding: 15px
</style>
