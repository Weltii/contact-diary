<template>
  <div class="full-screen">
    <h1>Contacts</h1>
    <ContactEntryList />
    <button
      id="add-new-entry-button"
      v-on:click="addNewContact()"
      class="icon-button"
      title="Add new contact entry"
    >
      <BIconJournalPlus />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactEntryList from "@/components/ContactEntryList.vue";
import { MutationTypes, ContactInformation } from "../store";
import { BIconJournalPlus } from "bootstrap-vue";

@Component({
  components: {
    ContactEntryList,
    BIconJournalPlus
  }
})
export default class Entries extends Vue {
  addNewContact() {
    this.$store.commit(MutationTypes.ADD_CONTACT, new ContactInformation());
  }
}
</script>

<style lang="scss" scoped>
.full-screen {
  height: 100%;
}

#add-new-entry-button {
  position: absolute;
  bottom: 50px;
  right: 20px;
  height: 50px;
  width: 50px;
  border: 1px solid gray;
  border-radius: 100%;
  background-color: rgb(220, 54, 100);
}

.icon-button {
  svg {
    fill: white;
  }
}
</style>
