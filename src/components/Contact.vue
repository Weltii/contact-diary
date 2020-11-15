<template>
  <li class="contact-information">
    <h3>Contacts</h3>
    <div>
      Start
      <input type="date" t="start" :value="startDate" />
      <input type="time" t="start" :value="startTime" />
    </div>
    <div>
      End
      <input type="date" t="end" :value="endDate" />
      <input type="time" t="end" :value="endTime" />
    </div>
    <div>
      Duration
      <input type="time" :value="duration" />
    </div>
    <div>
      What did you do?
      <input
        type="text"
        field="activity"
        :value="contact.activity"
        v-on:change="changeFieldName"
      />
    </div>
    <div>
      Where are you?
      <input
        type="text"
        field="location"
        :value="contact.location"
        v-on:change="changeFieldName"
      />
    </div>
    <ul>
      <li
        v-for="(contact, index) in contact.contacts"
        :key="index"
        v-on:change="changeContactName"
      >
        <input type="text" :id="index" :value="contact" />
      </li>
    </ul>
    <button v-on:click="addContactName()">+ Contact</button>
    <button v-on:click="removeContact">Remove Contact</button>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContactInformation, MutationTypes } from "../store";

@Component
export default class Contact extends Vue {
  @Prop() private contact!: ContactInformation;

  changeFieldName(event: any) {
    const value = event.target.value;
    const field = event.target.attributes.field.value;
    this.$store.commit(MutationTypes.CHANGE_FIELD, {
      contact: this.contact,
      key: field,
      value: value
    });
  }

  removeContact() {
    this.$store.commit(MutationTypes.REMOVE_CONTACT, this.contact);
  }

  changeContactName(event: any) {
    const index = event.target.id;
    const name = event.target.value;
    this.$store.commit(MutationTypes.CHANGE_CONTACT_NAME, {
      contact: this.contact,
      nameIndex: index,
      name: name
    });
  }

  addContactName() {
    this.$store.commit(MutationTypes.ADD_NEW_CONTACT_NAME, {
      contact: this.contact
    });
  }

  getDate(date: Date) {
    return "";
  }

  get startDate() {
    return "";
  }

  get endDate() {
    return "";
  }

  getTime(date: Date) {
    return ";";
  }

  get startTime() {
    return "";
  }

  get endTime() {
    return "";
  }

  get duration() {
    return "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

.contact-information {
  border: 1px solid lightgray;
  padding: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
