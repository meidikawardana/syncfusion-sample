<template>
  <div>
    <q-form ref="form" @submit="onSearch">
      <div class="row">
        <div class="col-1 q-pa-sm">
          <q-btn
            type="submit"
            label="Search"
            ref="onSearchBtn"
            color="primary"
            @click.prevent="onSearch"
            :loading="loading"
            style="display: none"
          ></q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import scheduler from "src/mixins/TspSchedule/scheduler";
export default {
  name: "ScheduleFilter",
  mixins: [scheduler],
  data() {
    return {
      searchForm: {
        location_id: [],
        client_id: null,
        project_name: null,
        sep_id: null,
        calloff_id: this.$route.params.calloff_id,
        status_id: [1, 2],
      },
      loading: false,
    };
  },
  computed: {},
  methods: {
    onSearch: function (args) {
      const params = {};
      if (this.searchForm.location_id)
        params["filter[location_id]"] = this.searchForm.location_id;
      if (this.searchForm.client_id)
        params["filter[client_id]"] = this.searchForm.client_id;
      if (this.searchForm.project_name)
        params["filter[project_name]"] = this.searchForm.project_name;
      if (this.searchForm.sep_id)
        params["filter[sep_id]"] = this.searchForm.sep_id;
      if (this.searchForm.calloff_id)
        params["filter[calloff_id]"] = this.searchForm.calloff_id;
      if (this.searchForm.status_id !== null)
        params["filter[status_id]"] = this.searchForm.status_id;
      this.loading = true;
      this.getSchedules(params).then((response) => {
        this.loading = false;
        this.$emit("done", response);
      });
    },
  },
  created() {
    if (!(this.$route.params.sep_id > 1000)) this.searchForm.sep_id = null;
    if (!this.$route.params.calloff) this.onSearch();
  },
};
</script>
