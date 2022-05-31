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
        <!-- Gantt -->
        <div class="row">
          <div class="col-12">
            <div class="max-grid-height">
              <ejs-gantt
                ref="gantt"
                id="TspScheduleGantt"
                :key="ganttKey"
                :height="ganttHeight"
                :enableVirtualization="true"
                :dataSource="virtualData"
                :taskFields="ganttSettings.taskFields"
                :timelineSettings="ganttSettings.timelineSettings"
                :readOnly="ganttSettings.readOnly"
                :editSettings="ganttSettings.editSettings"
                :sortSettings="ganttSettings.sortSettings"
                :taskMode="ganttSettings.taskMode"
                :toolbar="ganttSettings.toolbar"
                :dateFormat="ganttSettings.dateFormat"
                :resourceFields="ganttSettings.resourceFields"
                :resources="ganttSettings.resources"
                :selectionSettings="ganttSettings.selectionSettings"
                :labelSettings="ganttSettings.labelSettings"
                :gridLines="ganttSettings.gridLines"
                :tooltipSettings="ganttSettings.tooltipSettings"
                :filterSettings="ganttSettings.filterSettings"
                :renderBaseline="true"
                baselineColor="#e9c46a"
                :projectStartDate="ganttSettings.projectStartDate"
                :projectEndDate="ganttSettings.projectEndDate"
                clipMode="EllipsisWithTooltip"
                :highlightWeekends="true"
                :enableMultiTaskbar="false"
                :allowFiltering="true"
                :allowReordering="true"
                :allowSorting="true"
                :allowResizing="true"
                :allowSelection="true"
                :includeWeekend="true"
                :treeColumnIndex="1"
                :enableContextMenu="ganttSettings.enableContextMenu"
                :allowRowDragAndDrop="false"
                :taskbarHeight="ganttSettings.taskbarHeight"
                :rowHeight="ganttSettings.rowHeight"
                :splitterSettings="ganttSettings.splitterSettings"
                :load="gantt().load"
                :queryTaskbarInfo="gantt().queryTaskbarInfo"
                :contextMenuItems="ganttSettings.contextMenuItems"
                :contextMenuClick="gantt().contextMenuClick"
                :contextMenuOpen="gantt().contextMenuOpen"
                :allowExcelExport="true"
                :actionBegin="gantt().actionBegin"
                :actionComplete="gantt().actionComplete"
                :rowDataBound="gantt().rowDataBoundGantt"
                :excelQueryCellInfo="gantt().excelQueryCellInfo"
              >
                <e-columns>
                  <e-column
                    field="id"
                    headerText="ID"
                    :isPrimaryKey="true"
                    :allowEditing="false"
                    width="90"
                    :visible="true"
                  />
                  <e-column
                    field="calloff_id"
                    headerText="Call Off #"
                    type="number"
                    textAlign="Left"
                    width="120"
                    :allowEditing="false"
                    :validationRules="ganttSettings.validation.calloff_id"
                  />
                  <e-column
                    field="project_name"
                    headerText="Project Name"
                    type="string"
                    width="90"
                    :visible="false"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                  />
                  <e-column
                    field="project_scope"
                    headerText="Project Scope"
                    type="string"
                    width="90"
                    :visible="false"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                  />
                  <e-column
                    field="task_name"
                    headerText="Task Name"
                    type="string"
                    width="200"
                    :validationRules="ganttSettings.validation.taskName"
                  />
                  <e-column
                    field="duration"
                    headerText="Duration"
                    type="number"
                    defaultValue="1"
                    :visible="false"
                  />
                  <e-column
                    field="start_date"
                    headerText="Start Date"
                    type="date"
                    width="100"
                    editType="datepickeredit"
                    :edit="ganttSettings.dateParams"
                    :format="ganttSettings.formatDateOptions"
                  />
                  <e-column
                    field="finish_date"
                    headerText="Finish Date"
                    type="date"
                    width="100"
                    editType="datepickeredit"
                    :edit="ganttSettings.dateParams"
                    :format="ganttSettings.formatDateOptions"
                  />
                  <e-column
                    field="tags"
                    headerText="Tags"
                    type="string"
                    width="100"
                    :visible="false"
                  />
                  <e-column
                    field="resources"
                    headerText="TSP Name"
                    width="180"
                  />
                  <e-column
                    field="baseline_start"
                    headerText="Baseline Start"
                    type="date"
                    width="100"
                    editType="datepickeredit"
                    :edit="ganttSettings.dateParams"
                    :format="ganttSettings.formatDateOptions"
                    :visible="false"
                  />
                  <e-column
                    field="baseline_finish"
                    headerText="Baseline Finish"
                    type="date"
                    width="100"
                    editType="datepickeredit"
                    :edit="ganttSettings.dateParams"
                    :format="ganttSettings.formatDateOptions"
                    :visible="false"
                  />
                  <e-column
                    field="dependency"
                    headerText="Predecessors"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    field="shift_id"
                    headerText="Night Shift?"
                    type="boolean"
                    editType="booleanedit"
                    displayAsCheckBox="true"
                    :defaultValue="false"
                    :visible="false"
                  />
                  <e-column
                    field="category_id"
                    headerText="Category ID"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :visible="false"
                    :showInColumnChooser="false"
                  />
                  <e-column
                    field="category"
                    headerText="Category"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :visible="true"
                  />
                  <e-column
                    field="discipline_id"
                    headerText="Discipline ID"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :visible="false"
                    :showInColumnChooser="false"
                  />
                  <e-column
                    field="discipline"
                    headerText="Discipline"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :visible="false"
                  />
                  <e-column
                    field="role_id"
                    headerText="Role ID"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :visible="false"
                    :showInColumnChooser="false"
                  />
                  <e-column
                    field="role"
                    headerText="Role"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :visible="false"
                  />
                  <e-column
                    field="parent_id"
                    headerText="Parent ID"
                    type="number"
                    :visible="false"
                  />
                  <e-column
                    field="quantity"
                    headerText="Quantity"
                    type="number"
                    defaultValue="1"
                    :visible="false"
                  />
                  <e-column
                    field="client"
                    headerText="Client"
                    type="string"
                    :visible="false"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                  />
                  <e-column
                    field="created_by"
                    headerText="CallOff Created By"
                    type="string"
                    :visible="false"
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                  />
                  <e-column
                    field="calloff_demand_status"
                    headerText="Demand Status"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                    :visible="true"
                  />
                  <e-column
                    field="is_calloff"
                    headerText="Is CallOff?"
                    type="boolean"
                    editType="booleanedit"
                    displayAsCheckBox="true"
                    :defaultValue="false"
                    :visible="false"
                  />
                  <e-column
                    field="comments"
                    headerText="Comments"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    field="location"
                    headerText="Project Location"
                    type="string"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="wbs"
                    headerText="WBS"
                    type="string"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="field_location"
                    headerText="Field Location"
                    type="string"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="allocation_type"
                    headerText="Allocation Type"
                    type="string"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="resource_location"
                    headerText="TSP Country"
                    type="string"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="phase"
                    headerText="Project Phase"
                    type="string"
                    :visible="true"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="resource_department"
                    headerText="Resource Department"
                    type="string"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                  <e-column
                    field="sep_id"
                    headerText="SEP#"
                    type="number"
                    :visible="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    :allowEditing="false"
                  />
                </e-columns>
              </ejs-gantt>
            </div>
          </div>
        </div>
        <q-dialog v-model="openEventModal">
          <task-modal
            :data="modalData"
            :action="action"
            @close="openEventModal = false"
          />
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import scheduler from "./scheduler";
import {
  GanttPlugin,
  ContextMenu,
  Edit,
  Filter,
  Sort,
  Selection,
  ExcelExport,
  Reorder,
  Resize,
  Toolbar,
  VirtualScroll,
} from "@syncfusion/ej2-vue-gantt";

import Vue from "vue";
import { virtualData } from "./data-source";

Vue.use(GanttPlugin);

export default {
  name: "technical_services_schedule",
  mixins: [toolbar, scheduler],
  data() {
    return {
      virtualData: virtualData,
      action: "create",
      searchForm: {},
      openEventModal: false,
      modalData: {},
      openBatchEditModal: false,
      batchEditData: [],
      openDeleteModal: false,
      deleteData: [],
      ganttHeight: "450px",
    };
  },
  provide: {
    gantt: [
      ContextMenu,
      Edit,
      Filter,
      Sort,
      Selection,
      ExcelExport,
      Reorder,
      Resize,
      Toolbar,
      VirtualScroll,
    ],
  },
  methods: {},
  computed: {},
  created() {
    this.ganttSettings.projectStartDate = new Date();
    this.ganttSettings.projectEndDate = date.addToDate(
      this.ganttSettings.projectStartDate,
      { days: 60 }
    );
    this.ganttHeight = this.$q.screen.height - 270 + "px";
  },
  components: {},
};
</script>

<style lang="scss"></style>
