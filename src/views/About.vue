<template>
  <div class="about">
    <h1>This is an about page</h1>

    <h2>Used Community-Components</h2>
    <ul>
      <li>
        <a href="https://www.npmjs.com/package/vue-datetime">vue-datetime</a>
      </li>
    </ul>
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
