<template>
  <div class="face-attence">
    <div class="video-wrapper">
      <video ref="video" class="video-box"></video>
      <canvas ref="canvas" class="canvas-box" v-show="false"></canvas>
    </div>
    <div class="tips-wrapper">
      <p class="tips">{{tip}}</p>
    </div>
  </div>
</template>

<script>
  import {faceDetect} from 'api/face-detect';

  export default {
    name: 'FaceAttence',
    mounted() {
      this._enterFace();
    },
    data() {
      return {
        tip: ''
      };
    },
    methods: {
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
      },
      _enterFace() {
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
        setInterval(() => {
          context.drawImage(video, 0, 0, video.clientWidth, video.clientHeight);
          let image = new Image();
          image.src = canvas.toDataURL('image/png');
          faceDetect(image).then(res => {
            if (res.faces.length) {
            }
          });
        }, 1000);
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .face-attence
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: hidden
    background: #333
    .video-wrapper
      position: relative
      width: 100%
      height: 0
      padding-bottom: 100%
      .video-box
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        border: 12px solid #999
        background: #eee
        object-fit: fill
      .canvas-box
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        border: 12px solid #999
        background: #eee
    .tips-wrapper
      display: flex
      justify-content: center
      align-items: center
      position: absolute
      top: 60%
      leth: 0
      bottom: 0
      width: 100%
      padding: 0 20px
      .tips
        font-size: 20px
        color: rgba(255, 255, 255, 0.8)
        word-wrap: break-word
        word-break: normal
</style>
