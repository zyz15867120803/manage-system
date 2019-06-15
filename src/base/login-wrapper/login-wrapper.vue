<template>
  <div class="login-wrapper">
    <div class="bg-wrapper">
      <Row class="card-wrapper">
        <Col :xs="xsCol" :lg="lgCol">
          <Card>
            <p slot="title" class="title">
              <Icon type="logo-snapchat" />
              Welcome
            </p>
            <slot></slot>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoginRegister',
    data() {
      return {
        xsCol: {
          span: 18,
          offset: 3
        },
        lgCol: {
          span: 6,
          offset: 9
        }
      };
    }
  };
</script>

<style lang="stylus" scoped>
  .login-wrapper
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: calc(100%)
    .bg-wrapper
      display: flex
      justify-content: center
      align-items: center
      width: 100%
      height: 100%
      background: url('../../common/image/bg-image.jpg') no-repeat right bottom
      background-size: cover
      .card-wrapper
        flex: 1
        .title
          font-size: 18px
</style>
