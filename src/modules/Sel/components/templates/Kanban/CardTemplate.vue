<template>
  <div class='q-pa-xs left-border'>
    <div class='row'>
      EQ {{ data.mps_view.equipment }}
      |
      SO {{ data.mps_view.service_order }}
      <q-space />
      <q-badge
        class='q-ma-sm'
        color='grey'
        :label='startedDate'
        outline
        rounded
      />
      <q-badge
        class='q-ma-sm'
        :color='statusColor'
        :label='data.status'
        rounded
      />
    </div>

    <div class='row'>
      {{ data.mps_view.description }}
    </div>

    <div class='row'>
      <q-badge class='q-ma-sm' color='grey' :label='locationName' rounded />
      <q-badge class='q-ma-sm' color='grey' :label='clientName' rounded />
      <q-badge
        class='q-ma-sm'
        color='grey'
        :label="'SEL# ' + data.mps_view.sel_header_id"
        rounded
      />
      <q-badge class='q-ma-sm' color='green' :label='scopeName' rounded />
      <q-space />
      <q-badge
        class='q-ma-sm'
        color='grey'
        :label='data.mps_view.project'
        rounded
      />
    </div>
  </div>
</template>

<script>
import { dateToDisplay } from 'src/modules/Application/actions/DateToDisplay'

export default {
  name: 'CardTemplate',
  props: {
    data: { type: Object, required: true },
    getClient: { type: Function, required: true },
    getLocation: { type: Function, required: true },
    getScope: { type: Function, required: true },
  },
  data() {
    return {}
  },
  computed: {
    statusColor() {
      if (this.data.status === 'On-Time') return 'positive'
      return 'negative'
    },
    clientName() {
      return this.getClient(this.data.mps_view.client_id).description
    },
    locationName() {
      return this.getLocation(this.data.mps_view.location_id).location
    },
    scopeName() {
      return this.getScope(this.data.mps_view.scope_id)
    },
    startedDate() {
      return dateToDisplay(this.data.station_started_at, true)
    },
  },
}
</script>

<style lang="scss">
.left-border {
  border-left: 5px solid $primary;
}
</style>
