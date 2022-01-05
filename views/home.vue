<template>
  <div>
    <h1>home page</h1>
      <h2 v-for="(content, index) in posts" :key="index">
        <router-link :to="'/postDetails/' + index">{{
          content.title
        }}</router-link>
        <br />
      </h2>
    <p class="c-button c-button__primary">
    <router-link to="/login">login</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    firebase
      .database()
      .ref("contents")
      .on("value", (snapshot) => (this.posts = snapshot.val()));
  },
};
</script>