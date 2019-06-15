<template>
  <Header class="layout-header-bar">
    <div class="header-wrapper" :class="themeCls">
      <div class="header-left">
        <Icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="28"></Icon>
        <span class="header-title">无感刷脸管理系统</span>
      </div>
      <div class="header-right">
        <Button type="text" icon="md-exit" class="btn-quit" size="large" @click="quit">退出系统</Button>
      </div>
    </div>
  </Header>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import CookieUtil from 'common/js/util';
  import {logout} from 'api/logout';

  export default {
    name: 'HeaderWrapper',
    computed: {
      rotateIcon() {
        return [
          'menu-icon',
          this.isCollapsed ? 'rotate-icon' : ''
        ];
      },
      themeCls() {
        return this.theme;
      },
      ...mapGetters([
        'isCollapsed',
        'theme'
      ])
    },
    data() {
      return {
      };
    },
    methods: {
      collapsedSider() {
        this.setSiderCollapsed(!this.isCollapsed);
      },
      quit() {
        logout().then(res => {
          if (res.stat === 'true') {
            CookieUtil.unset('token');
            this.clearTag();
            this.resetSystemTheme();
            this.$router.push({
              name: 'login'
            });
          } else if (res.stat === 'false') {
            this.$Message.error({
              content: '发生错误，登出失败',
              duration: 2
            });
          }
        });
      },
      ...mapMutations({
        setSiderCollapsed: 'SET_SIDER_COLLAPSED',
      }),
      ...mapActions([
        'clearTag',
        'resetSystemTheme'
      ])
    }
  };
</script>

<style lang="stylus" scoped>
  .ivu-layout-header
    height: 60px
    line-height: 60px
  .layout-header-bar
    position: relative
    display: flex
    flex-direction: column
    width: 100%
    padding: 0
    z-index: 20
    background: #fff
    .header-wrapper
      display: flex
      align-items: center
      justify-content: space-between
      position: relative
      z-index: 1
      box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1)
      color: #fff
      &.light
        background: #0e64c3
      &.dark
        background: #515a6e
      .header-left
        display: flex
        align-items: center
        .menu-icon
          cursor: pointer
          transition: all .3s
          margin: 0 20px 0
          &.rotate-icon
            transform: rotate(-90deg)
        .header-title
          font-size: 18px
          font-weight: bold
      .header-right
        margin-right: 20px
        .btn-quit
          color: #fff
          font-size: 17px
</style>
