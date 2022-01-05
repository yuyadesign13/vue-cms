<template>
  <div>
    <div class="l-wrapper">
      <h1>{{ post.title }}</h1>
      <ul class="l-left">
        <li>
          <ul>
            <li
              v-for="(cat, index) in post.category"
              :key="index"
              class="c-category"
            >
              {{ cat }}
            </li>
          </ul>
        </li>
        <li>date:{{ post.date }}</li>
      </ul>
      <p class="c-content">{{ post.content }}</p>
      <p class="c-button c-button__primary">
        <router-link to="/">home</router-link>
      </p>
      <ul>
        <li v-for="(comment, index) in comments" :key="index">
          <ul v-if="comment.id == targetId" class="c-comment">
            <li>{{ comment.name }}</li>
            <li>{{ comment.comment }}</li>
          </ul>
        </li>
      </ul>
      <p class="c-addComment">コメントを追加する。</p>
      <p>name</p>
      <input v-model="name" class="c-input"/>
      <span class="c-space"></span>
      <p>comment</p>
      <textarea v-model="comment" class="c-textarea"/>
      <br />
      <button @click="addComment" class="c-button c-button__primary">コメントを追加</button>
    </div>
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
      name: "",
      comment: "",
      comments: [],
    };
  },
  props: ["id"],
  methods: {
    addComment() {
      firebase.database().ref("comments").push({
        id: this.targetId,
        name: this.name,
        comment: this.comment,
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
    firebase
      .database()
      .ref("comments")
      .on("value", (snapshot) => (this.comments = snapshot.val()));
  },
};
</script>