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
        <!-- <schedule-filter @done="onFilteredData" /> -->
        <!-- <my-toolbar>
        <my-toolbar-button label="Summary" @click="$router.push({ path: '/tsp_dashboard' })" icon="o_view_in_ar"/>
        <schedule-timeline-button grid-id="TspScheduleGantt"/>
        <my-clear-filters-button grid-id="TspScheduleGantt" type="gantt"/>
        <my-export-button grid-id="TspScheduleGantt"/>
        <q-space/>
        <my-gantt-layout grid-id="TspScheduleGantt"/>
        <my-gantt-column-chooser grid-id="TspScheduleGantt"/>
        <my-grid-search grid-id="TspScheduleGantt" type="gantt"/>
      </my-toolbar> -->

        <!-- Gantt -->
        <div class="row">
          <div class="col-12">
            <div class="max-grid-height">
              <ejs-gantt
                ref="gantt"
                id="virtualscroll"
                :dataSource="data"
                :taskFields="taskFields"
                :allowSelection="true"
                :enableVirtualization="true"
                :labelSettings="labelSettings"
                :height="height"
                :treeColumnIndex="1"
                :highlightWeekends="true"
                :columns="columns"
                :splitterSettings="splitterSettings"
              >
              </ejs-gantt>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Vue from "vue";
import {
  GanttPlugin,
  Selection,
  VirtualScroll,
} from "@syncfusion/ej2-vue-gantt";
import { virtualData } from "./data-source";
Vue.use(GanttPlugin);
export default Vue.extend({
  data: function () {
    return {
      data: virtualData,
      taskFields: {
        id: "TaskID",
        name: "TaskName",
        startDate: "StartDate",
        endDate: "EndDate",
        duration: "Duration",
        progress: "Progress",
        parentID: "parentID",
      },
      columns: [
        { field: "TaskID" },
        { field: "TaskName" },
        { field: "StartDate" },
        { field: "Duration" },
        { field: "Progress" },
      ],
      height: "450px",
      labelSettings: {
        taskLabel: "Progress",
      },
      splitterSettings: {
        columnIndex: 2,
      },
    };
  },
  provide: {
    gantt: [Selection, VirtualScroll],
  },
});
</script>

<style></style>
