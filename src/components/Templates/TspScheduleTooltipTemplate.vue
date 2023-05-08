<template>
  <div>
    <div class='row'>Scope: {{ data.project_scope }}</div>
    <div class='row'>Start : {{ startDate }}</div>
    <div class='row'>Finish: {{ finishDate }}</div>
    <div class='row'>Duration: {{ data.duration }}</div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TspScheduleTooltipTemplate',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    startDate: function () {
      return date.formatDate(this.data.start_date, 'DD/MM/YY')
    },
    finishDate: function () {
      return date.formatDate(this.data.finish_date, 'DD/MM/YY')
    }
  }
})
</script>
