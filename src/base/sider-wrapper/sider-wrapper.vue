<template>
  <Sider breakpoint="md" collapsible width="230px" hide-trigger :collapsed-width="78" v-model.trim="isCollapsed">
    <div class="logo" :class="themeCls">
      <div v-if="!isCollapsed" class="logo-not-collapsed">
        <Badge dot :count="count" @click.native="open">
          <Avatar icon="ios-person" size="large" />
        </Badge>
        <span class="user-name">{{name}}</span>
      </div>
      <Badge dot :count="count" @click.native="open" v-else>
        <Avatar icon="ios-person" size="large" />
      </Badge>
    </div>
    <slot></slot>
  </Sider>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'SiderWrapper',
    computed: {
      name() {
        return this.user.name || '管理员';
      },
      count() {
        return this.user.message ? 1 : 0;
      },
      themeCls() {
        return this.theme;
      },
      ...mapGetters([
        'isCollapsed',
        'user',
        'theme'
      ])
    },
    methods: {
      open() {
        this.$Notice.info({
          title: '系统通知',
          desc: this.user.message ? this.user.message : '暂无通知'
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .ivu-layout-sider
    background: #fff
    transition: none
  .logo
    width: auto;
    height: 60px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    padding-left: 15px
    &.light
      background: #0e64c3
      border-bottom: 1px solid #363e4f;
    &.dark
      background: #515a6e
      border-bottom: 1px solid #e2e2e2;
    .logo-not-collapsed
      display: flex
      align-items: center
      .user-name
        color: #fff
        font-size: 16px
        margin-left: 15px
</style>
