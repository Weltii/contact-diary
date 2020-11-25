<template>
  <div class="contact-name-container">
    <span class="name">{{ contact.name }}</span>
    <span class="small">{{ contact.phoneNumber }}</span>
    <span class="small">{{ contact.email }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContactData } from "@/store";

@Component
export default class ContactEntry extends Vue {
  @Prop() private contact!: ContactData;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contact-name-container {
  padding: 0.5rem;
  text-align: left;

  .small {
    display: block;
    font-size: 10px;
  }
}
</style>
