import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export class ContactInformation {
  constructor(
    public contacts: Array<string> = [""],
    public id: string = ContactInformation.genId(),
    public start: Date = new Date(),
    public end: Date | null = null,
    public activity: string = "Nothing",
    public location: string = "At Home"
  ) {}

  public static genId() {
    const randomString = function() {
      return Math.random().toString(16);
    };
    return `${new Date().getTime()}-${randomString()}`;
  }
}

export enum MutationTypes {
  ADD_CONTACT = "ADD_CONTACT",
  CHANGE_DATE = "CHANG_DATE",
  ADD_NEW_CONTACT_NAME = "ADD_NEW_CONTACT_NAME",
  CHANGE_CONTACT_NAME = "CHANGE_CONTACT_NAME",
  CHANGE_FIELD = "CHANGE_FIELD",
  INIT_STORE = "INIT_STORE"
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
    CHANGE_DATE(
      state: any,
      payload: {
        contact: ContactInformation;
        isStart: boolean;
        date: Date;
      }
    ) {
      const index = state.contacts.indexOf(payload.contact);
      state.contacts[index].start = payload.date;
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
    }
  },
  actions: {},
  modules: {}
});
