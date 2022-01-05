import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';

Vue.use(Vuex);

import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default new Vuex.Store({
  namespaced: true,
  state() {
    return {
      //   contents: [],
      password: '',
    }
  },
  getters: {
    password: state => state.password,
  },
  mutations: {
    login(state, password) {
      state.password = password;
    }
  },
  actions: {
    login({ commit }, password) {

      let pass = [];

      firebase
        .database()
        .ref("password")
        .on("value", snapshot => pass.push((snapshot.val())));

      const wait = (sec) => {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, sec * 1000);
          setTimeout(() => { reject(new Error("エラー！")) }, sec * 1000);
        });
      };

      async function passCheck() {
        try {
          await wait(1);
          if (password == pass[0]) {
            commit('login', password);
            router.push('/adminHome');
          } else {
            this.password = '';
            alert('パスワードが異なります。');
          }

        } catch (err) {
          console.error(err);
        }
      }
      passCheck();
    },
  },
  modules: {
  }
});
