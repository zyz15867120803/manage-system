<template>
  <Drawer
    width="60"
    title="操作菜单"
    placement="left"
    :closable="false"
    :class="themeCls"
    v-model="isDrawerShow"
    @on-close="closeDrawer"
  >
    <slot></slot>
  </Drawer>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: 'DrawerWrapper',
    computed: {
      isDrawerShow() {
        return !this.isCollapsed;
      },
      themeCls() {
        return this.theme;
      },
      ...mapGetters([
        'isCollapsed',
        'theme'
      ])
    },
    methods: {
      closeDrawer() {
        this.setSiderCollapsed(this.isDrawerShow);
      },
      ...mapMutations({
        setSiderCollapsed: 'SET_SIDER_COLLAPSED'
      })
    }
  };
</script>

<style lang="stylus" scoped>

</style>
