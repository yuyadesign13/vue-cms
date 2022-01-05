<template>
  <div>
    <h1>admin Home</h1>
    <div v-for="(post, index) in posts" :key="index" class="c-float">
      <h2>{{ post.title }}</h2>
      <div class="c-float__left">
        <p>
          <router-link :to="'/adminEdit/' + index">update</router-link>
        </p>
        <p>
          <button @click="deleteMessage(index)" class="c-delete">delete</button>
        </p>
      </div>
    </div>
    <p class="c-button c-button__primary">
      <router-link to="/adminAdd">new posts</router-link>
    </p>
    <p class="c-button c-button__primary">
      <router-link to="/">home</router-link>
    </p>
    <br>
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
  methods: {
    deleteMessage(index) {
      firebase.database().ref("contents").child(index).remove();
    },
  },

  mounted() {
    firebase
      .database()
      .ref("contents")
      .on("value", (snapshot) => (this.posts = snapshot.val()));
  },
};
</script>