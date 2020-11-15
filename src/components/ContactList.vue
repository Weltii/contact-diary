<template>
  <ul>
    <li v-if="contacts.length == 0">
      No contact found, please a new one!
    </li>
    <Contact v-for="contact in contacts" :key="contact.id" :contact="contact" />
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Contact from "@/components/Contact.vue";

@Component({
  components: {
    Contact
  }
})
export default class ContactList extends Vue {
  get contacts() {
    return this.$store.state.contacts.concat([]).reverse();
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
a {
  color: #42b983;
}
</style>
