<template>
  <div>
    <v-row>
      <v-col style="max-width: 150px;" v-for="(tag, i) in tags" :key="i">
        <div
          class="background-dark-blue color-white pa-2 pl-3 pr-3"
          style="display: flex; justify-content: space-between; border-radius: 20px; font-size: 14px;"
        >
          {{ tag.tagName }}
          <span style="cursor: pointer;">
            <v-icon v-text="'mdi-close'" small class="color-white"></v-icon>
          </span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "listCode",
  props: {
    tags: Array,
  },
  data: () => ({
    // items: [
    //   {
    //     code: "ENC 2001",
    //   },
    //   {
    //     code: "ENC 2002",
    //   },
    //   {
    //     code: "ENC 2003",
    //   },
    // ],
  }),
};
</script>
