<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn aria-label="Menu" dense flat icon="menu" round />

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
              v-if="!isTestColumnVisible"
              id="show"
              cssClass="e-info"
              style="margin-right: 12px"
              @click="show"
              >Show Call Off Column</q-btn
            >
            <q-btn
              v-if="isTestColumnVisible"
              id="hide"
              cssClass="e-info"
              @click="hide"
              >Hide Call Off Column</q-btn
            >
          </div>
        </div>

        <!-- Gantt -->
        <div class="row">
          <div class="col-12">
            <div class="max-grid-height">
              <ejs-gantt
                id="TspScheduleGantt"
                ref="gantt"
                :actionBegin="gantt().actionBegin"
                :actionComplete="gantt().actionComplete"
                :allowExcelExport="true"
                :allowFiltering="true"
                :allowReordering="true"
                :allowResizing="true"
                :allowRowDragAndDrop="false"
                :allowSelection="true"
                :allowSorting="true"
                baselineColor="#e9c46a"
                clipMode="EllipsisWithTooltip"
                :contextMenuClick="gantt().contextMenuClick"
                :contextMenuItems="ganttSettings.contextMenuItems"
                :contextMenuOpen="gantt().contextMenuOpen"
                :dateFormat="ganttSettings.dateFormat"
                :editSettings="ganttSettings.editSettings"
                :enableContextMenu="ganttSettings.enableContextMenu"
                :enableMultiTaskbar="false"
                :enablePersistence="false"
                :enableVirtualization="true"
                :excelQueryCellInfo="gantt().excelQueryCellInfo"
                :filterSettings="ganttSettings.filterSettings"
                :gridLines="ganttSettings.gridLines"
                :height="ganttHeight"
                :highlightWeekends="false"
                :includeWeekend="true"
                :labelSettings="ganttSettings.labelSettings"
                :load="load"
                :projectEndDate="ganttSettings.projectEndDate"
                :projectStartDate="ganttSettings.projectStartDate"
                :queryTaskbarInfo="gantt().queryTaskbarInfo"
                :readOnly="ganttSettings.readOnly"
                :renderBaseline="true"
                :resourceFields="ganttSettings.resourceFields"
                :resources="ganttSettings.resources"
                :rowDataBound="gantt().rowDataBoundGantt"
                :rowHeight="ganttSettings.rowHeight"
                :selectionSettings="ganttSettings.selectionSettings"
                :sortSettings="ganttSettings.sortSettings"
                :splitterSettings="ganttSettings.splitterSettings"
                :taskFields="ganttSettings.taskFields"
                :taskMode="ganttSettings.taskMode"
                :taskbarHeight="ganttSettings.taskbarHeight"
                :timelineSettings="ganttSettings.timelineSettings"
                :toolbar="ganttSettings.toolbar"
                :tooltipSettings="ganttSettings.tooltipSettings"
                :treeColumnIndex="1"
              >
                <e-columns>
                  <e-column
                    :allowEditing="false"
                    field="id"
                    headerText="ID"
                    :isPrimaryKey="true"
                    :visible="true"
                    width="90"
                  />
                  <e-column
                    :allowEditing="false"
                    field="calloff_id"
                    headerText="Call Off #"
                    textAlign="Left"
                    type="number"
                    :validationRules="ganttSettings.validation.calloff_id"
                    :visible="true"
                    width="120"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="project_name"
                    headerText="Project Name"
                    type="string"
                    :visible="false"
                    width="90"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="project_scope"
                    headerText="Project Scope"
                    type="string"
                    :visible="false"
                    width="90"
                  />
                  <e-column
                    field="task_name"
                    headerText="Task Name"
                    type="string"
                    :validationRules="ganttSettings.validation.taskName"
                    width="200"
                  />
                  <e-column
                    defaultValue="1"
                    field="duration"
                    headerText="Duration"
                    type="number"
                    :visible="false"
                  />
                  <e-column
                    :edit="ganttSettings.dateParams"
                    editType="datepickeredit"
                    field="start_date"
                    :format="ganttSettings.formatDateOptions"
                    headerText="Start Date"
                    type="date"
                    width="100"
                  />
                  <e-column
                    :edit="ganttSettings.dateParams"
                    editType="datepickeredit"
                    field="finish_date"
                    :format="ganttSettings.formatDateOptions"
                    headerText="Finish Date"
                    type="date"
                    width="100"
                  />
                  <e-column
                    field="tags"
                    headerText="Tags"
                    type="string"
                    :visible="false"
                    width="100"
                  />
                  <e-column
                    field="resources"
                    headerText="TSP Name"
                    width="180"
                  />
                  <e-column
                    :edit="ganttSettings.dateParams"
                    editType="datepickeredit"
                    field="baseline_start"
                    :format="ganttSettings.formatDateOptions"
                    headerText="Baseline Start"
                    type="date"
                    :visible="false"
                    width="100"
                  />
                  <e-column
                    :edit="ganttSettings.dateParams"
                    editType="datepickeredit"
                    field="baseline_finish"
                    :format="ganttSettings.formatDateOptions"
                    headerText="Baseline Finish"
                    type="date"
                    :visible="false"
                    width="100"
                  />
                  <e-column
                    field="dependency"
                    headerText="Predecessors"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :defaultValue="false"
                    displayAsCheckBox="true"
                    editType="booleanedit"
                    field="shift_id"
                    headerText="Night Shift?"
                    type="boolean"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="category_id"
                    headerText="Category ID"
                    :showInColumnChooser="false"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="category"
                    headerText="Category"
                    :visible="true"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="discipline_id"
                    headerText="Discipline ID"
                    :showInColumnChooser="false"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="discipline"
                    headerText="Discipline"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="role_id"
                    headerText="Role ID"
                    :showInColumnChooser="false"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="role"
                    headerText="Role"
                    :visible="false"
                  />
                  <e-column
                    field="parent_id"
                    headerText="Parent ID"
                    type="number"
                    :visible="false"
                  />
                  <e-column
                    defaultValue="1"
                    field="quantity"
                    headerText="Quantity"
                    type="number"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="client"
                    headerText="Client"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="created_by"
                    headerText="CallOff Created By"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="calloff_demand_status"
                    headerText="Demand Status"
                    :visible="true"
                  />
                  <e-column
                    :defaultValue="false"
                    displayAsCheckBox="true"
                    editType="booleanedit"
                    field="is_calloff"
                    headerText="Is CallOff?"
                    type="boolean"
                    :visible="false"
                  />
                  <e-column
                    field="comments"
                    headerText="Comments"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="location"
                    headerText="Project Location"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="wbs"
                    headerText="WBS"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="field_location"
                    headerText="Field Location"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="allocation_type"
                    headerText="Allocation Type"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="resource_location"
                    headerText="TSP Country"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="phase"
                    headerText="Project Phase"
                    type="string"
                    :visible="true"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="resource_department"
                    headerText="Resource Department"
                    type="string"
                    :visible="false"
                  />
                  <e-column
                    :allowEditing="false"
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field="sep_id"
                    headerText="SEP#"
                    type="number"
                    :visible="false"
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
import { defineAsyncComponent } from 'vue'
import { date } from 'quasar'
import GanttState from 'src/mixins/GanttState'
import scheduler from '../mixins/TspSchedule/scheduler'

export default {
  name: 'TspSchedule',
  mixins: [GanttState, scheduler],
  data() {
    return {
      action: 'create',
      searchForm: {},
      openEventModal: false,
      modalData: {},
      openBatchEditModal: false,
      batchEditData: [],
      openDeleteModal: false,
      deleteData: [],
      ganttSettings: {
        taskMode: 'Auto',
        taskFields: {
          id: 'id',
          name: 'task_name',
          startDate: 'start_date',
          endDate: 'finish_date',
          duration: 'duration',
          dependency: 'dependency',
          parentID: 'parent_id',
          resourceInfo: 'resources',
          baselineStartDate: 'baseline_start',
          baselineEndDate: 'baseline_finish',
          manual: 'is_manual',
          notes: 'comments',
        },
        rowHeight: 30,
        taskbarHeight: 29,
        resourceFields: {
          id: 'resourceId',
          name: 'name',
        },
        tooltipSettings: {
          showTooltip: true,
          taskbar: 'tooltipTemplate',
        },
        selectionSettings: {
          type: 'Multiple',
          mode: 'Row',
        },
        sortSettings: {
          columns: [{ field: 'start_date', direction: 'Ascending' }],
        },
        filterSettings: {
          type: 'Excel',
          hierarchyMode: 'Parent',
        },
        gridLines: 'Horizontal',
        resources: [],
        timelineSettings: {
          topTier: {
            format: 'dd/MM/yy',
            unit: 'Week',
          },
          bottomTier: {
            unit: 'Day',
          },
          timelineUnitSize: 20,
        },
        labelSettings: {
          rightLabel: 'resources', // eslint-disable-line
          taskLabel: '${taskData.project_scope}', // eslint-disable-line
        },
        dateFormat: 'dd/MM/yy',
        editSettings: {
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: 'Auto',
          allowTaskbarEditing: true,
          showDeleteConfirmDialog: false,
          newRowPosition: 'Child',
        },
        validation: {
          calloff_id: { required: true, number: true },
          taskName: { required: true },
        },
        dateParams: { type: 'date', format: 'dd/MM/yy' },
        enableContextMenu: true,
        contextMenuItems: [
          {
            text: 'Task Information',
            target: '.e-content',
            id: 'taskInformation',
            iconCss: 'e-icons e-edit',
          },
          {
            text: 'Batch Edit',
            target: '.e-content',
            id: 'batchEdit',
            iconCss: 'e-icons e-user-defined',
          },
          {
            text: 'Delete Task',
            target: '.e-content',
            id: 'delete',
            iconCss: 'e-icons e-delete',
          },
          'AutoFitAll',
          'AutoFit',
          'Save',
          'Cancel',
          'DeleteDependency',
          {
            text: 'Add Task',
            target: '.e-content',
            id: 'newAdd',
            iconCss: 'e-icons new',
            items: [
              {
                text: 'Below',
                target: '.e-content',
                id: 'addBelow',
                iconCss: 'e-icons add-below',
              },
              {
                text: 'Copy',
                target: '.e-content',
                id: 'addCopy',
                iconCss: 'e-icons add-copy',
              },
              {
                text: 'Child',
                target: '.e-content',
                id: 'addChild',
                iconCss: 'e-icons add-child',
              },
            ],
          },
          { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
          { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
          { text: 'Hide Column', target: '.e-gridheader', id: 'hidecols' },
          {
            text: 'Add TimeOff',
            target: '.e-content',
            id: 'timeoff',
            iconCss: 'e-icons time-off',
          },
          {
            text: 'Add Quarantine',
            target: '.e-content',
            id: 'quarantine',
            iconCss: 'e-icons quarantine',
          },
          {
            text: 'Validate Tasks',
            target: '.e-content',
            id: 'validate',
            iconCss: 'e-icons validate',
          },
          {
            text: 'Save Call Off',
            target: '.e-content',
            id: 'resaveCalloff',
            iconCss: 'e-icons resavecalloff',
          },
        ],
        projectStartDate: new Date(),
        projectEndDate: new Date(2023, 11, 31),
        splitterSettings: {
          position: '50%',
        },
        toolbar: [
          'ZoomIn',
          'ZoomOut',
          'ZoomToFit',
          'ExpandAll',
          'CollapseAll',
          'PrevTimeSpan',
          'NextTimeSpan',
          'Indent',
          'Outdent',
        ],
      },
      ganttHeight: '450px',
      isTestColumnVisible: true,
    }
  },
  methods: {
    show: function () {
      var ganttChart =
        document.getElementById('TspScheduleGantt').ej2_instances[0]
      ganttChart.showColumn(['Call Off #'])
      ganttChart.columns.filter(
        (item) => item.headerText === 'Call Off #'
      )[0].visible = true
      ganttChart.treeGrid.refreshColumns()
      this.isTestColumnVisible = true
    },
    hide: function () {
      var ganttChart =
        document.getElementById('TspScheduleGantt').ej2_instances[0]
      ganttChart.hideColumn(['Call Off #'])
      ganttChart.columns.filter(
        (item) => item.headerText === 'Call Off #'
      )[0].visible = false
      ganttChart.treeGrid.refreshColumns()
      this.isTestColumnVisible = false
    },
    load: function () {
      const ganttObj =
        document.getElementById('TspScheduleGantt').ej2_instances[0]
      ganttObj.timelineSettings.timelineUnitSize = 20
      ganttObj.treeGrid.filterSettings.type = 'Excel'
      this.isTestColumnVisible = ganttObj.columns.filter(
        (item) => item.headerText === 'Call Off #'
      )[0].visible
    },
    async onFilteredData(args) {
      console.time('--gantt-process')

      const ganttObj =
        document.getElementById('TspScheduleGantt').ej2_instances[0]
      ganttObj.dataSource = [...args]
      ganttObj.refresh()
      console.timeEnd('--gantt-process')
    },
  },
  computed: {},
  created() {
    this.ganttSettings.projectStartDate = new Date()
    this.ganttSettings.projectEndDate = date.addToDate(
      this.ganttSettings.projectStartDate,
      { days: 60 }
    )
    this.ganttHeight = this.$q.screen.height - 270 + 'px'
  },
  components: {
    ScheduleFilter: defineAsyncComponent(() =>
      import('src/components/Filters/ScheduleFilter.vue')
    ),
  },
}
</script>

<style lang="scss"></style>
