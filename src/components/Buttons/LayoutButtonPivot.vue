<template>
  <div>
    <q-btn
      color="primary"
      dense
      flat
      icon="sym_o_view_column"
      label="Layouts"
      size="md"
      @click="btnOpenLayoutModal"
    />

    <q-dialog v-model="openLayoutModal">
      <pivot-layout-modal :gridId="gridId" @close="openLayoutModal = false" />
    </q-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  name: "pivot-layout-button",
  data() {
    return {
      openLayoutModal: false,
    };
  },

  methods: {
    btnOpenLayoutModal: function () {
      this.openLayoutModal = true;
    },
  },
  props: ["gridId"],
  components: {
    PivotLayoutModal: defineAsyncComponent(() =>
      import("src/components/Buttons/Pivot/PivotLayoutModal.vue")
    ),
  },
};
</script>
