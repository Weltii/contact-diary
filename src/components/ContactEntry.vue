<template>
  <li :class="styles">
    <div class="head">
      <button v-on:click="setCollapseState" class="icon-button">
        <BIconChevronDown v-if="collapsed" />
        <BIconChevronUp v-else />
      </button>
      <div>
        <label for="start-date">Start</label>
        <Datetime
          v-model="startDate"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          name="start-date"
          :minute-step="minuteStep"
          title="Start Date"
        />
      </div>
      <div>
        <label for="end-date">End</label>
        <Datetime
          v-model="endDate"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          name="end-date"
          :minute-step="minuteStep"
          title="End Date"
        />
      </div>
      <div>
        <label for="duration">Duration</label>
        <input
          type="text"
          :value="duration"
          id="duration"
          name="duration"
          title="Duration"
          required
          disabled
        />
      </div>

      <button
        class="delete-button icon-button"
        v-on:click="removeContact"
        title="delete contact entry"
      >
        <BIconTrashFill />
      </button>
    </div>

    <div class="body">
      <div class="item">
        <div>
          <span>What did you do?</span>
          <textarea
            type="text"
            placeholder="What did you do?"
            field="activity"
            :value="contact.activity"
            v-on:change="changeFieldName"
            title="What did you do input field"
          />
        </div>
        <div>
          <span>Where are you?</span>
          <input
            type="text"
            field="location"
            placeholder="Where are you?"
            title="Whera are you input field"
            :value="contact.location"
            v-on:change="changeFieldName"
          />
        </div>
      </div>
      <div class="item">
        <label>Contacts</label>
        <ul class="contact-list">
          <li
            v-for="(contact, index) in contact.contacts"
            :key="index"
            v-on:change="changeContactName"
          >
            <input
              type=""
              :id="index"
              :value="contact"
              placeholder="Who did you meet?"
              title="Who did you meet input field"
            />
            <button
              :key="index"
              v-if="index !== 0"
              v-on:click="removeContactName(index)"
              class="icon-button"
              title="Remove contact from contact list"
            >
              <BIconTrashFill />
            </button>
          </li>
        </ul>
        <button
          v-on:click="addContactName()"
          class="icon-button"
          title="Add contact to contact list"
        >
          <BIconPersonPlusFill />
        </button>
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
import {
  BIconChevronUp,
  BIconChevronDown,
  BIconTrashFill,
  BIconPersonPlusFill
} from "bootstrap-vue";

@Component({
  components: {
    Datetime,
    BIconChevronUp,
    BIconChevronDown,
    BIconTrashFill,
    BIconPersonPlusFill
  }
})
export default class ContactEntry extends Vue {
  @Prop() private contact!: ContactInformation;
  @Prop() private collapsed!: boolean;
  private minuteStep = 5;
  private readonly iconPath = "../assets/icons/";

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

  get expandIcon() {
    return `${this.collapsed ? "chevron-down" : "chevron-up"}`;
  }

  get expandAlt() {
    return `${this.collapsed ? "Expand Icon" : "Collapse Icon"}`;
  }

  setCollapseState() {
    this.collapsed = !this.collapsed;
  }

  get duration() {
    const diff = Math.floor(
      ((this.contact.end ?? new Date().getTime()) - this.contact.start) / 1000
    );
    const hour = Math.floor(diff / 3600);
    const min = Math.floor((diff % 3600) / 60);
    const dateString = `${hour < 10 ? "0" + hour : hour}h:${
      min < 10 ? "0" + min : min
    }min`;
    console.log(diff, hour, min, dateString);
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
  textarea label {
    display: block;
    margin: 0 0.2rem;
  }

  #duration {
    width: 70px;
    color: black;
  }
}

.body {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: hidden;
  transition: 1s ease-in-out;
}

.item {
  width: 50%;

  input,
  textarea,
  span {
    margin-bottom: 1px;
    text-align: left;
    width: 150px;
    display: inline-block;
  }

  textarea {
    height: 50px;
  }
}

.collapsed .body {
  height: 0px;
}

.contact-list {
  list-style-type: none;
  padding: 0;
  li {
    display: flex;
    float: left;
    clear: both;
    align-items: middle;
    margin-bottom: 10px;
    input {
      width: 150px;
    }
    button {
      height: 25px;
    }
  }
}

.icon-button {
  svg {
    height: 1rem;
    width: 1rem;
  }
}
</style>
