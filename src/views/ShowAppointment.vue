<template>
  <div class="h-100">
    <v-row class="h-100 ma-0 pa-0">
      <v-col cols="9" class="ma-0 pa-0 mt-0 pt-0">
        <v-row>
          <v-col class="ma-0 pa-0">
            <v-card
              class="mx-3 pa-6 mb-4"
              style="border-radius: 20px;"
              outlined
            >
              <h4 class="color-dark-blue">ตั้งค่าการนัดหมาย</h4>
              <v-row>
                <v-col cols="12" sm="6" md="3" lg="3">
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
                    label="ex. 12345"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="3">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >ปีการศึกษา</span
                  >
                  <v-text-field
                    solo
                    rounded
                    filled
                    dense
                    v-model="meetingData.year"
                    label="ex. 12345"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="3">
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
                    label="ex.123456"
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="3">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >ภาคการศึกษา</span
                  >
                  <v-text-field
                    solo
                    rounded
                    filled
                    dense
                    v-model="meetingData.term"
                    label="ex. 123456"
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3" lg="3">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >วันเวลาสอบ</span
                  >
                  <v-text-field
                    solo
                    rounded
                    filled
                    dense
                    v-model="meetingData.examDate"
                    label="ex. 12345"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="3">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >กลุ่มเรียน</span
                  >
                  <v-select
                    solo
                    rounded
                    filled
                    dense
                    label="ex. 12345"
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" md="3" lg="3">
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
                <v-col cols="12" sm="6" md="3" lg="3">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-data-table
              class="rounded-xl"
              :headers="headers"
              :items="students"
              :items-per-page="5"
            >
              <template v-slot:top>
                <v-toolbar flat color="white" class="rounded-xl">
                  <h3 class="color-dark-blue pl-3">
                    นัดหมายการสอบนักศึกษาจำนวน {{ students.length }} คน
                  </h3>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
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
import { mapState } from "vuex";
export default {
  props: {
    // meeting: Object,
    status: Boolean,
  },
  components: {
    ProfileMenu,
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
      invitedStudent: [],
      cahcedData: {},
    };
  },
  computed: {
    ...mapState("subject", ["subjects"]),
    ...mapState("meeting", ["students"]),
    ...mapState("meeting", ["meeting"]),
  },
  methods: {
    async updateMeeting() {
      const response = await this.$store.dispatch("meeting/updateMeeting", {
        examDate: this.meetingData.examDate,
        examType: this.meetingData.examType,
        subjectId: this.meetingData.subjectId,
        term: this.meetingData.term,
        year: this.meetingData.year,
      });

      if (this.invitedStudent.length != 0) {
        this.addInvitedStudent(
          this.mapInvitedStudent(this.invitedStudent, response.data.meetingId)
        );
      }
      console.log(response);
    },
    async addInvitedStudent(invitedStudent) {
      const response = await this.$store.dispatch(
        "meeting/addInvitedStudent",
        invitedStudent
      );

      console.log(response);
    },
    deleteStudent(item) {
      this.$store.dispatch("meeting/deleteStudentInMeeting", item.studentId);
    },
    cancel() {
      this.meetingData = this.cahcedData;
      console.log(this.meetingData);
      // this.$emit("statusChange", !this.status);
    },
    mapInvitedStudent(invitedStudent, meetingId) {
      return invitedStudent.map((element) => ({
        studentId: element,
        meetingId: meetingId,
      }));
    },
  },
  mounted() {
    this.$store.dispatch("subject/getAllSubjects");
    this.cahcedData = Object.assign({}, this.meeting);
    this.meetingData = Object.assign({}, this.meeting);
    console.log(this.meetingData);
  },
};
</script>

<style></style>
