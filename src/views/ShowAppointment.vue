<template>
  <div class="h-100">
    <v-row class="h-100 ma-0 pa-0">
      <v-col cols="9" class="ma-0 pa-0 mt-0 pt-0">
        <h1 class="color-white mb-2">การนัดหมาย</h1>
        <v-row>
          <v-col class="pa-0">
            <v-card
              v-if="!showTable"
              class="mx-3 pa-6 mb-4"
              style="border-radius: 20px;"
              outlined
            >
              <div style="display:flex; justify-content:space-between;">
                <h4 class="color-dark-blue">ตั้งค่าการนัดหมาย</h4>
                <v-btn small text color="primary" rounded @click="openTable"
                  >ดูหน้ารายชื่อ<v-icon right
                    >mdi-account-arrow-right-outline</v-icon
                  ></v-btn
                >
              </div>
              <v-row>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >ชื่อวิชา</span
                  >
                  <v-select
                    solo
                    rounded
                    filled
                    dense
                    :items="subjects"
                    :item-text="'subjectName'"
                    :item-value="'subjectId'"
                    v-model="meetingData.subjectId"
                    label="ex. 12445"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >ปีการศึกษา</span
                  >
                  <v-text-field
                    solo
                    rounded
                    filled
                    dense
                    v-model="meetingData.year"
                    label="ex. 12445"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >การสอบ</span
                  >
                  <v-select
                    solo
                    rounded
                    filled
                    dense
                    :items="types"
                    v-model="meetingData.examType"
                    label="ex.124456"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >ภาคการศึกษา</span
                  >
                  <v-text-field
                    solo
                    rounded
                    filled
                    dense
                    v-model="meetingData.term"
                    label="ex. 124456"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >วันเวลาสอบ</span
                  >
                  <v-datetime-picker
                    v-model="meetingData.examDate"
                    :textFieldProps="{ solo: true, dense: true, rounded: true }"
                  >
                    <template slot="dateIcon">
                      <v-icon>Date</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>Time</v-icon>
                    </template>
                  </v-datetime-picker>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >กลุ่มเรียน</span
                  >
                  <v-select
                    solo
                    rounded
                    filled
                    dense
                    label="ex. 12445"
                    hide-details
                  ></v-select>
                </v-col> -->
              </v-row>
              <v-row class="my-2">
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-btn
                    class="ml-8"
                    rounded
                    color="#6dc449"
                    small
                    style="width: 150px"
                    dark
                    @click="updateMeeting"
                    >บันทึก</v-btn
                  >
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <v-btn
                    class="ml-4"
                    outlined
                    rounded
                    color="red"
                    small
                    style="width: 150px"
                    dark
                    @click="cancel"
                    >ยกเลิก</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
            <v-card
              v-else
              class="mx-auto pa-6"
              style="border-radius: 20px;"
              outlined
            >
              <v-row>
                <v-col>
                  <v-data-table
                    class="rounded-xl"
                    :headers="headers"
                    :items="students"
                    :items-per-page="5"
                  >
                    <template v-slot:top>
                      <v-toolbar flat color="white" class="rounded-xl mx-0">
                        <h3 class="color-dark-blue">
                          รายชื่อนักศึกษา
                        </h3>
                        <v-spacer></v-spacer>
                        <AddStudentInAppointment
                          :meetingId="meetingData.meetingId"
                        />
                        <v-btn
                          small
                          outlined
                          text
                          color="primary"
                          @click="openTable"
                          ><v-icon left>mdi-arrow-left</v-icon>กลับ</v-btn
                        >
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon small @click="deleteStudent(item)"
                        >mdi-delete</v-icon
                      >
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" class="h-100 ma-0 pa-0 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProfileMenu from "@/components/ProfileMenu";
import AddStudentInAppointment from "../components/AddStudentInAppointment";
import { mapState } from "vuex";
export default {
  props: {
    status: Boolean,
  },
  components: {
    ProfileMenu,
    AddStudentInAppointment,
  },
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
        { text: "Faculty", value: "faculty", sortable: false },
        { text: "Department", value: "department", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      types: ["กลางภาค", "ปลายภาค", "สอบย่อย"],
      meetingData: {
        subjectId: null,
        examDate: "",
        examType: "",
        term: null,
        year: null,
      },
      cahcedData: {},
      showDialog: false,
      showTable: false,
    };
  },
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("meeting", ["students"]),
    ...mapState("meeting", ["meeting"]),
  },
  methods: {
    async updateMeeting() {
      if (this.meetingData.examDate == this.meeting.examDate) {
        delete this.meetingData.examDate;
      }

      const response = await this.$store.dispatch(
        "meeting/updateMeeting",
        this.meetingData
      );

      alert(`${response.data.status}: ${response.data.message}`);
    },
    deleteStudent(item) {
      this.$store.dispatch("meeting/deleteStudentInMeeting", item.studentId);
    },
    openTable() {
      this.showTable = !this.showTable;
    },
    cancel() {
      this.meetingData = Object.assign({}, this.meeting);
    },
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
    this.meetingData = Object.assign({}, this.meeting);
    this.meetingData.examDate = new Date(this.meetingData.examDate);
  },
};
</script>

<style></style>
