<template>
  <div class="h-100">
    <v-card
      v-if="!edit"
      min-height="100%"
      max-height="100%"
      height="100%"
      min-width="250"
      max-width="250"
      style="border-radius: 20px"
      class="mx-auto"
    >
      <v-card-text class="pa-6">
        <h2 class="color-blue">{{ firstName }}</h2>
        <h2 class="color-blue" style="font-weight: 300;">{{ lastName }}</h2>
        <div
          class="background-blue pl-2 pr-2 mt-4 color-white"
          style="border-radius: 20px; width: 130px"
        >
          EDUTEST |
          <span style="font-size: 10px">Teacher</span>
        </div>
        <div class="mt-12">
          <div class="mt-4">
            <h4>E-mail</h4>
            <span class="color-dark-blue">{{ email }}</span>
          </div>

          <div class="mt-4">
            <h4>คณะ</h4>
            <span class="color-dark-blue">{{ faculty }}</span>
          </div>

          <div class="mt-4">
            <h4>ประจำภาควิชา</h4>
            <span class="color-dark-blue">{{ department }}</span>
          </div>
        </div>
      </v-card-text>

      <v-card-actions style="position: absolute; bottom: 0" class="pa-0 w-100">
        <v-list
          dense
          class="pa-0 w-100"
          style="border-radius: 0px 0px 20px 20px;"
        >
          <v-list-item-group>
            <v-list-item color="primary">
              <v-list-item-content class="text-center" @click="edit = !edit">
                <span class="color-dark-blue">
                  <v-icon
                    v-text="'mdi-border-color'"
                    class="pr-2 color-dark-blue"
                  ></v-icon
                  >Edit Profile
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              color="red"
              style="background-color: #feebeb; border-radius: 0px 0px 20px 20px;"
            >
              <v-list-item-content class="text-center" @click="logout">
                <span style="color:#f44337;">
                  <v-icon
                    v-text="'mdi-logout'"
                    class="pr-2"
                    style="color: #f44337;"
                  ></v-icon
                  >Log out
                </span>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-actions>
    </v-card>

    <v-card
      v-else
      min-height="100%"
      max-height="100%"
      height="100%"
      min-width="250"
      max-width="250"
      style="border-radius: 20px"
      class="mx-auto"
    >
      <div v-if="!editPassword">
        <v-card-text class="m-2">
          <v-row dense>
            <v-col>
              <h3 class="color-blue">แก้ไขข้อมูลส่วนตัว</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-divider class="mx-4 my-2"></v-divider>
          </v-row>
          <span class="color-dark-blue" style="font-size: 12px;">ชื่อ</span>
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="firstName"
            label="ชื่อ"
            hide-details
          ></v-text-field>
          <span class="color-dark-blue" style="font-size: 12px;">นามสกุล</span>
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="lastName"
            label="นามสกุล"
            hide-details
          ></v-text-field>
          <span class="color-dark-blue" style="font-size: 12px;">คณะ</span>
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="faculty"
            label="คณะ"
            hide-details
          ></v-text-field>
          <span class="color-dark-blue" style="font-size: 12px;">ภาควิชา</span>
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="department"
            label="ภาควิชา"
            hide-details
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <div class="d-flex justify-center">
            <v-btn
              small
              class="green mr-2"
              max-width="400"
              rounded
              dark
              @click="updateMe"
            >
              บันทึก
            </v-btn>
            <v-btn
              small
              class="ml-2"
              style="color:#f44337;"
              max-width="400"
              rounded
              outlined
            >
              ยกเลิก
            </v-btn>
          </div>
        </v-card-text>

        <v-card-actions
          style="position: absolute; bottom: 0"
          class="pa-0 w-100"
        >
          <v-list
            dense
            class="pa-0 w-100"
            style="border-radius: 0px 0px 20px 20px;"
          >
            <v-list-item-group>
              <v-list-item color="primary">
                <v-list-item-content
                  class="text-center"
                  @click="editPassword = !editPassword"
                >
                  <span class="color-dark-blue">
                    <v-icon
                      v-text="'mdi-border-color'"
                      class="pr-2 color-dark-blue"
                    ></v-icon
                    >แก้ไขรหัสผ่าน
                  </span>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                color="red"
                style="background-color: #feebeb; border-radius: 0px 0px 20px 20px;"
              >
                <v-list-item-content class="text-center" @click="edit = !edit">
                  <span style="color:#f44337;">
                    <v-icon
                      v-text="'mdi-logout'"
                      class="pr-2"
                      style="color: #f44337;"
                    ></v-icon
                    >กลับ
                  </span>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-actions>
      </div>

      <div v-else>
        <v-card-text>
          <v-row dense>
            <v-col>
              <h3 class="color-blue">เปลี่ยนแปลงรหัสผ่าน</h3>
            </v-col>
          </v-row>

          <span class="color-dark-blue" style="font-size: 12px;"
            >รหัสผ่านปัจจุบัน</span
          >
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="oldPassword"
            type="password"
            hide-details
          ></v-text-field>

          <span class="color-dark-blue" style="font-size: 12px;"
            >รหัสผ่านใหม่</span
          >
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="candidateNewPassword"
            type="password"
            hide-details
          ></v-text-field>

          <span class="color-dark-blue" style="font-size: 12px;"
            >ยืนยันรหัสผ่านใหม่</span
          >
          <v-text-field
            class="mb-2"
            solo
            rounded
            dense
            filled
            v-model="confirmCandidateNewPassword"
            type="password"
            hide-details
          ></v-text-field>
        </v-card-text>

        <v-card-text>
          <div class="d-flex justify-center">
            <v-btn
              small
              class="green mr-2"
              max-width="400"
              rounded
              dark
              @click="updatePassword"
            >
              บันทึก
            </v-btn>
            <v-btn
              small
              class="ml-2"
              style="color:#f44337;"
              max-width="400"
              rounded
              outlined
            >
              ยกเลิก
            </v-btn>
          </div>
        </v-card-text>

        <v-card-actions
          style="position: absolute; bottom: 0"
          class="pa-0 w-100"
        >
          <v-list
            dense
            class="pa-0 w-100"
            style="border-radius: 0px 0px 20px 20px;"
          >
            <v-list-item-group>
              <v-list-item color="primary">
                <v-list-item-content
                  class="text-center"
                  @click="editPassword = !editPassword"
                >
                  <span class="color-dark-blue">
                    <v-icon
                      v-text="'mdi-border-color'"
                      class="pr-2 color-dark-blue"
                    ></v-icon
                    >กลับไปยังแก้ไขข้อมูลส่วนตัว
                  </span>
                </v-list-item-content>
              </v-list-item>

              <v-list-item
                color="red"
                style="background-color: #feebeb; border-radius: 0px 0px 20px 20px;"
              >
                <v-list-item-content class="text-center" @click="edit = !edit">
                  <span style="color:#f44337;">
                    <v-icon
                      v-text="'mdi-logout'"
                      class="pr-2"
                      style="color: #f44337;"
                    ></v-icon
                    >กลับไปยังข้อมูลส่วนตัว
                  </span>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>
<script>
import teacherServices from "../api/services/teacher";
export default {
  name: "profileMenu",
  data() {
    return {
      firstName: JSON.parse(localStorage.getItem("teacher")).firstName,
      lastName: JSON.parse(localStorage.getItem("teacher")).lastName,
      email: JSON.parse(localStorage.getItem("teacher")).email,
      faculty: JSON.parse(localStorage.getItem("teacher")).faculty,
      department: JSON.parse(localStorage.getItem("teacher")).department,
      oldPassword: "",
      candidateNewPassword: "",
      confirmCandidateNewPassword: "",
      edit: false,
      editPassword: false,
    };
  },
  methods: {
    async updateMe() {
      const response = await this.$store.dispatch("teacher/updateMe", {
        firstName: this.firstName,
        lastName: this.lastName,
        faculty: this.faculty,
        department: this.department,
      });

      alert(`${response.status} ${response.message}`);
      this.logout();
    },
    updatePassword() {
      if (!this.oldPassword) {
        return alert("กรุณาใส่รหัสผ่านปัจจุบัน");
      }

      if (!this.candidateNewPassword) {
        return alert("กรุณาใส่รหัสผ่านใหม่");
      }

      if (!this.confirmCandidateNewPassword) {
        return alert("กรุณาใส่ยืนยันรหัสผ่านใหม่");
      }

      if (this.confirmCandidateNewPassword != this.candidateNewPassword) {
        return alert("รหัสผ่านใหม่กับยืนยันรหัสผ่านใหม่ไม่ตรงกัน");
      }

      teacherServices
        .updatePassword({
          oldPassword: this.oldPassword,
          candidateNewPassword: this.candidateNewPassword,
        })
        .then((response) => {
          console.log(response);
          alert(`${response.data.status}: ${response.data.message}`);
          this.logout();
        })
        .catch((error) => alert(error.response.data.message));
    },
    logout() {
      this.$store.dispatch("teacher/logout");
    },
    cancel() {
      this.firstName = JSON.parse(localStorage.getItem("teacher")).firstName;
      this.lastName = JSON.parse(localStorage.getItem("teacher")).lastName;
      this.faculty = JSON.parse(localStorage.getItem("teacher")).faculty;
      this.department = JSON.parse(localStorage.getItem("teacher")).department;
    },
  },
};
</script>
