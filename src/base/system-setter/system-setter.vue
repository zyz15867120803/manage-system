<template>
  <div class="system-setter bg-content">
    <div class="header-title">
      <div class="title-content">
        <div class="title-icon">
          <Icon type="ios-cog" :size="14"></Icon>
        </div>
        <p class="title">系统设置</p>
      </div>
    </div>
    <div class="setter-wrapper">
      <div class="setter-content">
        <Row class="setter-row">
          <Col span="10" offset="4">
            <P class="setter-option">系统界面样式:</P>
          </Col>
          <Col span="6">
            <RadioGroup v-model="systemTheme" type="button">
              <Radio label="light" class="radio">
                <Icon type="ios-sunny" :size="14" />
                <span class="radio-text">light</span>
              </Radio>
              <Radio label="dark" class="radio">
                <Icon type="ios-moon" :size="14" />
                <span class="radio-text">dark</span>
              </Radio>
            </RadioGroup>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'SystemSetter',
    created() {
      this.systemTheme = this.theme;
    },
    computed: {
      ...mapGetters([
        'theme'
      ])
    },
    data() {
      return {
        systemTheme: ''
      };
    },
    methods: {
      ...mapActions([
        'setSystemTheme'
      ])
    },
    watch: {
      systemTheme(newTheme) {
        this.setSystemTheme(newTheme);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .system-setter
    min-height: 100%
    .header-title
      display: flex
      justify-content: space-between
      align-items: center
      padding: 10px 15px
      border-bottom: 1px solid #dddee1
      .title-content
        display: flex
        align-items: center
        .title-icon
          display: flex
          align-items: center
          margin-right: 5px
        .title
          font-size: 14px
          font-weight: bold
    .setter-wrapper
      width: 100%
      padding: 15px
      .setter-content
        width: 100%
        padding: 10px
        border: 1px solid rgba(0, 0, 0, 0.4)
        .setter-row
          display: flex
          align-items: center
          font-size: 14px
          font-weight: bold
          .setter-option
            line-height: 24px
          .radio
            display: inline-flex
            align-items: center
            .radio-text
              font-size: 13px
</style>
