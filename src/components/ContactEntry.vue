<template>
  <li :class="styles">
    <div class="head">
      <button v-on:click="setCollapseState">{{ expandText }}</button>
      <div>
        <label for="start-date">Start</label>
        <Datetime
          v-model="startDate"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          name="start-date"
        />
      </div>
      <div>
        <label for="end-date">End</label>
        <Datetime
          v-model="endDate"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          name="end-date"
        />
      </div>
      <div>
        <label for="duration">Duration</label>
        <input
          type="time"
          :value="duration"
          name="duration"
          required
          disabled
        />
      </div>

      <button class="delete-button" v-on:click="removeContact">
        Remove Contact
      </button>
    </div>

    <div class="body">
      <div>
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
      </div>
      <div>
        <h3>Contacts</h3>
        <ul class="contact-list">
          <li
            v-for="(contact, index) in contact.contacts"
            :key="index"
            v-on:change="changeContactName"
          >
            <input type="" :id="index" :value="contact" />
            <button v-if="index !== 0" v-on:click="removeContactName(index)">
              REMOVE
            </button>
          </li>
        </ul>
        <button v-on:click="addContactName()">+ Contact</button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { MutationTypes, ContactInformation } from "../store";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { DateTime } from "luxon";

@Component({
  components: {
    Datetime
  }
})
export default class ContactEntry extends Vue {
  @Prop() private contact!: ContactInformation;
  @Prop() private collapsed!: boolean;

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

  get styles() {
    return `contact-information ${this.collapsed ? "collapsed" : ""}`;
  }

  get expandText() {
    return `${this.collapsed ? "Expand" : "Collapse"}`;
  }

  setCollapseState() {
    this.collapsed = !this.collapsed;
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
.contact-information {
  margin: 1rem 0;
}

.head {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  background-color: rgb(220, 54, 100);
  padding: 0.2rem;
  margin-bottom: 0.5rem;
  div,
  input,
  label {
    display: block;
    margin: 0 0.2rem;
  }
}

.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  transition: 1s ease-in-out;
}

.collapsed .body {
  height: 0px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
</style>
