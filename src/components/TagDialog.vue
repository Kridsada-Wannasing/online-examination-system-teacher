<template>
  <div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          <span class="headline">เพิ่มแท็ก</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="ชื่อแท็ก" v-model="tagName"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createTag">
            Save
          </v-btn>
          <v-btn color="blue darken-1" text @click="cancel">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: Boolean,
  },
  data() {
    return {
      tagName: "",
    };
  },
  methods: {
    async createTag() {
      const response = await this.$store.dispatch("tag/createTag", {
        tagName: this.tagName,
      });
      alert(`${response.status}: ${response.message}`);
      this.$emit("emittedDialog", !this.dialog);
    },
    cancel() {
      this.$emit("emittedDialog", !this.dialog);
    },
  },
};
</script>
