<template>
  <div class="worker-notice bg-content">
    <system-notice>
      <div slot="content">
        <Table :columns="noticeInfo" :data="noticeData">
          <template slot-scope="{row, index}" slot="action">
            <Button type="primary" size="small" @click="show(index)">View</Button>
          </template>
        </Table>
      </div>
    </system-notice>
  </div>
</template>

<script>
  import SystemNotice from 'base/system-notice/system-notice';
  import {getNotice} from 'api/system-notice';

  export default {
    name: 'WorkerNotice',
    created() {
      this._getNotice();
    },
    data() {
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
            maxWidth: 150
          }
        ],
        noticeData: []
      };
    },
    methods: {
      show(index) {
        let showData = this.noticeData[index];
        this.$Modal.info({
          title: showData.title,
          content: showData.message
        });
      },
      _getNotice() {
        getNotice().then(res => {
          if (res.stat === 'true') {
            this.noticeData = res.notice;
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
  .worker-notice
    min-height: 100%
</style>
