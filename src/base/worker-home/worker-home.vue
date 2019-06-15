<template>
  <div class="worker-home bg-content">
    <div class="video-wrapper">
      <Row>
        <Col :xs="xsCol" :lg="lgCol">
          <div class="video-container">
            <video ref="video" class="video-box"></video>
            <div class="video-mask" v-if="showFlag"></div>
            <canvas ref="canvas" class="canvas-box" v-show="canvasShow"></canvas>
          </div>
          <div class="btn-container">
            <Button v-if="!isEntry" @click="entryFace" type="primary" size="large" shape="circle" long>录入</Button>
            <Button v-if="isEntry" @click="cancelEntry" type="primary" size="large" shape="circle" long>取消</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {faceDetect} from 'api/face-detect';

  export default {
    name: 'WorkerHome',
    data() {
      return {
        xsCol: {
          span: 16,
          offset: 4
        },
        lgCol: {
          span: 8,
          offset: 8
        },
        canvasShow: false,
        showFlag: true,
        isEntry: false,
        mediaStreamTrack: null
      };
    },
    methods: {
      entryFace() {
        this.canvasShow = false;
        let video = this.$refs.video;
        let canvas = this.$refs.canvas;
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        let context = canvas.getContext('2d');
        let videoObj = {
          'video': true
        };
        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
          this.getUserMedia(videoObj, this.success, this.error);
        } else {
          alert('不支持访问用户媒体');
          return;
        }
        setTimeout(() => {
          this.showFlag = false;
          this.isEntry = true;
        }, 500);
        this.timer = setInterval(() => {
          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          let image = new Image();
          image.src = canvas.toDataURL('image/png');
          faceDetect(image).then(res => {
            if (res.faces.length) {
              this.cancelEntry();
              this.canvasShow = true;
            }
          });
        }, 1000);
      },
      cancelEntry() {
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        clearInterval(this.timer);
        this.showFlag = true;
        this.isEntry = false;
      },
      getUserMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
          // 最新的标准API
          navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
          // webkit核心浏览器
          navigator.webkitGetUserMedia(constraints, success, error);
        } else if (navigator.mozGetUserMedia) {
          // firfox浏览器
          navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
          // 旧版API
          navigator.getUserMedia(constraints, success, error);
        }
      },
      success(stream) {
        let video = this.$refs.video;
        // 兼容webkit核心浏览器
        // let CompatibleURL = window.URL || window.webkitURL;
        // video.src = CompatibleURL.createObjectURL(stream);
        // 将视频流设置为video元素的源
        this.mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
        video.srcObject = stream;
        video.play();
      },
      error(error) {
        console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .worker-home
    display: flex
    align-items: center
    width: 100%
    height: 100%
    .video-wrapper
      width: 100%
      .video-container
        width: 100%
        height: 0
        padding-bottom: calc(100% - 16px)
        position: relative
        border: 8px solid #333333
        .video-box
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          object-fit: fill
        .video-mask
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background: darkgray
        .canvas-box
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .btn-container
        margin-top: 30px
        padding: 0 15px
</style>
