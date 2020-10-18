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

    <div class="ma-0 pa-0" v-if="!status">
      <v-text-field dark label="Email" v-model="email"></v-text-field>
      <v-text-field
        dark
        label="Password"
        type="password"
        v-model="password"
      ></v-text-field>
    </div>
    <div class="ma-0 pa-0" v-else>
      <v-text-field dark label="Email" v-model="email"></v-text-field>
    </div>

    <div>
      <v-row no-gutters>
        <v-col cols="6">
          <v-checkbox dark label="Remember me"></v-checkbox>
        </v-col>
        <v-col cols="6" class="text-end">
          <div style="margin-top: 16px; padding-top: 4px;">
            <a class="color-white" @click="status = !status" v-if="!status"
              >Forgot password</a
            >
            <a class="color-white" @click="status = !status" v-else>Login</a>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="pt-5 pb-8">
      <v-btn
        v-if="!status"
        rounded
        color="#6dc449"
        style="width: 50%"
        @click="login"
        dark
        >Login</v-btn
      >
      <v-btn v-else rounded color="#6dc449" @click="forgotPassword" dark
        >Forgot Password</v-btn
      >
    </div>
  </div>
</template>
<script>
import teacherServices from "../api/services/teacher";
export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: "",
      status: false,
    };
  },
  methods: {
    async login() {
      try {
        if (!this.email || !this.password) {
          return alert("คุณยังไม่ได้ใส่อีเมลหรือรหัสผ่าน");
        }
        await this.$store.dispatch("teacher/login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ path: "/welcome" });
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    forgotPassword() {
      teacherServices
        .forgotPassword({
          email: this.email,
        })
        .then((response) => {
          this.status = false;
          alert(`${response.data.status}: ${response.data.message}`);
        })
        .catch((error) => alert(`${error.response.data.message}`));
    },
  },
};
</script>
