<template>
  <div>
    <h1>Contacts</h1>
    <button v-on:click="addNewContact()">Add new Contact</button>
    <ContactEntryList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactEntryList from "@/components/ContactEntryList.vue";
import { MutationTypes, ContactInformation } from "../store";

@Component({
  components: {
    ContactEntryList
  }
})
export default class Entries extends Vue {
  addNewContact() {
    this.$store.commit(MutationTypes.ADD_CONTACT, new ContactInformation());
  }
}
</script>
