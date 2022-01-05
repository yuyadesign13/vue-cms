<template>
  <div class="l-wrapper">
    <h1>投稿編集</h1>
    <p>title</p>
    <input v-model="editTitle" class="c-input" />
    <span class="c-space"></span>
    <p>category</p>
    <input v-model="editCategories" class="c-input" />

    <span class="c-space"></span>

    <textarea v-model="editContent" class="c-textarea" />

    <button @click="updateMessage()" class="c-button c-button__primary">
      update
    </button>

    <p class="c-button c-button__primary">
      <router-link to="/adminHome">adminHome</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  data() {
    return {
      post: [],
      targetId: this.id,
      editTitle: "",
      editContent: "",
      editCategories: "",
    };
  },
  props: ["id"],
  methods: {
    updateMessage() {
      let categories = this.editCategories.split(",").map((e) => e.trim());

      firebase.database().ref("contents").child(this.targetId).update({
        category: categories,
        title: this.editTitle,
        content: this.editContent,
      });
    },
  },
  mounted() {
    firebase
      .database()
      .ref("contents")
      .on(
        "value",
        (snapshot) => (this.post = snapshot.child(this.targetId).val())
      );
    this.editTitle = this.post.title;
    this.editCategories = this.post.category;
    this.editContent = this.post.content;
  },
};
</script>