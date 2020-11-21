<template>
  <button @click="emitClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class CreateBottomRightButton extends Vue {
  emitClick(event: any) {
    this.$emit("click", event);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  position: fixed;
  bottom: 50px;
  right: 20px;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  background-color: rgb(220, 54, 100);
  box-shadow: 3px 3px 8px 4px rgb(29, 29, 29);
}
</style>
