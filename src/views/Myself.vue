<template>
  <div class="home">
    <h1>Add your contact data and let others scan it.</h1>
    <ContactDetail v-model="contactData" />
    <QrGenerator :showReloadButton="false" :value="qrCodeData" />
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
export default class Myself extends Vue {
  get contactData() {
    return this.$store.state.profile;
  }

  set contactData(event: any) {
    this.$store.commit(MutationTypes.CHANGE_PROFILE_DETAIL, {
      key: event.key,
      value: event.value
    });
  }

  get qrCodeData() {
    return JSON.stringify(this.$store.state.profile);
  }
}
</script>

<style lang="scss" scoped></style>
