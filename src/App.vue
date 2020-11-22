<template>
  <main>
    <div id="app">
      <router-view />
    </div>
    <nav>
      <div>
        <router-link class="icon-button" to="/">
          <BIconHouseFill title="Home" />
        </router-link>
        <router-link class="icon-button" to="/entries">
          <BIconJournalMedical title="Contact Journal" />
        </router-link>
        <router-link class="icon-button" to="/contacts">
          <BIconJournalText title="Contacts" />
        </router-link>
        <router-link class="icon-button" to="/myself">
          <BIconFilePersonFill title="Your Profile" />
        </router-link>
        <router-link class="icon-button" to="/about">
          <BIconInfoCircleFill title="About" />
        </router-link>
      </div>
    </nav>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  BIconJournalMedical,
  BIconHouseFill,
  BIconFilePersonFill,
  BIconInfoCircleFill,
  BIconJournalText
} from "bootstrap-vue";

@Component({
  components: {
    BIconJournalMedical,
    BIconHouseFill,
    BIconFilePersonFill,
    BIconInfoCircleFill,
    BIconJournalText
  }
})
export default class Entries extends Vue {}
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  margin-bottom: 35px;
  background-color: rgb(177, 177, 177);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 750px;
  margin: 0 auto;
}

nav {
  background-color: rgb(220, 54, 100);
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  box-shadow: 5px 0 5px gray;
  justify-content: center;
  align-items: center;

  div {
    padding-top: 5px;
    a {
      display: inline-block;
      font-weight: bold;
      color: #2c3e50;
      border-right: 1px solid black;
      padding: 0 15px;
      height: 30px;
      line-height: 30px;
      text-align: center;

      &.router-link-exact-active {
        svg {
          fill: white;
        }
        color: white;
      }

      &:last-child {
        border: 0;
      }
    }
  }
}

.icon-button {
  background-color: transparent;
  border: none;

  svg {
    fill: black;
    height: 100% !important;
    width: 100% !important;
  }

  &:hover {
    svg {
      fill: #006837;
    }
  }
}

input,
textarea {
  height: 25px;
  border: 1px solid gray;
  border-radius: 5px;

  &:focus {
    box-shadow: 0 0 0 1px #006837;
  }
}

button {
  height: 40px;
}
</style>
