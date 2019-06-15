<template>
  <div class="menu-wrapper">
    <Menu
      ref="siderMenu"
      :active-name="activeName"
      :open-names="openNames"
      width="auto"
      :theme="theme"
      @on-select="selectMenuItem"
      @on-open-change="openNamesChange"
      v-if="!isCollapsed"
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
    <div class="dropdown-wrapper" :class="themeCls" v-if="isCollapsed">
      <div class="dropdown-container">
        <template v-for="(menu, menuIndex) in menus">
          <Dropdown transfer v-if="!menu.children" @on-click="dropdownClick" placement="right-start" :key="menuIndex">
            <Button type="text" class="dropdown-btn">
              <Icon :type="menu.icon" :size="25"></Icon>
            </Button>
            <DropdownMenu slot="list" class="dropdown-menu" :class="themeCls">
              <DropdownItem :name="menu.name">
                <div class="dropdownItem-wrapper">
                  <Icon :type="menu.icon" :size="16"></Icon>
                  <span class="dropdownItem-text">{{menu.title}}</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown transfer v-if="menu.children" @on-click="dropdownClick" placement="right-start" :key="menuIndex">
            <Button class="dropdown-btn" type="text">
              <Icon :size="25" :type="menu.icon"></Icon>
            </Button>
            <DropdownMenu slot="list" class="dropdown-menu" :class="themeCls">
              <template v-for="(child, childIndex) in menu.children">
                <DropdownItem :name="child.name" :key="childIndex">
                  <div class="dropdownItem-wrapper">
                    <Icon :size="16" :type="child.icon"></Icon>
                    <span class="dropdownItem-text">
                      {{ child.title }}
                    </span>
                  </div>
                </DropdownItem>
              </template>
            </DropdownMenu>
          </Dropdown>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import Tag from 'common/js/tag';

  export default {
    name: 'SiderMenu',
    props: {
      menus: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      themeCls() {
        return this.theme;
      },
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
    created() {
      this.selectMenuItem('home');
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
      dropdownClick(name) {
        this.selectMenuItem(name);
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
  .menu-wrapper
    height: calc(100% - 60px)
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
    .dropdown-wrapper
      height: 100%
      position: relative
      display: flex
      flex-direction: column
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
      z-index: 11
      &.light
        background: #fff
      &.dark
        background: #515a6e
        .dropdown-btn
          color: rgba(255, 255, 255, 0.8)
      .dropdown-container
        height: 100%
        .dropdown-btn
          width: 83px
          margin-left: -5px
          padding: 10px 0
  .dropdown-menu
    width: 200px
    min-width: 200px
    height: 100%
    &.light
      .ivu-dropdown-item:hover
        background-color: #57a3f3
        color: #fff
    &.dark
      .ivu-dropdown-item
        background: #515a6e
        color: rgba(255,255,255,.7)
      .ivu-dropdown-item:hover
        background-color: #2d8cf0
        color: #fff
    .dropdownItem-wrapper
      display: flex
      align-items: center
      .dropdownItem-text
        padding-left: 10px
</style>
