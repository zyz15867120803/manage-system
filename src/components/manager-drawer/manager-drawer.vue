<template>
  <drawer-wrapper>
    <drawer-menu :menus="menus"></drawer-menu>
  </drawer-wrapper>
</template>

<script>
  import DrawerWrapper from 'base/drawer-wrapper/drawer-wrapper';
  import DrawerMenu from 'base/drawer-menu/drawer-menu';
  import {managerMenus} from 'common/js/menus';

  export default {
    name: 'ManagerDrawer',
    data() {
      return {
        menus: managerMenus
      };
    },
    components: {
      DrawerWrapper,
      DrawerMenu
    }
  };
</script>

<style lang="stylus" scoped>

</style>
