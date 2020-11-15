<template>
  <li class="contact-information">
    <div>
      Start
      <Datetime
        v-model="startDate"
        :value="startDate"
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
      />
    </div>
    <div>
      End
      <Datetime
        v-model="endDate"
        type="datetime"
        format="yyyy-MM-dd HH:mm:ss"
      />
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
    <h3>Contacts</h3>
    <ul>
      <li
        v-for="(contact, index) in contact.contacts"
        :key="index"
        v-on:change="changeContactName"
      >
        <input type="text" :id="index" :value="contact" />
        <button v-if="index !== 0" v-on:click="removeContactName(index)">
          REMOVE
        </button>
      </li>
    </ul>
    <button v-on:click="addContactName()">+ Contact</button>
    <button v-on:click="removeContact">Remove Contact</button>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContactInformation, MutationTypes } from "../store";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { DateTime } from "luxon";

@Component({
  components: {
    Datetime
  }
})
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

  removeContactName(index: number) {
    this.$store.commit(MutationTypes.REMOVE_CONTACT_NAME, {
      contact: this.contact,
      nameIndex: index
    });
  }

  addContactName() {
    this.$store.commit(MutationTypes.ADD_NEW_CONTACT_NAME, {
      contact: this.contact
    });
  }

  get duration() {
    const diff =
      ((this.contact.end ?? new Date().getTime()) - this.contact.start) / 1000;
    const hour = Math.floor(diff / 3600);
    const min = (diff % 3600) / 60;
    const dateString = `${hour < 10 ? "0" + hour : hour}:${
      min < 10 ? "0" + min : min
    }`;
    return dateString;
  }

  getDate(date: number) {
    return DateTime.fromMillis(date).toString();
  }

  setDate(date: string, key: string) {
    if (!date) return;
    this.$store.commit(MutationTypes.CHANGE_FIELD, {
      contact: this.contact,
      key: key,
      value: DateTime.fromISO(date).toMillis()
    });
  }

  get startDate() {
    return this.getDate(this.contact.start);
  }

  set startDate(date) {
    this.setDate(date, "start");
  }

  get endDate() {
    if (!this.contact.end) return "";
    return this.getDate(this.contact.end);
  }

  set endDate(date) {
    this.setDate(date, "end");
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
