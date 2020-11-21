import Vue from "vue";
import Vuex from "vuex";
import { DateTime } from "luxon";
import { Contact } from "@/model/Contact";
import { genId } from "../model/Utils";

Vue.use(Vuex);

export class ContactInformation {
  constructor(
    public contacts: Array<string> = [""],
    public id: string = genId(),
    public start: number = ContactInformation.genDate(),
    public end: number | null = null,
    public activity: string = "",
    public location: string = ""
  ) {}

  public static genDate(date: Date = new Date()) {
    return DateTime.local().toMillis();
  }
}

export class ContactData {
  constructor(
    public id: string = genId(),
    public name: string = "Empty",
    public phoneNumber: string = "-",
    public email: string = "-"
  ) {}
}

export enum MutationTypes {
  ADD_CONTACT = "ADD_CONTACT",
  ADD_NEW_CONTACT_NAME = "ADD_NEW_CONTACT_NAME",
  CHANGE_CONTACT_NAME = "CHANGE_CONTACT_NAME",
  CHANGE_FIELD = "CHANGE_FIELD",
  INIT_STORE = "INIT_STORE",
  REMOVE_CONTACT = "REMOVE_CONTACT",
  REMOVE_CONTACT_NAME = "REMOVE_CONTACT_NAME",
  CHANGE_CONTACT_DETAIL = "CHANGE_CONTACT_DETAIL",
  CHANGE_PROFILE_DETAIL = "CHANGE_PROFILE_DETAIL",
  ADD_NEW_CONTACT_TO_CONTACT_LIST = "ADD_NEW_CONTACT_TO_CONTACT_LIST",
  REMOVE_CONTACT_FROM_CONTACT_LIST = "REMOVE_CONTACT_FROM_CONTACT_LIST",
  CHANGE_CONTACT_DATA_IN_CONTACT_LIST = "CHANGE_CONTACT_DATA_IN_CONTACT_LIST"
}

const getFrom = function(list: Array<any>, key: string, value: string) {
  list.forEach(obj => {
    if (obj[key] == value) {
      return obj;
    }
  });
  return null;
};

export default new Vuex.Store({
  state: {
    version: "1.0",
    contacts: [],
    entries: [new ContactInformation(["Herbert", "von", "Schlechter"])],
    profile: new ContactData()
  },
  mutations: {
    INIT_STORE(state: any) {
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
        const storeState: string = localStorage.getItem("store") ?? "";
        if (storeState) {
          const json = JSON.parse(storeState);
          if (json["version"]) {
            this.replaceState(Object.assign(state, json));
          } else {
            const newJson = {
              entries: json["contacts"],
              contacts: [],
              version: "1.0",
              profile: new ContactData()
            };
            this.replaceState(Object.assign(state, newJson));
            localStorage.setItem("store", JSON.stringify(state));
          }
        }
      }
    },
    ADD_CONTACT(state: any, payload: string) {
      state.entries.push(payload);
    },
    ADD_NEW_CONTACT_NAME(
      state: any,
      payload: {
        contact: ContactInformation;
      }
    ) {
      const index = state.entries.indexOf(payload.contact);
      state.entries[index].contacts.push("");
    },
    REMOVE_CONTACT_NAME(
      state: any,
      payload: {
        contact: ContactInformation;
        nameIndex: number;
      }
    ) {
      const index = state.entries.indexOf(payload.contact);
      state.entries[index].contacts.splice(payload.nameIndex, 1);
    },
    CHANGE_CONTACT_NAME(
      state: any,
      payload: {
        contact: ContactInformation;
        nameIndex: number;
        name: string;
      }
    ) {
      const index = state.entries.indexOf(payload.contact);
      state.entries[index].contacts[payload.nameIndex] = payload.name;
    },
    CHANGE_FIELD(
      state: any,
      payload: {
        contact: ContactInformation;
        key: string;
        value: string;
      }
    ) {
      const index = state.entries.indexOf(payload.contact);
      state.entries[index][payload.key] = payload.value;
    },
    REMOVE_CONTACT(state: any, contact: ContactInformation) {
      const index = state.entries.indexOf(contact);
      state.entries.splice(index, 1);
    },
    CHANGE_PROFILE_DETAIL(
      state: any,
      payload: {
        key: string;
        value: string;
      }
    ) {
      state.profile[payload.key] = payload.value;
    },
    ADD_NEW_CONTACT_TO_CONTACT_LIST(state: any, contact: ContactData) {
      if (!state.contacts.includes(contact)) {
        state.contacts.push(contact);
      } else {
        console.error("Contact is already known");
      }
    },
    REMOVE_CONTACT_FROM_CONTACT_LIST(state: any, id: string) {
      const contact = getFrom(state, "id", id);
      if (contact) {
        const index = state.contacts.indexOf(contact);
        state.contacts.splice(index, 1);
      }
    },
    CHANGE_CONTACT_DATA_IN_CONTACT_LIST(
      state: any,
      payload: {
        contactId: string;
        key: string;
        value: string;
      }
    ) {
      const contact = getFrom(state, "id", payload.contactId);
      if (contact) {
        const index = state.contacts.indexOf(contact);
        state.contacts[index][payload.key] = payload.value;
      }
    }
  },
  actions: {},
  modules: {}
});
