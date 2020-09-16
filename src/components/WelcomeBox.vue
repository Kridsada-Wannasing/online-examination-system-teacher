<template>
  <div
    class="h-100"
    style="border-radius: 20px; background-position: center;"
    v-bind:style="{
      backgroundImage: 'url(' + require('@/assets/photo/pic-1.png') + ')'
    }"
  >
    <div class="pa-10 h-100">
      <div style="height: 20%;">
        <h2 class="color-white">Welcome</h2>
        <h3 class="color-white" style="font-weight: 200;">Prof. David!</h3>
      </div>
      <div style="height: 60%;" class="pt-15">
        <h3 class="mb-0 color-white" style="font-weight: 300;">
          We're edutest teacher platform,
        </h3>
        <span class="color-white" style="font-weight: 300;"
          >We're edutest teacher platform,</span
        >
      </div>
      <div
        class="pt-5"
        style="display: flex; justify-content: space-between; height: 20%;"
      >
        <span
          class="color-white"
          style="text-decoration: underline; font-weight: 400; font-size: 12px;"
          >View detail.</span
        >
        <img src="@/assets/logo/logo-white-small.svg" width="100px" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "welcomeBox"
};
</script>
