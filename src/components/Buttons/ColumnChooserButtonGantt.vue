<template>
  <div>
    <q-btn
      flat
      color="primary"
      icon="o_grid_view"
      size="md"
      label="Columns"
      @click="openColumnChooserModal = true"
    />
    <q-dialog v-model="openColumnChooserModal">
      <column-chooser-modal
        :gridId="gridId"
        @close="openColumnChooserModal = false"
      />
    </q-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
export default {
  data() {
    return {
      openColumnChooserModal: false,
    };
  },
  props: ["gridId"],
  components: {
    "column-chooser-modal": defineAsyncComponent(() =>
      import("components/Buttons/Gantt/ScheduleColumnChooserModal.vue")
    ),
  },
};
</script>
