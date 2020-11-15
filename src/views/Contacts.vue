<template>
  <div>
    <h1>Contacts</h1>
    <button v-on:click="addNewContact()">Add new Contact</button>
    <ContactList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactList from "@/components/ContactList.vue";
import { MutationTypes, ContactInformation } from "../store";

@Component({
  components: {
    ContactList
  }
})
export default class Contacts extends Vue {
  addNewContact() {
    this.$store.commit(MutationTypes.ADD_CONTACT, new ContactInformation());
  }
}
</script>
