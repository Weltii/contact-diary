<template>
  <BaseDialog title="QrCode Scanner" @close="close">
    <div slot="body" id="reader">
      <div v-if="!canUseCamera">
        No Camera can be found! Maybe you use a device without a camera, or you
        dismiss the permissions.
      </div>
      <div v-else>
        <video id="camera-view"></video>
        <canvas id="can"></canvas>
      </div>
    </div>
    <div slot="footer">
      <p>Nothing^^</p>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import jsQR from "jsqr";
import BaseDialog from "./BaseDialog.vue";

@Component({
  components: {
    BaseDialog
  }
})
export default class QrCodeScannerDialog extends Vue {
  // eslint-disable-next-line no-use-before-define
  private stream: MediaStream | void | null = null; // eslint-disable-line no-use-before-define
  private vid: HTMLVideoElement | null = null;
  private can: any;
  private canCon: any;
  private canUseCamera = true;

  close() {
    this.stopStream();
    this.$emit("close");
  }

  emitContent(data: object | string) {
    this.stopStream();
    this.$emit("content-found", data);
    this.close();
  }

  async mounted() {
    this.can = document.querySelector("#can");
    this.canCon = this.can.getContext("2d");
    this.vid = document.querySelector("#camera-view");
    this.startScan().catch(err => {
      this.canUseCamera = false;
      console.log(err);
    });
  }

  private stopStream() {
    (this.vid as HTMLVideoElement)?.pause();
    (this.stream as MediaStream)?.getTracks().forEach(track => {
      track.stop();
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
        const vid = this.vid as HTMLVideoElement;
        vid.srcObject = this.stream as MediaStream;
        vid.setAttribute("playsinline", "true");
        vid.play();
        requestAnimationFrame(this.scan.bind(this));
      };
      func();
    });
  }

  private async scan() {
    const vid = this.vid as HTMLVideoElement;
    if (vid.readyState === vid.HAVE_ENOUGH_DATA) {
      this.can.height = vid.videoHeight;
      this.can.width = vid.videoWidth;

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
        console.log(code);
        this.stopStream();
        this.emitContent(code);
        // requestAnimationFrame(this.scan);
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
<style scoped lang="scss">
#reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

video {
  width: 100%;
  height: 400px;
}

canvas {
  position: absolute;
  display: none;
}
</style>
