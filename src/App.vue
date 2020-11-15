<template>
  <main>
    <div id="app">
      <router-view />
    </div>
    <nav>
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/contacts">Contacts</router-link>
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
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 750px;
  width: 100%;
  height: 100%;
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
</style>
