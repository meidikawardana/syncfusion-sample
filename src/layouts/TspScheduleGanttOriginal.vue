<template>
      <q-page padding>
            <schedule-filter :isGanttLoading='isGanttLoading' @done='onFilteredData' />
        <!-- Gantt -->
        <div class='row'>
          <div class='col-12' style='position: relative;'>
              <my-toolbar>
                <my-toolbar-button icon='o_view_in_ar' label='Summary' @click="$router.push({ path: '/tsp_dashboard' })" />
                <schedule-timeline-button grid-id='TspScheduleGantt' />
                <my-clear-filters-button grid-id='TspScheduleGantt' type='gantt' />
                <my-export-button grid-id='TspScheduleGantt' />
                <q-space />
                <my-gantt-layout grid-id='TspScheduleGantt' />
                <my-gantt-column-chooser grid-id='TspScheduleGantt' />
                <my-grid-search grid-id='TspScheduleGantt' type='gantt' />
              </my-toolbar>
              <ejs-gantt
                id='TspScheduleGantt'
                ref='gantt'
                :actionBegin='actionBegin'
                :actionComplete='actionComplete'
                :allowExcelExport='true'
                :allowFiltering='true'
                :allowReordering='true'
                :allowResizing='true'
                :allowRowDragAndDrop='true'
                :allowSelection='true'
                :allowSorting='true'
                baselineColor='#e9c46a'
                clipMode='EllipsisWithTooltip'
                :contextMenuClick='contextMenuClick'
                :contextMenuItems='ganttSettings.contextMenuItems'
                :contextMenuOpen='contextMenuOpen'
                :dateFormat='ganttSettings.dateFormat'
                :editSettings='ganttSettings.editSettings'
                :enableContextMenu='ganttSettings.enableContextMenu'
                :enableMultiTaskbar='false'
                :enablePersistence='false'
                :enableVirtualization='true'
                :excelQueryCellInfo='excelQueryCellInfo'
                :filterSettings='ganttSettings.filterSettings'
                :gridLines='ganttSettings.gridLines'
                :height='height'
                :highlightWeekends='false'
                :includeWeekend='true'
                :labelSettings='ganttSettings.labelSettings'
                :load='load'
                :parentTaskbarTemplate="'parentTaskbarTemplate'"
                :projectEndDate='ganttSettings.projectEndDate'
                :projectStartDate='ganttSettings.projectStartDate'
                :queryTaskbarInfo='queryTaskbarInfo'
                :readOnly='ganttSettings.readOnly'
                :renderBaseline='true'
                :resourceFields='ganttSettings.resourceFields'
                :resources='ganttSettings.resources'
                :rowDataBound='rowDataBoundGantt'
                :rowHeight='ganttSettings.rowHeight'
                :selectionSettings='ganttSettings.selectionSettings'
                :sortSettings='ganttSettings.sortSettings'
                :splitterSettings='ganttSettings.splitterSettings'
                :taskFields='ganttSettings.taskFields'
                :taskMode='ganttSettings.taskMode'
                :taskbarHeight='ganttSettings.taskbarHeight'
                :taskbarTemplate="'taskbarTemplate'"
                :timelineSettings='ganttSettings.timelineSettings'
                :toolbar='ganttSettings.toolbar'
                :tooltipSettings='ganttSettings.tooltipSettings'
                :treeColumnIndex='1'
              >
                <template v-slot:parentTaskbarTemplate='{data}'>
                  <tsp-schedule-parent-taskbar-template :data='data' />
                </template>
                <template v-slot:taskbarTemplate='{data}'>
                  <tsp-schedule-taskbar-template :label='taskbarTemplateLabel(data)' />
                </template>
                <template v-slot:tooltipTemplate='{data}'>
                  <tsp-schedule-tooltip-template
                    :data='data'
                    :disciplineName='tooltipDisciplineName(data)'
                    :roleName='tooltipRoleName(data)'
                  />
                </template>
                <e-columns>
                  <e-column
                    :allowEditing='false'
                    field='id'
                    headerText='ID'
                    :isPrimaryKey='true'
                    :visible='true'
                    width='90'
                  />
                  <e-column
                    :allowEditing='false'
                    field='calloff_id'
                    headerText='Call Off #'
                    textAlign='Left'
                    type='number'
                    :validationRules='ganttSettings.validation.calloff_id'
                    width='120'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='project_name'
                    headerText='Project Name'
                    type='string'
                    :visible='false'
                    width='90'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='project_scope'
                    headerText='Project Scope'
                    type='string'
                    :visible='false'
                    width='90'
                  />
                  <e-column
                    field='task_name'
                    headerText='Task Name'
                    type='string'
                    :validationRules='ganttSettings.validation.taskName'
                    width='200'
                  />
                  <e-column
                    defaultValue='1'
                    field='duration'
                    headerText='Duration'
                    type='number'
                    :visible='false'
                  />
                  <e-column
                    :edit='ganttSettings.dateParams'
                    editType='datepickeredit'
                    field='start_date'
                    :format='ganttSettings.formatDateOptions'
                    headerText='Start Date'
                    type='date'
                    width='100'
                  />
                  <e-column
                    :edit='ganttSettings.dateParams'
                    editType='datepickeredit'
                    field='finish_date'
                    :format='ganttSettings.formatDateOptions'
                    headerText='Finish Date'
                    type='date'
                    width='100'
                  />
                  <e-column field='fso_number' headerText='FSO#' type='string' :visible='false' width='100' />
                  <e-column
                    field='resources'
                    headerText='TSP Name'
                    width='180'
                  />
                  <e-column
                    :edit='ganttSettings.dateParams'
                    editType='datepickeredit'
                    field='baseline_start'
                    :format='ganttSettings.formatDateOptions'
                    headerText='Baseline Start'
                    type='date'
                    :visible='false'
                    width='100'
                  />
                  <e-column
                    :edit='ganttSettings.dateParams'
                    editType='datepickeredit'
                    field='baseline_finish'
                    :format='ganttSettings.formatDateOptions'
                    headerText='Baseline Finish'
                    type='date'
                    :visible='false'
                    width='100'
                  />
                  <e-column
                    field='dependency'
                    headerText='Predecessors'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :defaultValue='false'
                    displayAsCheckBox='true'
                    editType='booleanedit'
                    field='shift_id'
                    headerText='Night Shift?'
                    type='boolean'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='category_id'
                    headerText='Category ID'
                    :showInColumnChooser='false'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='category'
                    headerText='Category'
                    :visible='true'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='discipline_id'
                    headerText='Discipline ID'
                    :showInColumnChooser='false'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='discipline'
                    headerText='Discipline'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='role_id'
                    headerText='Role ID'
                    :showInColumnChooser='false'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='role'
                    headerText='Role'
                    :visible='false'
                  />
                  <e-column
                    field='parent_id'
                    headerText='Parent ID'
                    type='number'
                    :visible='false'
                  />
                  <e-column
                    defaultValue='1'
                    field='quantity'
                    headerText='Quantity'
                    type='number'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='client'
                    headerText='Client'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='requestor'
                    headerText='Requestor'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='created_by'
                    headerText='CallOff Created By'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='calloff_demand_status'
                    headerText='Demand Status'
                    :visible='true'
                  />
                  <e-column
                    :defaultValue='false'
                    displayAsCheckBox='true'
                    editType='booleanedit'
                    field='is_calloff'
                    headerText='Is CallOff?'
                    type='boolean'
                    :visible='false'
                  />
                  <e-column
                    field='comments'
                    headerText='Comments'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='location'
                    headerText='Project Location'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='wbs'
                    headerText='WBS'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='field_location'
                    headerText='Field Location'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='allocation_type'
                    headerText='Allocation Type'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='resource_location'
                    headerText='TSP Country'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='phase'
                    headerText='Project Phase'
                    type='string'
                    :visible='true'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='resource_department'
                    headerText='Resource Department'
                    type='string'
                    :visible='false'
                  />
                  <e-column
                    :allowEditing='false'
                    :customAttributes="{ class: 'disabledColumnCss' }"
                    field='sep_id'
                    headerText='SEP#'
                    type='number'
                    :visible='false'
                  />
                </e-columns>
              </ejs-gantt>
              <q-inner-loading
                color='primary'
                :showing='isGanttLoading'
              >
                <q-spinner size='0px'></q-spinner>
                <span class='label text-primary' style='font-size: 1.2em;'>Loading Gantt. Please wait...</span>
              </q-inner-loading>
          </div>
        </div>

    <gantt-task-modal
      ref='TaskModal'
      :action='action'
      :task-id='taskId'
      @deleted='onDeleted'
      @updated='onUpdated'
    />
    <gantt-batch-edit-modal
      ref='BatchEditModal'
      :task-ids='taskIds'
      @updated='onBatchUpdated'
    />

  </q-page>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { date, LocalStorage } from 'quasar'
import _map from 'lodash/map'
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from 'src/stores/config/Auth'
import { useCallOffStore } from 'src/stores/tsp/CallOff'
import { useTspResourceStore } from 'src/stores/tsp/TspResource'
import { useUserStore } from 'src/stores/config/User'
import { useScheduleStore } from 'src/stores/tsp/Schedule'

import ParentTaskbarTemplate from 'src/components/Templates/Gantt/TspScheduleParentTaskbarTemplate.vue'
import TaskbarTemplate from 'src/components/Templates/Gantt/TspScheduleTaskbarTemplate.vue'
import TooltipTemplate from 'src/components/Templates/Gantt/TspScheduleTooltipTemplate.vue'

import GanttState from 'src/mixins/GanttState'

import getRequiredTimeOff from 'src/actions/Tsp/GetRequiredTimeOff'

export default {
  name: 'TspSchedule',
  mixins: [GanttState],
  setup() {
    const isGanttLoading = ref(false)

    function changeIsGanttLoading(value) {
      isGanttLoading.value = value
    }

    return {
      isGanttLoading,
      changeIsGanttLoading
    }
  },
  data () {
    return {
      action: 'create',
      taskModalData: {},
      taskId: 0,
      taskIds: [],
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
          notes: 'comments'
        },
        rowHeight: 30,
        taskbarHeight: 29,
        resourceFields: {
          id: 'resourceId',
          name: 'name'
        },
        tooltipSettings: {
          showTooltip: true,
          taskbar: 'tooltipTemplate'
        },
        selectionSettings: {
          type: 'Multiple',
          mode: 'Row'
        },
        sortSettings: {
          columns: [
            { field: 'start_date', direction: 'Ascending' }
          ]
        },
        filterSettings: {
          type: 'Excel',
          hierarchyMode: 'Parent'
        },
        gridLines: 'Horizontal',
        resources: [],
        timelineSettings: {
          topTier: {
            format: 'dd/MM/yy',
            unit: 'Week'
          },
          bottomTier: {
            unit: 'Day'
          },
          timelineUnitSize: 20
        },
        labelSettings: {
          rightLabel: 'resources', // eslint-disable-line
          taskLabel: '${taskData.project_scope}' // eslint-disable-line
        },
        dateFormat: 'dd/MM/yy',
        editSettings: {
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
          mode: 'Auto',
          allowTaskbarEditing: true,
          showDeleteConfirmDialog: false,
          newRowPosition: 'Child'
        },
        validation: {
          calloff_id: { required: true, number: true },
          taskName: { required: true }
        },
        dateParams: { type: 'date', format: 'dd/MM/yy' },
        enableContextMenu: true,
        contextMenuItems: [
          { text: 'Task Information', target: '.e-content', id: 'taskInformation', iconCss: 'e-icons e-edit' },
          { text: 'Batch Edit', target: '.e-content', id: 'batchEdit', iconCss: 'e-icons e-user-defined' },
          { text: 'Delete Task', target: '.e-content', id: 'delete', iconCss: 'e-icons e-delete' },
          'AutoFitAll', 'AutoFit', 'Save', 'Cancel', 'DeleteDependency',
          {
            text: 'Add Task',
            target: '.e-content',
            id: 'newAdd',
            iconCss: 'e-icons new',
            items: [
              { text: 'Below', target: '.e-content', id: 'addBelow', iconCss: 'e-icons add-below' },
              { text: 'Copy', target: '.e-content', id: 'addCopy', iconCss: 'e-icons add-copy' },
              { text: 'Child', target: '.e-content', id: 'addChild', iconCss: 'e-icons add-child' }
            ]
          },
          { text: 'Collapse the Row', target: '.e-content', id: 'collapserow' },
          { text: 'Expand the Row', target: '.e-content', id: 'expandrow' },
          { text: 'Hide Column', target: '.e-gridheader', id: 'hidecols' },
          { text: 'Add TimeOff', target: '.e-content', id: 'timeoff', iconCss: 'e-icons time-off' },
          { text: 'Add Quarantine', target: '.e-content', id: 'quarantine', iconCss: 'e-icons quarantine' },
          { text: 'Validate Tasks', target: '.e-content', id: 'validate', iconCss: 'e-icons validate' },
          { text: 'Save Call Off', target: '.e-content', id: 'resaveCalloff', iconCss: 'e-icons resavecalloff' }
        ],
        projectStartDate: new Date(),
        projectEndDate: new Date(2023, 11, 31),
        splitterSettings: {
          position: '50%'
        },
        toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExpandAll', 'CollapseAll', 'PrevTimeSpan', 'NextTimeSpan', 'Indent', 'Outdent']
      },
      selectedRowData: null
    }
  },
  computed: {
    ...mapState(useAuthStore, ['canEditSchedule']),
    ...mapState(useUserStore, ['users']),
    ...mapState(useScheduleStore, ['objectID', 'schedules', 'timeOffTable']),
    ...mapState(useCallOffStore, ['demandCategories', 'tspDisciplines', 'tspRoles']),
    ...mapState(useTspResourceStore, ['tsps', 'GET_TSPS']),
    height () {
      return (this.$q.screen.height - 270) + 'px'
    }
  },
  methods: {
    ...mapActions(useScheduleStore, ['getSchedules', 'storeSchedule', 'updateSchedule', 'updateBatchSchedules', 'deleteSchedule', 'deleteBatchSchedules', 'validateSchedule', 'storeBatchSchedules', 'getResources']),
    ...mapActions(useCallOffStore, ['getDisciplineName', 'getRoleName']),
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async onFilteredData (args) {
      this.changeIsGanttLoading(true)

      console.time('--process2')

      await this.sleep(40);

      const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
      ganttObj.dataSource = [...args]
      ganttObj.refresh()
      console.timeEnd('--process2')

      this.changeIsGanttLoading(false)
    },
    load: function () {
      const gridObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
      if (LocalStorage.getItem('TspScheduleGanttSelectedLayout')) {
        setTimeout(() => {
          gridObj.columns = [...JSON.parse(LocalStorage.getItem('TspScheduleGanttSelectedLayout'))]
        }, 700)
      }
    },
    rowDataBoundGantt: function (args) {
      if (args.data.taskData.is_calloff) {
        args.row.style.background = '#83c5be'
      }
      else if (args.data.childRecords.length) {
        args.row.style.background = '#edf6f9'
      }
    },
    queryTaskbarInfo: function (args) {
      if (args.taskbarType === 'ChildTask') {
        switch (args.data.taskData.category_id) {
          case 1: // Project Onshore
          case 7: // Project Offshore
            switch (args.data.taskData.calloff_status_id) {
              case 0: // deleted
                args.taskbarBgColor = '#c1121f'
                args.taskbarBorderColor = '#780000'
                break
              case 2: // increase
                args.taskbarBgColor = '#9d4edd'
                args.taskbarBorderColor = '#7b2cbf'
                break
              default:
                args.taskbarBgColor = '#5868c5'
                args.taskbarBorderColor = '#3f51b5'
                break
            }
            break
          case 2: // Time Off
            args.taskbarBgColor = '#52b788'
            args.taskbarBorderColor = '#40916c'
            break
          case 3: // Quarantine
            args.taskbarBgColor = '#f4845f'
            args.taskbarBorderColor = '#f27059'
            break
          case 4: // Training
            args.taskbarBgColor = '#edc531'
            args.taskbarBorderColor = '#dbb42c'
            break
          case 5: // Leave
            args.taskbarBgColor = '#a4c3b2'
            args.taskbarBorderColor = '#6b9080'
            break
          case 9: // Logistics
            args.taskbarBgColor = '#A4ADDF'
            args.taskbarBorderColor = '#8692D5'
            break
          default:
            args.taskbarBgColor = '#5868c5'
            args.taskbarBorderColor = '#3f51b5'
            break
        }
      }
      else {
        // console.log(args)
        if (args.data.is_calloff) {
          args.taskbarBgColor = 'rgb(97,97,97,0.87)'
          args.taskbarBorderColor = 'rgb(97,97,97,0.87)'
        }
        else {
          args.taskbarBgColor = 'rgb(135,135,135,0.87)'
          args.taskbarBorderColor = 'rgb(135,135,135,0.87)'
        }
      }
    },
    actionBegin: function (args) {
      switch (args.requestType) {
        case 'beforeOpenEditDialog':
          args.cancel = true
          this.onOpenTaskModal(args.rowData.id)
          break
        case 'filterchoicerequest': {
          const gridObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
          args.filterChoiceCount = gridObj.dataSource.length
        }
      }
    },
    actionComplete: function (args) {
      switch (args.requestType) {
        case 'rowDropped':
        case 'indented':
        case 'outdented': {
          const params = []
          // console.log(args)
          args.data.forEach(element => {
            params.push(element.taskData)
          })
          this.updateBatchSchedules(params)
          break
        }
      }
      switch (args.action) {
        case 'CellEditing':
        case 'DrawConnectorLine':
        case 'TaskbarEditing': {
          // console.log(args)
          this.updateSchedule(args.data.taskData)
          break
        }
      }
    },
    excelQueryCellInfo: function (args) {
      if (typeof args.data.taskData !== 'undefined') {
        if (args.data.taskData.is_calloff) {
          args.style = { backColor: '#83c5be' }
        }
        else if (args.data.hasChildRecords) {
          args.style = { backColor: '#edf6f9' }
        }
      }
    },
    contextMenuOpen: function (args) {
      // console.log('contextMenuOpen', args)
      const record = args.rowData
      if (args.type !== 'Header') {
        if (!record.hasChildRecords) {
          args.hideItems.push('Collapse the Row')
          args.hideItems.push('Expand the Row')
        }
        else {
          if (record.expanded) {
            args.hideItems.push('Expand the Row')
          }
          else {
            args.hideItems.push('Collapse the Row')
          }
        }
      }
    },
    contextMenuClick: function (args) {
      switch (args.item.id) {
        case 'taskInformation':
          // console.log(args)
          this.onOpenTaskModal(args.rowData.taskData.id)
          break
        case 'batchEdit':
          this.onOpenBatchEditModal(args)
          break
        case 'delete': {
          const selected = this.$gantt('TspScheduleGantt').selectedTasks()
          this.deleteTasks(selected)
          break
        }
        case 'collapserow': {
          const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
          ganttObj.collapseByID(Number(args.rowData.ganttProperties.taskId))
          break
        }
        case 'expandrow': {
          const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
          ganttObj.expandByID(Number(args.rowData.ganttProperties.taskId))
          break
        }
        case 'hidecols': {
          const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
          ganttObj.hideColumn(args.column.headerText)
          break
        }
        case 'timeoff':
          this.menuAddTimeOff()
          break
        case 'quarantine':
          this.menuAddQuarantine(args)
          break
        case 'validate':
          this.menuValidate()
          break
        case 'addBelow': {
          this.menuAddTaskBelow(args)
          break
        }
        case 'addCopy': {
          this.menuAddTaskCopy(args)
          break
        }
        case 'addChild': {
          this.menuAddChildTask(args)
          break
        }
        case 'resaveCalloff':
          this.menuResaveCalloff(args)
          break
        default:
          break
      }
    },
    deleteTasks (args) {
      this.deleteBatchSchedules(args).then(() => {
        this.$gantt('TspScheduleGantt').batchDelete(args)
      })
    },
    onOpenTaskModal (id) {
      this.action = 'edit'
      this.taskId = id
      this.$refs.TaskModal.show()
    },
    onOpenBatchEditModal (args) {
      console.log(args)
      const selected = this.$gantt('TspScheduleGantt').selected()
      console.log(selected)
      this.taskIds = _map(selected, 'id')
      console.log(this.taskIds)
      this.$refs.BatchEditModal.show()
    },
    onUpdated (args) {
      this.$gantt('TspScheduleGantt').update(args)
    },
    onBatchUpdated (args) {
      this.$gantt('TspScheduleGantt').batchUpdate(args)
    },
    onDeleted (args) {
      this.$gantt('TspScheduleGantt').delete(args)
    },
    menuAddTaskBelow (args) {
      const params = Object.assign({}, args.rowData.taskData)
      delete params.id
      delete params.dependency
      delete params.baseline_start
      delete params.baseline_finish
      params.task_name = 'New Task'
      params.is_calloff = 0
      params.quantity = 1
      // params.role_id = null
      // params.discipline_id = null
      // params.segments = []
      // console.log(params)
      this.storeSchedule(params).then(response => {
        // const ganttObj = this.$gantt('TspScheduleGantt').ganttObj
        // const selected = this.$gantt('TspScheduleGantt').selectedTasks()[0]
        // const index = selected.index
        // console.log('New Index: ', index)
        // console.log(selected)
        // ganttObj.editSettings.newRowPosition = 'Below'
        // ganttObj.addRecord(response, 'Below', index)
        this.$gantt('TspScheduleGantt').add(response)
      })
    },
    menuAddTaskCopy (args) {
      const params = Object.assign({}, args.rowData.taskData)
      delete params.id
      delete params.baseline_start
      delete params.baseline_finish
      params.is_calloff = 0
      params.quantity = 1
      // console.log(record.index)
      // delete params.dependency
      params.task_name = params.task_name + ' (copy)'
      this.storeSchedule(params).then(response => {
        // const ganttObj = this.$gantt('TspScheduleGantt').ganttObj
        // ganttObj.editSettings.newRowPosition = 'Below'
        // ganttObj.addRecord(response, 'Below')
        this.$gantt('TspScheduleGantt').add(response)
        // ganttObj.updateDataSource(this.data)
      })
    },
    menuAddChildTask (args) {
      const params = Object.assign({}, args.rowData.taskData)
      delete params.id
      delete params.baseline_start
      delete params.baseline_finish
      params.parent_id = args.rowData.id
      params.is_calloff = 0
      params.role_id = null
      params.discipline_id = null
      params.quantity = 1
      // params.segments = []
      // const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
      // params.dependency = record.id + 'FS'
      params.task_name = 'New Child Task'
      this.storeSchedule(params).then(response => {
        this.$gantt('TspScheduleGantt').add(response, 'Child')
        // ganttObj.editSettings.newRowPosition = 'Child'
        // ganttObj.addRecord(response, 'Child')
        // ganttObj.updateDataSource(this.data)
      })
    },
    menuValidate: function () {
      const selectedRows = this.$gantt('TspScheduleGantt').selectedTasks()

      // Tasks to be Deleted
      const forDeletionTasks = this.filterValidateForDeletion(selectedRows)
      if (forDeletionTasks.length) {
        console.log('Deleting: ', forDeletionTasks)
        this.deleteBatchSchedules(forDeletionTasks).then(() => {
          this.$gantt('TspScheduleGantt').batchDelete(forDeletionTasks)
        })
      }
      // Tasks to be confirmed
      const forConfirmationTasks = this.filterValidateChanged(selectedRows)
      if (forConfirmationTasks.length) {
        console.log('Confirming: ', forConfirmationTasks)
        this.updateBatchSchedules(forConfirmationTasks).then(response=>{
          this.$gantt('TspScheduleGantt').batchUpdate(response)
        })
      }
    },
    menuAddTimeOff: function () {
      const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
      const selectedRows = ganttObj.selectionModule.getSelectedRecords()
      selectedRows.forEach(element => {
        const newStartDate = date.addToDate(element.taskData.finish_date, { days: 1 })
        const timeoff = {
          calloff_id: element.taskData.calloff_id,
          is_calloff: 0,
          calloff_status_id: 1,
          parent_id: element.taskData.parent_id,
          category_id: 2,
          discipline_id: element.taskData.discipline_id,
          role_id: element.taskData.role_id,
          is_manual: false,
          quantity: element.taskData.quantity,
          index: element.taskData.index,
          task_name: 'Time Off',
          resources: element.taskData.resources,
          duration: getRequiredTimeOff(element.taskData),
          start_date: newStartDate,
          dependency: element.taskData.id + 'FS'
        }
        this.storeSchedule(timeoff).then(response => {
          ganttObj.editSettings.newRowPosition = 'Below'
          ganttObj.addRecord(response)
        })
      })
    },
    menuAddQuarantine: function (args) {
      const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
      const newStartDate = date.subtractFromDate(args.rowData.taskData.start_date, { days: 15 })
      const quarantine = {
        calloff_id: args.rowData.taskData.calloff_id,
        is_calloff: 0,
        calloff_status_id: 1,
        parent_id: args.rowData.taskData.parent_id,
        category_id: 3,
        discipline_id: args.rowData.taskData.discipline_id,
        role_id: args.rowData.taskData.role_id,
        is_manual: false,
        quantity: args.rowData.taskData.quantity,
        index: args.rowData.taskData.index - 1,
        task_name: 'Quarantine',
        resources: args.rowData.taskData.resources,
        duration: 14,
        start_date: newStartDate,
        dependency: args.rowData.taskData.id + 'SF'
      }
      // console.log(timeoff)
      this.storeSchedule(quarantine).then(response => {
        ganttObj.editSettings.newRowPosition = 'Above'
        ganttObj.addRecord(response)
      })
    },
    menuResaveCalloff () {
      const ganttObj = document.getElementById('TspScheduleGantt').ej2_instances[0]
      // const selectedRows = ganttObj.selectionModule.getSelectedRecords()
      const selectedRows = this.$gantt('TspScheduleGantt').selectedTasks()
      const callOffTasks = ganttObj.dataSource.filter(element => element.calloff_id === selectedRows[0].calloff_id)
      const params = callOffTasks.map(element => {
        const item = {}
        item.id = element.id
        item.start_date = element.start_date
        item.finish_date = element.finish_date
        item.duration = element.duration
        return item
      })
      this.updateBatchSchedules(params)
    },
    filterValidateForDeletion (args) {
      const forDeletion = args.filter(element => {
        return element.taskData.calloff_status_id === 0
      })
      return forDeletion
    },
    filterValidateChanged (args) {
      const forValidation = args.filter(element => {
        return element.taskData.calloff_status_id === 2
      })
      const tasks = forValidation.map(element => {
        element.taskData.calloff_status_id = 1
        element.taskData.baseline_start = null
        element.taskData.baseline_finish = null
        return element.taskData
      })
      // console.log(tasks)
      return tasks
    },
    taskbarTemplateLabel: function (data) {
      return this.getRoleName(data.taskData.role_id) + ' - ' + this.getDisciplineName(data.taskData.discipline_id)
    },
    tooltipRoleName: function (data) {
      const role = this.getRoleName(data.taskData.role_id)
      if (typeof role === 'undefined') return ''
      return role
    },
    tooltipDisciplineName: function (data) {
      const discipline = this.getDisciplineName(data.taskData.discipline_id)
      if (typeof discipline === 'undefined') return ''
      return discipline
    }
  },
  created () {
    this.ganttSettings.resources = [...this.users]
    this.ganttSettings.projectStartDate = new Date()
    this.ganttSettings.projectEndDate = date.addToDate(this.ganttSettings.projectStartDate, { days: 60 })
    if (!this.canEditSchedule) {
      console.log('View Only')
      this.ganttSettings.readOnly = true
      this.ganttSettings.editSettings.allowAdding = false
      this.ganttSettings.editSettings.allowEditing = false
      this.ganttSettings.editSettings.allowDeleting = false
      this.ganttSettings.editSettings.allowTaskbarEditing = false
      this.ganttSettings.enableContextMenu = false
    }
  },
  components: {
    ScheduleFilter: defineAsyncComponent(() => import('src/components/Filters/ScheduleFilter.vue')),
    GanttTaskModal: defineAsyncComponent(() => import('pages/TspSchedule/TaskModal.vue')),
    GanttBatchEditModal: defineAsyncComponent(() => import('pages/TspSchedule/BatchEditModal.vue')),
    ScheduleTimelineButton: defineAsyncComponent(() => import('src/components/Buttons/ScheduleTimelineButton.vue')),
    TspScheduleParentTaskbarTemplate: ParentTaskbarTemplate,
    TspScheduleTaskbarTemplate: TaskbarTemplate,
    TspScheduleTooltipTemplate: TooltipTemplate
  }
}
</script>

<style lang='scss'>
</style>
