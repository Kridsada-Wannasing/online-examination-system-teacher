<style lang="scss"></style>
<template id="login">
  <!-- <v-container class="grey lighten-12"> -->
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="7" md="6" sm="0" xs="0" class="h-100">
        <div class="container-full-screen h-100">
          <img src="@/assets/photo/pic-2.png" class="img-full-screen  h-100" />
        </div>
      </v-col>
      <v-col
        lg="5"
        md="6"
        sm="12"
        xs="12"
        class="background-dark-blue"
        align-self="center"
      >
        <div class="h-100" style="padding: 5% 25%;">
          <loginForm />
          <div class="text-center" style="font-size: 12px;">
            <p class="color-white">Term of use. Privacy policy</p>
            <p class="color-white">&copy; 2020 Edutest. All Rights Reserved</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import loginForm from "@/components/LoginForm";
export default {
  name: "login",
  components: {
    loginForm
  }
};
</script>
