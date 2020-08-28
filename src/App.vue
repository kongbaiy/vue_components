<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App"
  }
</script>

<style>
  @import url('https://rsms.me/inter/inter.css');
  @import "./assets/css/common.scss";

  *{
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Inter', sans-serif;
    font-feature-settings: "case";
  }

  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }

  input{
    background-color: transparent;
    outline: none;
    border: 0;
  }
</style>
