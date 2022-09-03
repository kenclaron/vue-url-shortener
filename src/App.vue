<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Auth from "./components/Auth.vue";
require("@/assets/scss/app.scss");

@Options({
  name: "URL Shortener Service",
  components: {
    Auth,
  },
  methods: {
    rename(title: string) {
      document.title = title;
    },
  },
})
export default class App extends Vue {}
</script>
