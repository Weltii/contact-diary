<template>
  <div>
    <h1>Contacts</h1>
    <ContactEntryList />
    <CreateBottomRightButton
      class="icon-button"
      title="Add new contact entry"
      @click="addNewContact()"
    >
      <BIconJournalPlus />
    </CreateBottomRightButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactEntryList from "@/components/ContactEntryList.vue";
import { MutationTypes, ContactInformation } from "../store";
import { BIconJournalPlus } from "bootstrap-vue";
import CreateBottomRightButton from "../components/CreateBottomRightButton.vue";

@Component({
  components: {
    ContactEntryList,
    BIconJournalPlus,
    CreateBottomRightButton
  }
})
export default class Entries extends Vue {
  addNewContact() {
    this.$store.commit(MutationTypes.ADD_CONTACT, new ContactInformation());
  }
}
</script>
