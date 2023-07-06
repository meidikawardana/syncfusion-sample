<template>
  <div class='text-h6 text-primary'>
    {{ station.name }} ({{ station.department }})
  </div>
</template>

<script>
import { getKanbanStation } from 'src/modules/Sel/actions/GetKanbanStation'

export default {
  name: 'HeaderTemplate',
  props: {
    data: { type: Object, required: true },
    stations: { type: Object, required: true },
  },
  data() {
    return {
      station: {},
    }
  },
  created() {
    this.station = getKanbanStation(this.stations, this.data.keyField)
  },
}
</script>

<style></style>
