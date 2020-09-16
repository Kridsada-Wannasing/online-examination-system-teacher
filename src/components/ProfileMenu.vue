<template>
  <div class="h-100">
    <v-card
      min-height="100%"
      max-height="100%"
      height="100%"
      min-width="250"
      max-width="250"
      style="border-radius: 20px"
      class="mx-auto"
    >
      <v-list-item class="pa-6 pb-1">
        <v-list-item-avatar color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-text class="pa-6">
        <h2 class="color-blue">Prof. David</h2>
        <h2 class="color-blue" style="font-weight: 300;">McKenzie</h2>
        <div
          class="background-blue pl-2 pr-2 mt-4 color-white"
          style="border-radius: 20px; width: 130px"
        >
          EDUTEST |
          <span style="font-size: 10px">Teacher</span>
        </div>
        <div class="mt-16">
          <div class="mt-4">
            <h4>รหัสนักผู้สอน</h4>
            <span class="color-dark-blue">116010805043-7</span>
          </div>
          <div class="mt-4">
            <h4>E-mail</h4>
            <span class="color-dark-blue">McKenzie@gmail.com</span>
          </div>

          <div class="mt-4">
            <h4>คณะ</h4>
            <span class="color-dark-blue">วิศวกรรมศาสตร์</span>
          </div>

          <div class="mt-4">
            <h4>ประจำภาควิชา</h4>
            <span class="color-dark-blue">วิศวกรรมศาสตร์คอมพิวเตอร์</span>
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
              <v-list-item-content class="text-center">
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
  </div>
</template>
<script>
export default {
  name: "profileMenu"
};
</script>
