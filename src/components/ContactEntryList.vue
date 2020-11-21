<template>
  <ul>
    <li v-if="contacts.length == 0">
      No contact found, please a new one!
    </li>
    <ContactEntry
      v-for="(contact, index) in contacts"
      :id="index"
      :key="contact.id"
      :contact="contact"
      :index="index"
    />
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ContactEntry from "@/components/ContactEntry.vue";

@Component({
  components: {
    ContactEntry
  }
})
export default class ContactEntryList extends Vue {
  get contacts() {
    return this.$store.state.entries.concat([]).reverse();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
