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
  @Prop() private value!: string;
  @Prop() private showReloadButton!: boolean;
  private inp = "text";

  constructor() {
    super();
  }

  mounted() {
    this.run();
  }

  @Watch("value")
  run() {
    const data =
      typeof this.value != "string"
        ? JSON.stringify(this.value)
        : this.value ?? "Empty";
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
