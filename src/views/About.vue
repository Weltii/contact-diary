<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QRScanner from "@/components/QRScanner.vue";

@Component({
  components: {
    QRScanner
  }
})
export default class Contacts extends Vue {}
</script>
