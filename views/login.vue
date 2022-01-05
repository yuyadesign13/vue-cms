<template>
  <div class="l-wrapper">
    <h1>login page</h1>
    <label for="password">パスワード</label>
    <span class="c-space"></span>
    <input id="password" type="password" v-model="password" class="c-password" />
    <br /><br />
    <button @click="login" class="c-button c-button__primary">送信</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.password);
    },
  },
};
</script>