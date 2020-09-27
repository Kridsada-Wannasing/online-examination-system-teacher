<style lang="scss"></style>
<template id="appointment">
  <div class="h-100">
    <v-row no-gutters class="h-100" align="center">
      <v-col lg="9" md="8" sm="12" xs="12" class="h-100 pr-5">
        <h1 class="color-white">การนัดหมาย</h1>
        <FilterClass />
        <div class="pt-8" style="max-height: 400px; overflow:auto">
          <v-card v-if="!status" class="pa-10" style="border-radius: 20px">
            <div
              class="pb-5"
              style="display: flex; justify-content: space-between;"
            >
              <h3 class="color-dark-blue">การนัดหมายตอนนี้</h3>
              <v-btn small outlined color="primary" @click="status = !status">
                <v-icon left>mdi-plus</v-icon>เพิ่มการนัดหมาย
              </v-btn>
            </div>
            <ListAppointment />
          </v-card>

          <div v-else :status="status" @statusChange="getStatusChange">
            <AddAppointment />
          </div>
        </div>
      </v-col>
      <v-col lg="3" md="4" sm="12" xs="12" class="h-100 pl-5">
        <ProfileMenu />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProfileMenu from "@/components/ProfileMenu";
import ListAppointment from "@/components/ListAppointment";
import FilterClass from "@/components/FilterClass";
import AddAppointment from "@/components/AddAppointment";
export default {
  name: "appointment",
  components: {
    ProfileMenu,
    FilterClass,
    ListAppointment,
    AddAppointment,
  },
  data: () => ({
    status: false,
  }),
  methods: {
    getStatusChange(event) {
      this.status = event;
    },
  },
};
</script>
