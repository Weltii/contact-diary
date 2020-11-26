<template>
  <dir class="backdrop">
    <div class="modal">
      <button class="top-right-close-button icon-button" @click="close">
        <BIconXSquareFill />
      </button>
      <header>
        <h1>{{ title }}</h1>
      </header>
      <section>
        <slot name="body">I'm the default body!</slot>
      </section>
      <footer>
        <slot name="footer">I'm the default footer!</slot>
      </footer>
    </div>
  </dir>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { BIconXSquareFill } from "bootstrap-vue";

@Component({
  components: {
    BIconXSquareFill
  }
})
export default class Myself extends Vue {
  @Prop() private title!: string;

  close() {
    this.$emit("close");
  }
}
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000060;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.modal {
  background: lightgray;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  height: fit-content;
  position: relative;
  border-radius: 4px;
}

.top-right-close-button {
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  font-size: 20px;
  width: 40px;
  border: none;
  cursor: pointer;
}

header,
footer {
  padding: 15px;
  display: flex;
}

header {
  border-bottom: 1px solid #eee;
  justify-content: center;
  text-align: center;
  margin: 0;
  h1 {
    margin: 0;
  }
}

footer {
  border-top: 1px solid #eee;
  justify-items: flex-end;
}

section {
  position: relative;
  padding: 20px 10px;
}
</style>
