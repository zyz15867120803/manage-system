<template>
  <sider-wrapper>
    <sider-menu :menus="menus"></sider-menu>
  </sider-wrapper>
</template>

<script>
  import SiderWrapper from 'base/sider-wrapper/sider-wrapper';
  import SiderMenu from 'base/sider-menu/sider-menu';
  import {workerMenus} from 'common/js/menus';

  export default {
    name: 'Workersider',
    data() {
      return {
        menus: workerMenus
      };
    },
    components: {
      SiderWrapper,
      SiderMenu
    }
  };
</script>

<style lang="stylus" scoped>

</style>
