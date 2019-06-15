<template>
  <Menu
    ref="siderMenu"
    :active-name="activeName"
    :open-names="openNames"
    width="auto"
    :theme="theme"
    @on-select="selectMenuItem"
    @on-open-change="openNamesChange"
  >
    <template v-for="(menu, menuIndex) in menus">
      <MenuItem :name="menu.name" v-if="!menu.children" :key="menuIndex">
        <Icon :type="menu.icon" :size="20"></Icon>
        <span>{{menu.title}}</span>
      </MenuItem>
      <Submenu :name="menu.name" v-if="menu.children" :key="menuIndex">
        <template slot="title">
          <Icon :type="menu.icon" :size="20"></Icon>
          <span>{{menu.title}}</span>
        </template>
        <MenuItem :name="child.name" v-for="(child, childIndex) in menu.children" :key="childIndex">
          <Icon :type="child.icon" :size="20"></Icon>
          <span>{{child.title}}</span>
        </MenuItem>
      </Submenu>
    </template>
  </Menu>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Tag from 'common/js/tag';

  export default {
    name: 'DrawerMenu',
    props: {
      menus: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      ...mapGetters([
        'isCollapsed',
        'activeMenuName',
        'tags',
        'theme'
      ])
    },
    data() {
      return {
        activeName: 'home',
        openNames: []
      };
    },
    methods: {
      openNamesChange(openNames) {
        this.openNames = openNames;
      },
      selectMenuItem(name) {
        let isInTags = false;
        let href = null;
        this.setActiveMenuName(name);
        this.tags.forEach(tag => {
          if (tag.name === name) {
            isInTags = true;
            href = tag.href;
          }
        });
        if (!isInTags) {
          this.menus.forEach(menu => {
            if (menu.name === name) {
              href = menu.href;
              this.addTag(new Tag(menu));
            } else if (menu.children) {
              menu.children.forEach(child => {
                if (child.name === name) {
                  href = child.href;
                  this.addTag(new Tag(child));
                }
              });
            }
          });
        }
        this.$router.push(href);
      },
      ...mapMutations({
        setActiveMenuName: 'SET_ACTIVE_MENUNAME'
      }),
      ...mapActions([
        'addTag'
      ])
    },
    watch: {
      activeMenuName(newActiveName) {
        this.activeName = newActiveName;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .ivu-menu-item
    white-space: nowrap
  .ivu-menu-submenu
    white-space: nowrap
    .ivu-menu-submenu-title
      white-space: nowrap
  .ivu-menu
    height: 100%
    overflow-y: auto
  .menu-item
    i
      transform: translateX(0px)
      transition: font-size .2s ease, transform .2s ease
      vertical-align: middle
      font-size: 16px
    span
      display: inline-block
      width: 69px
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden
      vertical-align: bottom
      transition: width .2s ease .2s
</style>
