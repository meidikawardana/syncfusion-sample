<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" />

        <q-toolbar-title> Gantt Sample </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page padding>
        <my-equipment  />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { defineComponent } from 'vue'
import EquipmentField from 'src/components/Form/EquipmentField.vue'

export default defineComponent({
  name: 'Demo',
  components: {
    'my-equipment': EquipmentField,
  },
})
</script>
