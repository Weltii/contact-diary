<template>
  <div class="home">
    <h1>Add your contact data and let others scan it.</h1>
    <ContactDetail :contactDetail="contactData" />
    <!-- TODO the code should regenerate on changes automatically! -->
    <QrGenerator :showReloadButton="true" :qrCodeData="contactData" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QrGenerator from "../components/QrGenerator.vue";
import ContactDetail from "../components/ContactDetail.vue";
import { MutationTypes } from "@/store";

@Component({
  components: {
    QrGenerator,
    ContactDetail
  }
})
export default class Home extends Vue {
  get contactData() {
    return this.$store.state.myContact;
  }
}
</script>

<style lang="scss" scoped></style>
