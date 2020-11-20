<template>
  <main>
    <div id="app">
      <router-view />
    </div>
    <nav>
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/entries">Entries</router-link>
        <router-link to="/myself">Myself</router-link>
        <router-link to="/about">About</router-link>
      </div>
    </nav>
  </main>
</template>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  margin-bottom: 35px;
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
  display: block;
  bottom: 0;
  width: 100%;
  box-shadow: 5px 0 5px gray;

  div {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0);
    height: 100%;
    width: fit-content;
    a {
      display: inline-block;
      font-weight: bold;
      color: #2c3e50;
      border-right: 1px solid black;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;

      &.router-link-exact-active {
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
  width: 40px;
}
</style>
