<template>
  <div class="l-wrapper">
    <h1>新規投稿</h1>
    <p>title</p>
    <input v-model="title" class="c-input" />
    <span class="c-space"></span>
    <p>category</p>
    <input v-model="categories" class="c-input" />
    <span class="c-space"></span>
    <p>content</p>
    <textarea v-model="content" class="c-textarea" />

    <button @click="addContent" class="c-button c-button__primary">add</button>

    <p class="c-button c-button__primary">
      <router-link to="/adminHome">adminHome</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  name: "Home",
  data() {
    return {
      title: "",
      content: "",
      categories: "",
      contents: [],
    };
  },
  methods: {
    addContent() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let today = year + "-" + month + "-" + day;

      let categories = this.categories.split(",").map((e) => e.trim());

      let id = 1;

      firebase
        .database()
        .ref("contents")
        .on("value", function (snapshot) {
          snapshot.forEach(function (children) {
            id = children.val().id;
            id++;
          });
        });

      firebase.database().ref("contents").push({
        id: id,
        date: today,
        category: categories,
        title: this.title,
        content: this.content,
      });
    },
  },
  created() {},
};
</script>