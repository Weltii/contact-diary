<template>
  <div>
    <h1>Known Contacts</h1>
    <h2>New Contact</h2>
    <ContactDetail v-model="newContact" />
    <button @click="addNewContact">Add</button>

    <ul>
      <li v-for="contact in contacts" :key="contact.id">
        <p>{{ contact.name }}</p>
      </li>
      <li v-if="contacts.length === 0">
        Nobody is in here!
      </li>
    </ul>
    <CreateBottomRightButton class="icon-button" title="Add new contact entry">
      <BIconPersonPlusFill />
    </CreateBottomRightButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QrGenerator from "../components/QrGenerator.vue";
import ContactDetail from "../components/ContactDetail.vue";
import { BIconPersonPlusFill } from "bootstrap-vue";
import CreateBottomRightButton from "../components/CreateBottomRightButton.vue";
import { ContactData, MutationTypes } from "@/store";

@Component({
  components: {
    ContactDetail,
    BIconPersonPlusFill,
    CreateBottomRightButton
  }
})
export default class Myself extends Vue {
  private _newContact = new ContactData();

  get newContact() {
    if (!this._newContact) {
      this._newContact = new ContactData();
    }
    return this._newContact;
  }

  set newContact(event: any) {
    switch (event.key) {
      case "name":
        this._newContact.name = event.value;
        break;
      case "phoneNumber":
        this._newContact.phoneNumber = event.value;
        break;
      case "email":
        this._newContact.email = event.value;
        break;
    }
  }

  addNewContact() {
    this.$store.commit(
      MutationTypes.ADD_NEW_CONTACT_TO_CONTACT_LIST,
      this._newContact
    );
    this._newContact = new ContactData();
  }

  get contacts() {
    return (this.$store.state.contacts as Array<any>).concat([]);
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

ul {
  list-style: none;
}
</style>
