<template>
  <div>
    <v-dialog v-model="dialog" max-width="500" persistent scrollable>
      <v-card v-if="showTable">
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="tags"
            sort-by="calories"
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>แท็กทั้งหมด</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  color="primary"
                  dark
                  class="mb-2"
                  @click="showTable = !showTable"
                >
                  เพิ่มแท็ก
                </v-btn>
                <v-btn color="red" text @click="close">
                  ปิดหน้าต่างนี้
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="showUpdateTag(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteTag(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
      <!--  -->
      <v-card class="ma-0 pa-0" v-else>
        <v-card-title>
          <span class="headline">{{
            isUpdate ? "แก้ไขแท็ก" : "เพิ่มแท็ก"
          }}</span>
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
          <v-btn color="blue darken-1" v-if="isUpdate" text @click="updateTag">
            บันทึก
          </v-btn>
          <v-btn color="blue darken-1" v-else text @click="createTag">
            บันทึก
          </v-btn>
          <v-btn color="blue darken-1" text @click="cancel">
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    dialog: Boolean
  },
  data() {
    return {
      showTable: true,
      headers: [
        {
          text: "หมายเลขประจำแท็ก",
          value: "tagId",
          align: "start",
          sortable: false
        },
        {
          text: "แท็ก",
          value: "tagName",
          sortable: false
        },
        {
          text: "จัดการ",
          value: "actions",
          sortable: false
        }
      ],
      tagName: "",
      tagId: 0,
      update: false
    };
  },
  computed: {
    ...mapState("tag", ["tags"]),
    isUpdate() {
      return !!this.update;
    }
  },
  methods: {
    async createTag() {
      const response = await this.$store.dispatch("tag/createTag", {
        tagName: this.tagName
      });
      alert(`${response.status}: ${response.message}`);
      this.showTable = !this.showTable;
    },
    async updateTag() {
      const response = await this.$store.dispatch("tag/updateTag", {
        tagId: this.tagId,
        tagName: this.tagName
      });
      alert(`${response.status}: ${response.message}`);
      this.showTable = !this.showTable;
    },
    deleteTag(item) {
      confirm("คุณต้องการลบแท็กหรือไม่") &&
        this.$store
          .dispatch("tag/deleteTag", item.tagId)
          .then(() => alert("ลบแท็กเรียบร้อย"));
    },
    showUpdateTag(item) {
      this.update = true;
      this.showTable = !this.showTable;
      this.tagName = item.tagName;
      this.tagId = item.tagId;
    },
    cancel() {
      this.tagName = "";
      this.update = false;
      this.showTable = !this.showTable;
    },
    close() {
      this.$emit("emittedDialog", !this.dialog);
    }
  },
  mounted() {
    this.$store.dispatch("tag/getAllTags");
  }
};
</script>
