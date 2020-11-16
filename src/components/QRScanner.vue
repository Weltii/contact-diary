<template>
  <div id="reader">
    <p>{{ this.content }}</p>
    <video id="camera-view"></video>
    <canvas id="can"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import jsQR from "jsqr";

@Component
export default class QRScanner extends Vue {
  private stream: any;
  private vid: any;
  private can: any;
  private canCon: any;
  private content: any = "";
  async mounted() {
    this.can = document.querySelector("#can");
    this.canCon = this.can.getContext("2d");
    this.vid = document.querySelector("#camera-view");
    this.startScan().catch(err => {
      this.content = "No camera can be found!";
      console.log(err);
    });
  }

  private async startScan() {
    return new Promise((resolve, reject) => {
      const func = async () => {
        this.stream = await navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: "environment" }
          })
          .catch(err => {
            reject(err);
          });
        this.vid.srcObject = this.stream;
        this.vid.setAttribute("playsinline", true);
        this.vid.play();
        console.log("fghdhfgdsfghdhfg");
        requestAnimationFrame(this.scan.bind(this));
      };
      func();
    });
  }

  private async scan() {
    if (this.vid.readyState === this.vid.HAVE_ENOUGH_DATA) {
      this.can.height = this.vid.videoHeight;
      this.can.width = this.vid.videoWidth;

      this.canCon.drawImage(this.vid, 0, 0, this.can.width, this.can.height);

      const data = this.canCon.getImageData(
        0,
        0,
        this.can.width,
        this.can.height
      );

      const code = jsQR(data.data, data.width, data.height, {
        inversionAttempts: "dontInvert"
      });
      if (code) {
        this.content = code;
        requestAnimationFrame(this.scan);
      } else {
        requestAnimationFrame(this.scan);
      }
    } else {
      requestAnimationFrame(this.scan);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
