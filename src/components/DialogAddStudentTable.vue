<template>
  <div>
    <v-btn
      color="primary"
      class="text-none"
      small
      outlined
      depressed
      :loading="isSelecting"
      @click.stop="onButtonClick"
    >
      <v-icon left v-text="'mdi-paperclip'" small class="color-blue"></v-icon
      >{{ buttonText }}
    </v-btn>
    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      @input="getDataInExcel"
    />
    <v-dialog v-model="dialog" max-width="900">
      <v-data-table
        :headers="headers"
        :items="dataTable"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>{{ dataTable.length }} คน</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              small
              outlined
              color="success"
              dark
              class="mb-2 mr-2"
              @click="save"
              >Save</v-btn
            >
            <v-btn
              small
              outlined
              color="warning"
              dark
              class="mb-2"
              @click="cancel"
              >Cancel</v-btn
            >
          </v-toolbar>
        </template>
      </v-data-table>
    </v-dialog>
  </div>
</template>

<script>
import xlsx from "xlsx";
export default {
  data() {
    return {
      headers: [
        {
          text: "Student ID",
          align: "start",
          sortable: false,
          value: "studentId",
        },
        { text: "Name", value: "firstName", sortable: false },
        { text: "Surname", value: "lastName", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Faculty", value: "faculty", sortable: false },
        { text: "Department", value: "department", sortable: false },
      ],
      selectedFile: null,
      dataTable: [],
      dialog: false,
      defaultButtonText: "เพิ่มรายชื่อ",
      isSelecting: false,
    };
  },
  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    },
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
          this.dialog = !this.dialog;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    getDataInExcel(event) {
      this.selectedFile = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        let fileData = reader.result;
        let wb = xlsx.read(fileData, { type: "binary" });
        let wsname = wb.SheetNames[0];
        this.dataTable = xlsx.utils.sheet_to_json(wb.Sheets[wsname]);
      };
      reader.readAsBinaryString(this.selectedFile);
    },
    deleteItem(item) {
      const index = this.dataTable.indexOf(item);
      this.dataTable.splice(index, 1);
    },
    async save() {
      try {
        const response = await this.$store.dispatch(
          "student/registerStudents",
          this.dataTable
        );
        alert(`${response.status}: ${response.message}`);
        this.cancel();
      } catch (error) {
        alert(`${error.status}: ${error.message}`);
      }
    },
    cancel() {
      this.dataTable = [];
      this.selectedFile = null;
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style></style>
