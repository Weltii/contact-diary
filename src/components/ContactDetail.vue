<template>
  <div>
    <input type="text" v-model="name" placeholder="Name" />
    <input type="text" v-model="phoneNumber" placeholder="Phone-Number" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ContactInformation, MutationTypes, ContactData } from "../store";

@Component({
  components: {}
})
export default class ContactDetail extends Vue {
  @Prop() private contactDetail!: ContactData;

  mounted() {
    const x = new ContactData();
  }

  private emitChangeContact(key: string, value: string) {
    this.$store.commit(MutationTypes.CHANGE_CONTACT_DETAIL, {
      key,
      value
    });
  }

  get name() {
    return this.contactDetail.name;
  }

  set name(value: any) {
    this.emitChangeContact("name", value);
  }

  get phoneNumber() {
    return this.contactDetail.phoneNumber;
  }

  set phoneNumber(value: any) {
    this.emitChangeContact("phoneNumber", value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
