<template>
  <div class="content-tag">
    <div class="tags-nav">
      <div class="btn-con left-btn">
        <Button type="text" @click="handleScroll(240)">
          <Icon :size="18" type="ios-arrow-back" />
        </Button>
      </div>
      <div ref="scrollOuter" class="scroll-outer" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
        <div ref="scrollBody" class="scroll-body" :style="leftStyle">
          <Tag
            type="dot"
            :name="tag.name"
            :closable="tag.closable"
            :color="tag.name === activeMenuName ? 'primary' : '#e9eaec'"
            @click.native="clickTag(tag)"
            @on-close="closeTag"
            v-for="tag in tags"
            :key="tag.name"
          >
            {{tag.title}}
          </Tag>
        </div>
      </div>
      <div class="btn-con right-btn">
        <Button type="text" @click="handleScroll(-240)">
          <Icon :size="18" type="ios-arrow-forward" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    name: 'ContentTag',
    computed: {
      ...mapGetters([
        'activeMenuName',
        'tags'
      ])
    },
    data() {
      return {
        leftStyle: {
          left: 0
        }
      };
    },
    methods: {
      clickTag(tag) {
        this.setActiveMenuName(tag.name);
        this.$router.push(tag.href);
      },
      closeTag(event, name) {
        this.deleteTag(name);
        // 如果关闭的是当下打开的标签，就跳转到最后一个标签
        if (this.activeMenuName === name) {
          let lastTag = this.tags[this.tags.length - 1];
          this.setActiveMenuName(lastTag.name);
          this.$router.push(lastTag.href);
        }
      },
      handlescroll(event) {
        let type = event.type;
        let delta = 0;
        if (type === 'DOMMouseScroll' || type === 'mousewheel') {
          delta = (event.wheelDelta) ? event.wheelDelta : -(event.detail || 0) * 40;
        }
        this.handleScroll(delta);
      },
      handleScroll(offset) {
        const outerWidth = this.$refs.scrollOuter.offsetWidth;
        const bodyWidth = this.$refs.scrollBody.offsetWidth;
        if (offset > 0) {
          this.leftStyle.left = Math.min(0, parseInt(this.leftStyle.left) + offset) + 'px';
        } else {
          if (bodyWidth > outerWidth) {
            this.leftStyle.left = Math.max(parseInt(this.leftStyle.left) + offset, outerWidth - bodyWidth) + 'px';
          } else {
            this.leftStyle.left = 0;
          }
        }
      },
      ...mapMutations({
        setActiveMenuName: 'SET_ACTIVE_MENUNAME'
      }),
      ...mapActions([
        'deleteTag'
      ])
    }
  };
</script>

<style lang="stylus" scoped>
  .content-tag
    height: 49.5px
    padding: 0
    background: #f0f0f0
    .tags-nav
      width: 100%
      height: 100%
      position: relative
      border-top: 1px solid #f0f0f0
      border-bottom: 1px solid #f0f0f0
      .btn-con
        position: absolute
        top: 0
        height: calc(100% - 6px)
        margin: 3px 0
        display: flex
        align-items: center
        background: #fff
        z-index: 10
      .left-btn
        left: 0
        border-right: 1px solid #f0f0f0
      .right-btn
        right: 0
        border-left: 1px solid #f0f0f0
      .ivu-btn
        padding: 6px 4px
      .scroll-outer
        position: absolute
        top: 0
        bottom: 0
        left: 29px
        right: 29px
        box-shadow: 0 0 3px 2px rgba(100, 100, 100, .1) inset
        .scroll-body
          display: inline-flex
          align-items: center
          height: calc(100% - 2px)
          padding: 1px 4px
          position: absolute
          vertical-align: middle
          overflow: visible
          white-space: nowrap
          transition: left .3s ease
          .ivu-tag-dot
            height: 36px
            line-height: 36px
</style>
