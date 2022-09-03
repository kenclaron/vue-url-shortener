<template>
  <div id="start-page">
    <h1>Hello, I'm URL Shortener</h1>
    <div class="card">
      <h1>Sign up new account</h1>
      <form id="signup-form">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
        />
        <label id="usernameLabel" class="hint" for="username"
          >Username must be at least 6 characters</label
        >
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          autocomplete="on"
        />
        <label id="passwordLabel" class="hint" for="password"
          >Password must be at least 6 characters</label
        >
        <label id="usernameExistsLabel" class="hint" for="username"
          >User with this username already exists</label
        >
        <input type="submit" value="Sign up" />
      </form>
      <router-link class="sub-link" to="/">Log in</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Authentication } from "@/assets/ts/auth";
require("@/assets/scss/auth.scss");

@Options({
  mounted() {
    this.$root.rename("Auth Page | Sign Up");

    /* @dev-code This code only for dev-environment and repeatable login on service!
        Use only with encoded variables on production
    */
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("time");
    /* @end-dev-code */

    this.signup(new Authentication());
  },
  methods: {
    signup(authentication) {
      document.getElementById("signup-form").addEventListener("submit", (e) => {
        e.preventDefault();

        let username = authentication.usernameInput.value;
        let password = authentication.passwordInput.value;

        let information = authentication.check(username, password);

        document.getElementById("username")?.classList.remove("_unavailable");
        document.getElementById("usernameLabel")?.classList.remove("_error");

        document.getElementById("password")?.classList.remove("_unavailable");
        document.getElementById("passwordLabel")?.classList.remove("_error");

        document
          .getElementById("usernameExistsLabel")
          ?.classList.remove("_error");

        if (information.status) {
          if (this.$password_encode) {
            password = authentication.encode(password);
          }

          let status = authentication.signup(username, password);

          status.then((result) => {
            if (result == 200) {
              this.$router.push("/");
            } else if (result == 400) {
              document
                .getElementById("username")
                ?.classList.add("_unavailable");
              document
                .getElementById("usernameExistsLabel")
                ?.classList.add("_error");
            }
          });
        } else {
          if (!information.username) {
            document.getElementById("username")?.classList.add("_unavailable");
            document.getElementById("usernameLabel")?.classList.add("_error");
          }
          if (!information.password) {
            document.getElementById("password")?.classList.add("_unavailable");
            document.getElementById("passwordLabel")?.classList.add("_error");
          }
        }

        return false;
      });
    },
  },
})
export default class Auth extends Vue {
  "signup-form": HTMLFormElement;
}
</script>
