<template>
  <layout-wrapper>
    <manager-sider slot="sider" v-show="showSider"></manager-sider>
    <manager-drawer slot="sider" v-show="!showSider"></manager-drawer>
    <header-wrapper slot="header"></header-wrapper>
    <content-wrapper slot="content"></content-wrapper>
  </layout-wrapper>
</template>

<script>
  import LayoutWrapper from 'components/layout-wrapper/layout-wrapper';
  import ManagerSider from 'components/manager-sider/manager-sider';
  import ManagerDrawer from 'components/manager-drawer/manager-drawer';
  import HeaderWrapper from 'components/header-wrapper/header-wrapper';
  import ContentWrapper from 'components/content-wrapper/content-wrapper';

  export default {
    name: 'Manager',
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
      ManagerSider,
      ManagerDrawer,
      HeaderWrapper,
      ContentWrapper
    }
  };
</script>

<style lang="stylus" scoped>

</style>
