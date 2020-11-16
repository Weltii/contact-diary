<template>
  <main>
    <canvas id="qr-generator"></canvas>
    <button v-if="showReloadButton | false" v-on:click="run">Reload</button>
  </main>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { computed, ref } from "@vue/composition-api";
import QRCode from "qrcode";

@Component
export default class QrGenerator extends Vue {
  @Prop() private qrCodeData!: string;
  @Prop() private showReloadButton!: boolean;
  private can: HTMLCanvasElement;

  constructor() {
    super();
    this.can = document.querySelector("#qr-generator") as HTMLCanvasElement;
  }

  mounted() {
    this.run();
  }

  @Watch("qrCodeData")
  run() {
    console.log("watch");
    const data =
      typeof this.qrCodeData != "string"
        ? JSON.stringify(this.qrCodeData)
        : this.qrCodeData ?? "Empty";
    console.log(data);
    QRCode.toCanvas(
      document.querySelector("#qr-generator"),
      data,
      (err: any) => {
        if (err) console.log(err);
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
