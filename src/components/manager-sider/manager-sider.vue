<template>
  <sider-wrapper>
    <sider-menu :menus="menus"></sider-menu>
  </sider-wrapper>
</template>

<script>
  import SiderWrapper from 'base/sider-wrapper/sider-wrapper';
  import SiderMenu from 'base/sider-menu/sider-menu';
  import {managerMenus} from 'common/js/menus';

  export default {
    name: 'ManagerSider',
    data() {
      return {
        menus: managerMenus
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
