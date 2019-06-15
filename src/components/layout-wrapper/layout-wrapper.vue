<template>
  <div class="layout-wrapper">
    <div class="layout">
      <Layout class="ivu-layout-has-sider">
        <slot name="sider"></slot>
        <Layout>
          <slot name="header"></slot>
          <slot name="content"></slot>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'LayoutWrapper'
  };
</script>

<style lang="stylus" scoped>
  .layout-wrapper
    position: absolute
    width: 100%
    height: 100%
    .layout
      position: relative
      height: 100%
      background: #f5f7f9
      overflow: hidden
      .ivu-layout.ivu-layout-has-sider
        height: 100%
</style>
