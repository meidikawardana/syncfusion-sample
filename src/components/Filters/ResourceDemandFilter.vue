<template>
  <div class="row items-top" >
    <div class="col-2 q-pa-sm">
      <my-location multiple v-model:value="searchForm.location_id"/>
    </div>
    <div class="col-2 q-pa-sm">
      <my-client v-model:value="searchForm.client_id"/>
    </div>
    <div class="col-1 q-pa-sm">
      <my-input v-model:value="searchForm.sep_id" label="SEP#" type="number" />
    </div>
    <div class="col-1 q-pa-sm">
      <q-btn label="Search" ref="onSearchBtn" color="primary" @click="onSearch" :loading="loading"></q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useAuthStore } from 'src/stores/config/Auth'
import { useResourceDemandStore } from 'src/stores/snop/ResourceDemand'
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      searchForm: {
        location_id: [],
        client_id: null,
        sep_id: null
      },
      loading: false
    }
  },
  computed: {
    ...mapState(useAuthStore, ['preferences'])
  },
  methods: {
    ...mapActions(useAuthStore, ['SET_USER_PREFERENCES']),
    ...mapActions(useResourceDemandStore, ['getResourceDemands']),
    onSearch: function (args) {
      this.loading = true
      const params = {}
      if (this.searchForm.location_id) params['filter[location_id]'] = this.searchForm.location_id
      if (this.searchForm.client_id) params['filter[client_id]'] = this.searchForm.client_id
      if (this.searchForm.sep_id) params['filter[sep_id]'] = this.searchForm.sep_id

      this.getResourceDemands(params).then(response => {
        this.SET_USER_PREFERENCES(this.searchForm)
        this.$emit('filtered', response)
        this.loading = false
      })
    }
  },
  created () {
    this.searchForm = Object.assign({}, this.preferences)
    this.onSearch()
  }
})
</script>
