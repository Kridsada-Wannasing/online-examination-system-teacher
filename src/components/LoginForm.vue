<template>
  <div class="text-center">
    <img
      src="@/assets/logo/logo-white.svg"
      style="background-position: center"
      width="100%"
    />
    <p class="pt-8 pb-8 color-white" style="font-size: 12px">
      Welcome back! Plaese login to your account.
    </p>
    <v-text-field dark label="Email" v-model="email"></v-text-field>
    <v-text-field
      dark
      label="Password"
      type="password"
      v-model="password"
    ></v-text-field>

    <div>
      <v-row no-gutters>
        <v-col cols="6">
          <v-checkbox dark label="Remember me"></v-checkbox>
        </v-col>
        <v-col cols="6" class="text-end">
          <div style="margin-top: 16px; padding-top: 4px;">
            <a class="color-white">Forgot password</a>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="pt-5 pb-8">
      <v-btn rounded color="#6dc449" style="width: 50%" @click="login" dark
        >Login</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("teacher/login", {
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push({ name: "Welcome" }))
        .catch((error) => error);
    },
  },
};
</script>
