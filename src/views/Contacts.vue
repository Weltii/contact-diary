<template>
  <div>
    <h1>Known Contacts</h1>

    <ul>
      <li v-for="contact in contacts" :key="contact.id">
        <ContactEntry :contact="contact"></ContactEntry>
        <button
          class="icon-button"
          @click="openDeleteContactDialog(contact)"
          :title="getTitleForDeleteButton(contact.name)"
        >
          <BIconTrashFill />
        </button>
      </li>
      <li v-if="contacts.length === 0">
        Nobody is in here!
      </li>
    </ul>

    <CreateBottomRightButton
      class="icon-button"
      title="Add new contact entry"
      @click="openNewContactDialog"
    >
      <BIconPersonPlusFill />
    </CreateBottomRightButton>

    <BaseModal
      v-show="isDialogVisible"
      @close="closeDialog"
      title="Delete Contact"
    >
      <div slot="body">
        Du you really want to delete {{ chosenContact.name || "Nobody" }}?
      </div>
      <div slot="footer">
        <button @click="closeDialog">
          No!
        </button>
        <button @click="deleteContact(chosenContact)">
          Yes!
        </button>
      </div>
    </BaseModal>
    <BaseModal
      v-show="isCreateContactDialogVisible"
      @close="closeNewContactDialog"
      title="Create Contact"
    >
      <div slot="body">
        <ContactDetail v-model="newContact" />
      </div>
      <div slot="footer">
        <button @click="addNewContact">
          Add this contact
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QrGenerator from "../components/QrGenerator.vue";
import ContactDetail from "../components/ContactDetail.vue";
import { BIconPersonPlusFill, BIconTrashFill } from "bootstrap-vue";
import CreateBottomRightButton from "../components/CreateBottomRightButton.vue";
import { ContactData, MutationTypes } from "@/store";
import BaseModal from "../components/dialog/BaseDialog.vue";
import ContactEntry from "../components/contact-list/ContactEntry.vue";

@Component({
  components: {
    ContactDetail,
    BIconPersonPlusFill,
    BIconTrashFill,
    CreateBottomRightButton,
    BaseModal,
    ContactEntry
  }
})
export default class Contacts extends Vue {
  private _newContact = new ContactData();
  private isCreateContactDialogVisible = false;
  private isDialogVisible = false;
  private chosenContact = new ContactData();

  showDialog() {
    this.isDialogVisible = true;
  }

  closeDialog() {
    this.isDialogVisible = false;
  }

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

  deleteContact(contact: ContactData) {
    this.$store.commit(
      MutationTypes.REMOVE_CONTACT_FROM_CONTACT_LIST,
      contact.id
    );
    this.closeDialog();
  }

  addNewContact() {
    this.$store.commit(
      MutationTypes.ADD_NEW_CONTACT_TO_CONTACT_LIST,
      this._newContact
    );
    this._newContact = new ContactData();
    this.closeNewContactDialog();
  }

  get contacts() {
    return (this.$store.state.contacts as Array<any>).concat([]);
  }

  openDeleteContactDialog(contact: ContactData) {
    this.chosenContact = contact;
    this.showDialog();
  }

  openNewContactDialog() {
    this.isCreateContactDialogVisible = true;
  }

  closeNewContactDialog() {
    this.isCreateContactDialogVisible = false;
  }

  getTitleForDeleteButton(contactName: string) {
    return `delete ${contactName}`;
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
  margin: 0;
  padding: 0;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    margin: 0.2rem;
  }
}
</style>
