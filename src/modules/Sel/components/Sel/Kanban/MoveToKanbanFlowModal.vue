<template>
  <q-card style='max-width: 400px;width:400px;'>

    <q-card-section id='kanban-modal-title' class='bg-primary text-white text-h6'>Select Flow</q-card-section>

    <q-card-section class='q-gutter-md'>
      <my-select id='board_select' v-model:value='board_id' :error='v$.board_id.$error' label='Board' :options='boards' />
    </q-card-section>

    <q-card-actions>
      <q-space />
      <my-save-button id='kanban-modal-save-btn' @click='onSave' />
    </q-card-actions>

  </q-card>
</template>

<script lang="ts">

import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import MySaveButton from 'src/modules/Application/components/Buttons/SaveButton.vue'
import { mapState } from 'pinia'
import { useAuthStore } from 'src/stores/config/Auth'
import { IKanbanCard } from 'src/modules/Sel/models/KanbanCard/KanbanCardInterface'
import { defineComponent } from 'vue'
import { useKanbanBoardStore } from 'src/stores/config/KanbanBoard'

export default defineComponent({
  components: { MySaveButton },
  props: {
    cardId: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      board_id: null,
      open: false
    }
  },
  validations() {
    return {
      board_id: {
        required
      },
    }
  },
  computed: {
    ...mapState(useAuthStore, ['user']),
    ...mapState(useKanbanBoardStore, ['boards'])
  },
  methods: {
    onSave() {
      this.v$.board_id.$touch()
      if (this.v$.board_id.$invalid) return

      const startingStationId = this.boards.find(el => el.id === this.board_id).starting_station_id
    },
  }
})
</script>

<style lang='scss'>
</style>
