<template>
  <div id="reader">
    <p>{{ this.content }}</p>
    <button @click="open" class="icon-button" title="Open qrcode scan dialog">
      <BIconCameraFill />
      <span>Open Scan Dialog</span>
    </button>
    <QrCodeScannerDialog
      v-if="scannerIsVisible"
      @close="close"
      @content-found="contentFoundEvent"
    ></QrCodeScannerDialog>
  </div>
</template>

<script lang="ts">
import { ContactData, MutationTypes } from "@/store";
import { Component, Prop, Vue } from "vue-property-decorator";
import QrCodeScannerDialog from "../components/dialog/QrCodeScannerDialog.vue";
import { BIconCameraFill } from "bootstrap-vue";

@Component({
  components: {
    QrCodeScannerDialog,
    BIconCameraFill
  }
})
export default class ContactScanner extends Vue {
  private scannerIsVisible = false;
  private content = "";

  open() {
    this.scannerIsVisible = true;
  }

  close() {
    this.scannerIsVisible = false;
  }

  private contentFoundEvent(event: any) {
    const data = JSON.parse(event.data);
    if (data && data.name && data.phoneNumber && data.email) {
      const contact = new ContactData(data.name, data.phoneNumber, data.email);
      this.$store.commit(
        MutationTypes.ADD_NEW_CONTACT_TO_CONTACT_LIST,
        contact
      );
      this.content = `${contact.name} is added to your contact list!`;
    } else {
      this.content =
        "The scanned code doesn't include the right content for this usage!";
    }
  }
}
</script>

<style scoped lang="scss">
.icon-button {
  height: 150px;
  width: 150px;
}
</style>
