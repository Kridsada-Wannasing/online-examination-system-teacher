<style lang="scss"></style>
<template id="welcome">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <div
          style="height: 50%; min-height: 50%; max-height: 50%; overflow: auto;"
        >
          <ListClass />
        </div>
        <div
          class="pt-10"
          style="height: 50%; min-height: 50%; max-height: 50%;"
        >
          <v-card class="mx-auto pa-10 h-100" style="border-radius: 20px; overflow: auto;" outlined>
            <h3 class="color-dark-blue pb-2">เพิ่มรายวิชา</h3>
            <hr class="mb-4" />
            <div>
              <v-row>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >รหัสวิชา</span
                  >
                  <v-text-field
                    placeholder="ex. 1234567"
                    filled
                    rounded
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >ชื่อวิชา</span
                  >
                  <v-text-field
                    placeholder="ex."
                    filled
                    rounded
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="4">
                  <span class="color-dark-blue" style="font-size: 12px;"
                    >กลุ่มเรียน</span
                  >
                  <v-text-field
                    placeholder="ex. 1234"
                    filled
                    rounded
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
            <div>
              <ListCode />
            </div>
            <div
              class="mt-15"
              style="display: flex; justify-content: flex-end;"
            >
              <v-btn rounded color="#6dc449" small style="width: 150px" dark
                >บันทึก</v-btn
              >
              <v-btn
                class="ml-4"
                outlined
                rounded
                color="red"
                small
                style="width: 150px"
                dark
                >ยกเลิก</v-btn
              >
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ListClass from "@/components/ListClass";
import ProfileMenu from "@/components/ProfileMenu";
import ListCode from "@/components/ListCode";
export default {
  name: "class",
  components: {
    ListClass,
    ListCode,
    ProfileMenu
  },
  data: () => ({
    items: [
      {
        code: "ENC 2001"
      },
      {
        code: "ENC 2002"
      },
      {
        code: "ENC 2003"
      },
      {
        code: "ENC 2004"
      }
    ]
  })
};
</script>
