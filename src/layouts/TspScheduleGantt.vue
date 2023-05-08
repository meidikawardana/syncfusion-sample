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
        <div class="row">
          <div class="col-12">
            <schedule-filter @done="onFilteredData" />
          </div>
        </div>

        <div class="row" style="margin-bottom: 10px">
          <div class="col-12">
            <q-btn
              id="show"
              cssClass="e-info"
              @click="show"
              style="margin-right: 12px"
              v-if="!isTestColumnVisible"
              >Show Call Off Column</q-btn
            >
            <q-btn
              id="hide"
              cssClass="e-info"
              @click="hide"
              v-if="isTestColumnVisible"
              >Hide Call Off Column</q-btn
            >
          </div>
        </div>

        <!-- Gantt -->
        <div class="row">
          <div class="col-12">
            <div class="max-grid-height">
              <ejs-gantt
                ref="gantt"
                id="TspScheduleGantt"
                :height="ganttHeight"
                :enablePersistence="false"
                :enableVirtualization="true"
                :dataSource="data"
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
                :highlightWeekends="false"
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
                :load="load"
                :dataBound="dataBoundGantt"
                :queryTaskbarInfo="gantt().queryTaskbarInfo"
                :contextMenuItems="ganttSettings.contextMenuItems"
                :contextMenuClick="gantt().contextMenuClick"
                :contextMenuOpen="gantt().contextMenuOpen"
                :allowExcelExport="true"
                :actionBegin="gantt().actionBegin"
                :actionComplete="gantt().actionComplete"
                :rowDataBound="gantt().rowDataBoundGantt"
                :excelQueryCellInfo="gantt().excelQueryCellInfo"
                :taskbarTemplate="'taskbarTemplate'"
                :parentTaskbarTemplate="'parentTaskbarTemplate'"
              >
                <template
                  v-slot:parentTaskbarTemplate
                >
                  <div class="e-gantt-child-taskbar e-custom-parent" style="height:100%;border-radius:5px;">
                    <span class="e-task-label"
                      style="position:absolute;top:5px;font-size:12px;text-overflow:ellipsis;height:90%;overflow:hidden;width:100%;background-color:blue;"></span>
                  </div>
                </template>
                <template v-slot:taskbarTemplate='{data}'>
                  <tsp-schedule-taskbar-template :label='taskbarTemplateLabel(data)' />
                </template>
                <template v-slot:tooltipTemplate='{data}'>
                  <tsp-schedule-tooltip-template
                    :data='data'
                  />
                </template>
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineAsyncComponent, defineComponent } from "vue";
import { date } from "quasar";
import GanttState from "src/mixins/GanttState";
import scheduler from "../mixins/TspSchedule/scheduler";

export default defineComponent({
  name: "TspSchedule",
  mixins: [GanttState, scheduler],
  data() {
    return {
      action: "create",
      searchForm: {},
      openEventModal: false,
      modalData: {},
      openBatchEditModal: false,
      batchEditData: [],
      openDeleteModal: false,
      deleteData: [],
      data: [],
      ganttSettings: {
        taskMode: "Auto",
        taskFields: {
          id: "id",
          name: "task_name",
          startDate: "start_date",
          endDate: "finish_date",
          duration: "duration",
          dependency: "dependency",
          parentID: "parent_id",
          resourceInfo: "resources",
          baselineStartDate: "baseline_start",
          baselineEndDate: "baseline_finish",
          manual: "is_manual",
          notes: "comments",
        },
        rowHeight: 30,
        taskbarHeight: 29,
        resourceFields: {
          id: "resourceId",
          name: "name",
        },
        tooltipSettings: {
          showTooltip: true,
          taskbar: "tooltipTemplate",
        },
        selectionSettings: {
          type: "Multiple",
          mode: "Row",
        },
        sortSettings: {
          columns: [{ field: "start_date", direction: "Ascending" }],
        },
        filterSettings: {
          type: "Excel",
          hierarchyMode: "Parent",
        },
        gridLines: "Horizontal",
        resources: [],
        timelineSettings: {
          topTier: {
            format: "dd/MM/yy",
            unit: "Week",
          },
          bottomTier: {
            unit: "Day",
          },
          timelineUnitSize: 20,
        },
        labelSettings: {
          rightLabel: "resources", // eslint-disable-line
          taskLabel: "${taskData.project_scope}", // eslint-disable-line
        },
        dateFormat: "dd/MM/yy",
        editSettings: {
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: "Auto",
          allowTaskbarEditing: true,
          showDeleteConfirmDialog: false,
          newRowPosition: "Child",
        },
        validation: {
          calloff_id: { required: true, number: true },
          taskName: { required: true },
        },
        dateParams: { type: "date", format: "dd/MM/yy" },
        enableContextMenu: true,
        contextMenuItems: [
          {
            text: "Task Information",
            target: ".e-content",
            id: "taskInformation",
            iconCss: "e-icons e-edit",
          },
          {
            text: "Batch Edit",
            target: ".e-content",
            id: "batchEdit",
            iconCss: "e-icons e-user-defined",
          },
          {
            text: "Delete Task",
            target: ".e-content",
            id: "delete",
            iconCss: "e-icons e-delete",
          },
          "AutoFitAll",
          "AutoFit",
          "Save",
          "Cancel",
          "DeleteDependency",
          {
            text: "Add Task",
            target: ".e-content",
            id: "newAdd",
            iconCss: "e-icons new",
            items: [
              {
                text: "Below",
                target: ".e-content",
                id: "addBelow",
                iconCss: "e-icons add-below",
              },
              {
                text: "Copy",
                target: ".e-content",
                id: "addCopy",
                iconCss: "e-icons add-copy",
              },
              {
                text: "Child",
                target: ".e-content",
                id: "addChild",
                iconCss: "e-icons add-child",
              },
            ],
          },
          { text: "Collapse the Row", target: ".e-content", id: "collapserow" },
          { text: "Expand the Row", target: ".e-content", id: "expandrow" },
          { text: "Hide Column", target: ".e-gridheader", id: "hidecols" },
          {
            text: "Add TimeOff",
            target: ".e-content",
            id: "timeoff",
            iconCss: "e-icons time-off",
          },
          {
            text: "Add Quarantine",
            target: ".e-content",
            id: "quarantine",
            iconCss: "e-icons quarantine",
          },
          {
            text: "Validate Tasks",
            target: ".e-content",
            id: "validate",
            iconCss: "e-icons validate",
          },
          // { text: 'Save Call Off', target: '.e-content', id: 'resavecalloff', iconCss: 'e-icons resavecalloff' }
        ],
        projectStartDate: new Date(),
        projectEndDate: new Date(2023, 11, 31),
        splitterSettings: {
          position: "50%",
        },
        toolbar: [
          "ZoomIn",
          "ZoomOut",
          "ZoomToFit",
          "ExpandAll",
          "CollapseAll",
          "PrevTimeSpan",
          "NextTimeSpan",
          "Indent",
          "Outdent",
        ],
      },
      ganttHeight: "450px",
      isTestColumnVisible: true,
    };
  },
  methods: {
    dataBoundGantt: function () {},
    show: function (e) {
      var ganttChart =
        document.getElementById("TspScheduleGantt").ej2_instances[0];
      ganttChart.showColumn(["calloff_id"]);
      ganttChart.columns.filter(
        (item) => item.headerText === "Call Off #"
      )[0].visible = true;
      ganttChart.treeGrid.refreshColumns();
      this.isTestColumnVisible = true;
    },
    hide: function (e) {
      var ganttChart =
        document.getElementById("TspScheduleGantt").ej2_instances[0];
      ganttChart.hideColumn(["calloff_id"]);
      ganttChart.columns.filter(
        (item) => item.headerText === "Call Off #"
      )[0].visible = false;
      console.log("--visib", ganttChart.columns);
      ganttChart.treeGrid.refreshColumns();
      console.log(
        "--the-model",
        window.localStorage.getItem("gantt" + "TspScheduleGantt")
      );
      this.isTestColumnVisible = false;
    },
    load: function () {
      const ganttObj =
        document.getElementById("TspScheduleGantt").ej2_instances[0];
      ganttObj.timelineSettings.timelineUnitSize = 20;
      ganttObj.treeGrid.filterSettings.type = "Excel";

      this.isTestColumnVisible = ganttObj.columns.filter(
        (item) => item.headerText === "Call Off #"
      )[0].visible;
    },
    taskbarTemplateLabel(data) {
      return 'Temp Label'
    },
  },
  computed: {},
  created() {
    this.ganttSettings.projectStartDate = new Date();
    this.ganttSettings.projectEndDate = date.addToDate(
      this.ganttSettings.projectStartDate,
      { days: 60 }
    );
    this.ganttHeight = this.$q.screen.height - 270 + "px";
  },
  components: {
    ScheduleFilter: defineAsyncComponent(() => import("src/components/Filters/ScheduleFilter.vue")),
    TspScheduleTaskbarTemplate: defineAsyncComponent(() => import("src/components/Templates/TspScheduleTaskbarTemplate.vue")),
    TspScheduleTooltipTemplate: defineAsyncComponent(() => import("src/components/Templates/TspScheduleTooltipTemplate.vue")),
  },
});
</script>

<style lang="scss"></style>
