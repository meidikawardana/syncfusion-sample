<template>
  <div class='e-gantt-child-taskbar' style='height:20px;border-radius:6px;'>
    <span class='e-task-label' style='font-size:12px;text-overflow:ellipsis;overflow:hidden;position:absolute;top:3px;'>{{ label }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'TspScheduleTaskbarTemplate',
  props: {
    label: {
      type: String
    }
  }
})
</script>
