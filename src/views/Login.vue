<template>
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">


        <div class="box">
          <h1 class="title">Log in to CryptoVue</h1>
          <form @submit.prevent="handleLogin">
            <div class="field">
              <div class="control">
                <input class="input" type="text" placeholder="Email" v-model="email">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="password">
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button :disabled="!formIsValid" class="button is-fullwidth is-dark" type="submit">
                  Log in
                </button>
              </div>
              <div v-if="error" class="help is-danger">
                The username and password you entered did not match our records. Please try again.
              </div>
            </div>

            <h3>Don't have an account?
              <router-link to="/signup">Sign up</router-link>
            </h3>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.$store.commit('setError', null)
  },
  computed: {
    ...mapGetters(['error', 'loading']),
    ...mapGetters('user', [
      'user'
    ]),
    formIsValid() {
      return this.email.length > 5 && this.password.length >= 8
    }
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/loginUser', {
        data: {
          email: this.email,
          password: this.password
        }
      })
    }
  }
};
</script>

<style lang="scss">
.button {
  &:hover {
    background-color: #d6d6d6
  }
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
