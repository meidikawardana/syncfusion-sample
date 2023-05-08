<template>
  <div class='e-gantt-parent-taskbar' style='height:20px;border-radius:0px;'>
    <span class='e-task-label' style='font-size:12px;text-overflow:ellipsis;overflow:hidden;position:absolute;top:1px;'>{{ label }}</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TspScheduleParentTaskbarTemplate',
  props: {
    data: {
      type: Object
    }
  },
  computed: {
    label: function () {
      if (this.data.is_calloff) {
        return '#' + this.data.calloff_id + ' - ' + this.data.project_name + ' - ' + this.data.project_scope
      }
      else {
        return this.data.task_name
      }
    }
  }
})
</script>
