<template>
  <div>
    <label for="name">Name</label>
    <input type="text" name="name" v-model="name" placeholder="Name" />
    <label for="phonenumber">Phone Number</label>
    <input
      type="text"
      name="phonenumber"
      v-model="phoneNumber"
      placeholder="Phone-Number"
    />
    <label for="email">E-Mail</label>
    <input type="email" name="email" v-model="email" placeholder="E-Mail" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContactInformation, MutationTypes, ContactData } from "../store";

@Component({
  components: {}
})
export default class ContactDetail extends Vue {
  @Prop() private value!: ContactData;

  mounted() {
    const x = new ContactData();
  }

  private emitChangeContact(key: string, value: string) {
    this.$emit("input", {
      contact: this.value,
      key,
      value
    });
  }

  get name() {
    return this.value.name;
  }

  set name(value: any) {
    this.emitChangeContact("name", value);
  }

  get phoneNumber() {
    return this.value.phoneNumber;
  }

  set phoneNumber(value: any) {
    this.emitChangeContact("phoneNumber", value);
  }

  get email() {
    return this.value.email;
  }

  set email(value: any) {
    this.emitChangeContact("email", value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input,
label {
  text-align: left;
  display: blocK;
}
</style>
