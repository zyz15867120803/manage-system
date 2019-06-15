<template>
  <Content class="main-content">
    <Layout class="main-layout">
      <content-tag></content-tag>
      <Content class="content-wrapper">
        <keep-alive>
          <router-view />
        </keep-alive>
      </Content>
    </Layout>
  </Content>
</template>

<script>
  import ContentTag from 'base/content-tag/content-tag';

  export default {
    name: 'ContentWrapper',
    components: {
      ContentTag
    }
  };
</script>

<style lang="stylus" scoped>
  .main-content
    width: 100%
    height: calc(100% - 60px)
    .main-layout
      height: 100%
      overflow: hidden
      .content-wrapper
        position: relative
        height: 100%
        padding: 10px
        overflow: auto
        background-color: #ddd
</style>
