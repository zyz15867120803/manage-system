<template>
  <div class="system-notice">
    <div class="header-title">
      <div class="title-content">
        <div class="title-icon">
          <Icon type="md-volume-up" :size="14"></Icon>
        </div>
        <p class="title">系统公告</p>
      </div>
      <div class="title-btn">
        <slot name="title-btn"></slot>
      </div>
    </div>
    <div class="content-wrapper">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SystemNotice'
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
  .content-wrapper
    padding: 15px
</style>
