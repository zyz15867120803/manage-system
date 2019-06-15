<template>
  <layout-wrapper>
    <worker-sider slot="sider" v-show="showSider"></worker-sider>
    <worker-drawer slot="sider" v-show="!showSider"></worker-drawer>
    <header-wrapper slot="header"></header-wrapper>
    <content-wrapper slot="content"></content-wrapper>
  </layout-wrapper>
</template>

<script>
  import LayoutWrapper from 'components/layout-wrapper/layout-wrapper';
  import WorkerSider from 'components/worker-sider/worker-sider';
  import WorkerDrawer from 'components/worker-drawer/worker-drawer';
  import HeaderWrapper from 'components/header-wrapper/header-wrapper';
  import ContentWrapper from 'components/content-wrapper/content-wrapper';

  export default {
    name: 'Worker',
    computed: {
      showSider() {
        if (this.fullWidth <= 768) {
          return false;
        } else {
          return true;
        }
      }
    },
    created() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    data() {
      return {
        fullWidth: document.documentElement.clientWidth
      };
    },
    methods: {
      handleResize(event) {
        this.fullWidth = document.documentElement.clientWidth;
      }
    },
    components: {
      LayoutWrapper,
      WorkerSider,
      WorkerDrawer,
      HeaderWrapper,
      ContentWrapper
    }
  };
</script>

<style lang="stylus" scoped>

</style>
