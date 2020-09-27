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
              <v-list-item-content class="text-center">
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
      <v-card-text class="m-2">
        <v-row>
          <v-col>
            <h3 class="color-blue">แก้ไขข้อมูลส่วนตัว</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-divider class="ma-4"></v-divider>
        </v-row>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="ชื่อ"
          hide-details
        ></v-text-field>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="นามสกุล"
          hide-details
        ></v-text-field>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="อีเมล"
          hide-details
        ></v-text-field>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="คณะ"
          hide-details
        ></v-text-field>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="ภาควิชา"
          hide-details
        ></v-text-field>
      </v-card-text>

      <v-card-text>
        <v-divider></v-divider>
      </v-card-text>

      <v-card-text>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="รหัสผ่านเก่า"
          hide-details
        ></v-text-field>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="รหัสผ่านใหม่"
          hide-details
        ></v-text-field>
        <v-text-field
          solo
          rounded
          dense
          filled
          label="ยืนยันรหัสผ่านใหม่"
          hide-details
        ></v-text-field>
      </v-card-text>

      <v-card-actions style="position: absolute; bottom: 0" class="pa-0 w-100">
        <v-row>
          <v-btn class="color-dark-blue">
            <v-icon
              v-text="'mdi-border-color'"
              class="pr-2 color-dark-blue"
            ></v-icon
            >บันทึก
          </v-btn>
        </v-row>
        <v-row>
          <v-btn style="color:#f44337;">
            <v-icon
              v-text="'mdi-logout'"
              class="pr-2"
              style="color: #f44337;"
            ></v-icon
            >ยกเลิก
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
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
    };
  },
  mounted() {},
  methods: {
    async updateMe() {
      const response = await this.$store.dispatch("teacher/updateMe", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        faculty: this.faculty,
        department: this.department,
      });

      alert(`${response.status} ${response.message}`);
    },
    async updatePassword() {
      if (this.confirmCandidateNewPassword != this.candidateNewPassword) {
        return alert("รหัสผ่านใหม่กับยืนยันรหัสผ่านใหม่ไม่ตรงกัน");
      }

      const response = await this.$store.dispatch("teacher/updatePassword", {
        oldPassword: this.oldPassword,
        candidateNewPassword: this.candidateNewPassword,
      });

      alert(`${response.status} ${response.message}`);
    },
  },
};
</script>
