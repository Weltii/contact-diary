import Vue from "vue";
import Vuex from "vuex";
import { DateTime } from "luxon";

Vue.use(Vuex);
// DATETIME_FULL
export class ContactInformation {
  constructor(
    public contacts: Array<string> = [""],
    public id: string = ContactInformation.genId(),
    public start: number = ContactInformation.genDate(),
    public end: number | null = null,
    public activity: string = "",
    public location: string = ""
  ) {}

  public static genDate(date: Date = new Date()) {
    return DateTime.local().toMillis();
  }

  public static genId() {
    const randomString = function() {
      return Math.random().toString(16);
    };
    return `${new Date().getTime()}-${randomString()}`;
  }
}

export enum MutationTypes {
  ADD_CONTACT = "ADD_CONTACT",
  ADD_NEW_CONTACT_NAME = "ADD_NEW_CONTACT_NAME",
  CHANGE_CONTACT_NAME = "CHANGE_CONTACT_NAME",
  CHANGE_FIELD = "CHANGE_FIELD",
  INIT_STORE = "INIT_STORE",
  REMOVE_CONTACT = "REMOVE_CONTACT",
  REMOVE_CONTACT_NAME = "REMOVE_CONTACT_NAME"
}

export default new Vuex.Store({
  state: {
    contacts: [new ContactInformation(["Herbert", "von", "Schlechter"])]
  },
  mutations: {
    INIT_STORE(state: any) {
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        const storeState: string = localStorage.getItem("store") ?? "";
        if (storeState) {
          this.replaceState(Object.assign(state, JSON.parse(storeState)));
        }
      }
    },
    ADD_CONTACT(state: any, payload: string) {
      state.contacts.push(payload);
    },
    ADD_NEW_CONTACT_NAME(
      state: any,
      payload: {
        contact: ContactInformation;
      }
    ) {
      const index = state.contacts.indexOf(payload.contact);
      state.contacts[index].contacts.push("");
    },
    REMOVE_CONTACT_NAME(
      state: any,
      payload: {
        contact: ContactInformation;
        nameIndex: number;
      }
    ) {
      const index = state.contacts.indexOf(payload.contact);
      state.contacts[index].contacts.splice(payload.nameIndex, 1);
    },
    CHANGE_CONTACT_NAME(
      state: any,
      payload: {
        contact: ContactInformation;
        nameIndex: number;
        name: string;
      }
    ) {
      const index = state.contacts.indexOf(payload.contact);
      state.contacts[index].contacts[payload.nameIndex] = payload.name;
    },
    CHANGE_FIELD(
      state: any,
      payload: {
        contact: ContactInformation;
        key: string;
        value: string;
      }
    ) {
      const index = state.contacts.indexOf(payload.contact);
      state.contacts[index][payload.key] = payload.value;
    },
    REMOVE_CONTACT(state: any, contact: ContactInformation) {
      const index = state.contacts.indexOf(contact);
      state.contacts.splice(index, 1);
    }
  },
  actions: {},
  modules: {}
});
