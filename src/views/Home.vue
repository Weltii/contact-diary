<template>
  <div class="home">
    <h1>Outlawraspberry Contact Diary</h1>
    <h2>Track your social contacts</h2>
    <img alt="Outlawraspberry Logo" src="../assets/outlawraspberry-logo.png" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
img {
  width: 80%;
  max-width: 300px;
}
</style>
