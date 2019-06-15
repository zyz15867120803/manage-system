<template>
  <div class="search-wrapper">
    <div class="header-title">
      <div class="title-content">
        <div class="title-icon">
          <slot name="title-icon"></slot>
        </div>
        <p class="title">{{title}}</p>
      </div>
      <div class="title-btn">
        <slot name="title-btn"></slot>
      </div>
    </div>
    <div class="search-content">
      <slot name="search-content"></slot>
    </div>
    <div class="search-btn-group">
      <div class="search-btn">
        <Button @click="search" type="info" icon="ios-search">查询</Button>
      </div>
      <div class="chart-btn">
        <Select v-model="mode" placeholder="查看视图统计" style="width: 120px">
          <Option value="table">表格</Option>
          <Option value="barChart">柱状图</Option>
          <Option value="pieChart">饼状图</Option>
          <Option value="lineChart">折线图</Option>
        </Select>
      </div>
    </div>
    <div class="content-wrapper">
      <slot name="content"></slot>
    </div>
    <div class="page-wrapper">
      <slot name="page"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchWrapper',
    props: {
      title: {
        type: String,
        default: '员工详情'
      }
    },
    data() {
      return {
        mode: 'table'
      };
    },
    methods: {
      search() {
        this.$emit('search');
      }
    },
    watch: {
      mode(newMode) {
        this.$emit('modeChange', newMode);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .header-title
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 15px
    border-bottom: 1px solid #dddee1
    .title-content
      display: flex
      align-items: center
      .title-icon
        display: flex
        align-items: center
        margin-right: 5px
      .title
        font-size: 14px
        font-weight: bold
  .search-content
    padding: 15px 15px 0
  .search-btn-group
    display: flex
    justify-content: space-between
    align-items: center
    padding: 15px 15px 0
  .content-wrapper
    padding: 15px 15px 0
  .page-wrapper
    display: flex
    justify-content: flex-end
    align-items: center
    padding: 15px
</style>
