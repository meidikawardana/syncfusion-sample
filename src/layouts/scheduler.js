import { date } from 'quasar'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

// import GlobalConfig from 'src/mixins/GlobalConfig'

// import TooltipTemplate from 'src/components/Templates/Gantt/TspScheduleTooltipTemplate.vue'
// import TaskbarTemplate from 'src/components/Templates/Gantt/TspScheduleTaskbarTemplate.vue'
// import ParentTaskbarTemplate from 'src/components/Templates/Gantt/TspScheduleParentTaskbarTemplate.vue'

export default {
  // mixins: [GlobalConfig],
  data () {
    return {
      data: [],
      ganttKey: 0,
      addForm: {
        discipline: null,
        roles: [],
        shift: false
      },
      selectedTspResource: null,
      selectedResource: null,
      selectedLocation: null,
      submitting: false,
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
          // taskbar: function () {
          //   return { template: TooltipTemplate }
          // }
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
          }
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
          showDeleteConfirmDialog: true,
          newRowPosition: 'Child'
        },
        validation: {
          calloff_id: { required: true, number: true },
          taskName: { required: true }
        },
        dateParams: { type: 'date', format: 'dd/MM/yy' },
        enableContextMenu: true,
        contextMenuItems: [
          'AutoFitAll', 'AutoFit', 'TaskInformation', 'DeleteTask', 'Save', 'Cancel', 'DeleteDependency',
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
          { text: 'Save Call Off', target: '.e-content', id: 'resavecalloff', iconCss: 'e-icons resavecalloff' }
        ],
        projectStartDate: new Date(),
        projectEndDate: new Date(2021, 11, 31),
        splitterSettings: {
          position: '50%'
        },
        toolbar: ['ZoomIn', 'ZoomOut', 'ZoomToFit', 'ExpandAll', 'CollapseAll', 'PrevTimeSpan', 'NextTimeSpan', 'Indent', 'Outdent'],
        taskbarTemplate: function () {
          // return { template: TaskbarTemplate }
        },
        parentTaskbarTemplate: function () {
          // return { template: ParentTaskbarTemplate }
        }
      }
    }
  },
  computed: {
    ...mapState('Schedule', ['objectID', 'schedules', 'timeOffTable']),
    ...mapState('CallOff', ['demandCategories', 'tspDisciplines', 'tspRoles']),
    ...mapState('TspResources', ['tsps']),
    ...mapGetters('TspResources', ['GET_TSPS']),
    ...mapGetters('Auth', ['canEditSchedule']),
    height () {
      return (this.$q.screen.height - 270) + 'px'
    }
  },
  methods: {
    ...mapActions('Schedule', ['getSchedules', 'storeSchedule', 'updateSchedule', 'updateBatchSchedules', 'deleteSchedule', 'validateSchedule', 'storeBatchSchedules',
      'reorderRowsSchedule', 'getResources']),
    ...mapMutations('Schedule', ['SET_SCHEDULES']),
    onFilteredData (args) {
      this.data = [...args]
      this.ganttKey++
    },
    getSetTimeOffDuration: function (args) {
      const start = new Date(args.start_date)
      const finish = new Date(args.finish_date)
      const taskDuration = date.getDateDiff(finish, start, 'days') + 1

      let daysOff = 0
      let keepCounting = 1

      this.timeOffTable.forEach(element => {
        if (keepCounting) {
          daysOff = element.daysOff
          if (taskDuration <= element.workedDays) {
            keepCounting = 0
          }
        }
      })
      return daysOff
    },
    onAddRoles: function (args) {
      const ganttObj = document.getElementById(this.objectID).ej2_instances[0]
      const selectedRows = ganttObj.selectionModule.getSelectedRecords()
      const lenRoles = this.addForm.roles.length
      const lenSelectedRows = selectedRows.length
      if (lenSelectedRows && lenRoles && this.addForm.discipline) {
        const tasks = []
        selectedRows.forEach(element => {
          this.addForm.roles.forEach(el => {
            const role = this.tspRoles.find(element => element.id === el)
            const discipline = this.tspDisciplines.find(element => element.id === this.addForm.discipline)
            const item = element.taskData
            item.calloff_status_id = 1
            item.category_id = 1
            item.is_calloff = 0
            item.discipline_id = this.addForm.discipline
            item.role_id = el
            item.task_name = discipline.name + ' - ' + role.name
            if (this.addForm.shift) item.task_name = item.task_name + ' - Night'
            item.parent_id = element.id
            item.shift_id = this.addForm.shift
            delete item.id
            const itemCopy = Object.assign({}, item)
            tasks.push(itemCopy)
          })
        })
        const params = {}
        params.data = tasks
        this.submitting = true
        this.storeBatchSchedules(params).then(response => {
          response.forEach(respElem => {
            ganttObj.editSettings.newRowPosition = 'Child'
            ganttObj.addRecord(respElem)
          })
          this.submitting = false
        })
      } else {
        this.$q.notify({
          message: 'Selection Missing',
          progress: true,
          color: 'warning',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      }
    },
    onAddTspResource: function (args) {
      const ganttObj = document.getElementById(this.objectID).ej2_instances[0]
      let selectedRows = {}
      selectedRows = ganttObj.selectionModule.getSelectedRecords()

      const lenSelectedRows = selectedRows.length
      if (lenSelectedRows && this.selectedTspResource) {
        selectedRows.forEach(element => {
          const task = {}
          task.id = element.taskData.id
          task.resources = []
          task.resources.push(this.selectedTspResource)
          ganttObj.updateRecordByID(task)
        })
      } else {
        this.$q.notify({
          message: 'Selection Missing',
          progress: true,
          color: 'warning',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      }
    },
    onAddResource: function (args) {
      const ganttObj = document.getElementById(this.objectID).ej2_instances[0]
      let selectedRows = {}
      selectedRows = ganttObj.selectionModule.getSelectedRecords()

      const lenSelectedRows = selectedRows.length
      if (lenSelectedRows && this.selectedResource) {
        selectedRows.forEach(element => {
          const task = {}
          task.id = element.taskData.id
          task.resources = []
          task.resources.push(this.selectedResource)
          ganttObj.updateRecordByID(task)
        })
      } else {
        this.$q.notify({
          message: 'Selection Missing',
          progress: true,
          color: 'warning',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      }
    },
    onClearResource: function (args) {
      const ganttObj = document.getElementById(this.objectID).ej2_instances[0]
      const selectedRows = ganttObj.selectionModule.getSelectedRecords()
      const lenSelectedRows = selectedRows.length
      if (lenSelectedRows) {
        selectedRows.forEach(element => {
          const task = {}
          task.id = element.id
          task.resources = []
          ganttObj.updateRecordByID(task)
        })
      } else {
        this.$q.notify({
          message: 'No Row Selected',
          progress: true,
          color: 'warning',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      }
    },
    btnClearFilter: function () {
      const gridObj = document.getElementById(this.objectID).ej2_instances[0]
      gridObj.clearFiltering()
    },
    gantt: function () {
      const self = this
      return {
        load: function (args) {
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
          ganttObj.timelineSettings.timelineUnitSize = 20
          ganttObj.treeGrid.filterSettings.type = 'Excel'
        },
        rowDataBoundGantt: function (args) {
          if (args.data.taskData.is_calloff) {
            args.row.style.background = '#83c5be'
          } else if (args.data.childRecords.length) {
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
              case 6: // Flexible Time Off
                args.taskbarBgColor = '#f7d1cd'
                args.taskbarBorderColor = '#e8c2ca'
                break
              default:
                args.taskbarBgColor = '#5868c5'
                args.taskbarBorderColor = '#3f51b5'
                break
            }
          } else {
            // console.log(args)
            if (args.data.is_calloff) {
              args.taskbarBgColor = 'rgb(97,97,97,0.87)'
              args.taskbarBorderColor = 'rgb(97,97,97,0.87)'
            } else {
              args.taskbarBgColor = 'rgb(135,135,135,0.87)'
              args.taskbarBorderColor = 'rgb(135,135,135,0.87)'
            }
          }
        },
        actionBegin: function (args) {
          switch (args.requestType) {
            case 'beforeOpenEditDialog': {
              args.cancel = true
              self.action = 'edit'
              self.modalData = args.rowData.taskData
              self.openEventModal = true
              break
            }
            case 'beforeDelete': {
              args.data.forEach(element => {
                if (element.is_calloff) {
                  args.cancel = true
                  self.$q.notify({
                    message: "Can't delete Call Off Summary",
                    progress: true,
                    color: 'warning',
                    actions: [
                      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
                    ]
                  })
                }
              })
              break
            }
            case 'filterchoicerequest': {
              const gridObj = document.getElementById(self.objectID).ej2_instances[0]
              args.filterChoiceCount = gridObj.dataSource.length
            }
          }
        },
        actionComplete: function (args) {
          switch (args.requestType) {
            case 'indented':
            case 'outdented': {
              args.data.forEach(element => {
                self.updateSchedule(element.taskData)
              })
              break
            }
            case 'save':
            case 'taskbarEdited': {
              self.updateSchedule(args.data.taskData)
              break
            }
            case 'delete': {
              args.data.forEach(element => {
                self.deleteSchedule(element.id)
              })
              break
            }
          }
        },
        excelQueryCellInfo: function (args) {
          if (typeof args.data.taskData !== 'undefined') {
            if (args.data.taskData.is_calloff) {
              args.style = { backColor: '#83c5be' }
            } else if (args.data.hasChildRecords) {
              args.style = { backColor: '#edf6f9' }
            }
          }
        },
        toolbarClick: function (args) {
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
          switch (args.item.id) {
            case 'TspScheduleEdit_add': {
              args.cancel = true
              self.action = 'create'
              self.openEventModal = true
              break
            }
            case 'TspScheduleEdit_excelexport': {
              ganttObj.excelExport()
              break
            }
            default:
              break
          }
        },
        contextMenuClick: function (args) {
          const record = args.rowData
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
          switch (args.item.id) {
            case 'collapserow':
              ganttObj.collapseByID(Number(record.ganttProperties.taskId))
              break
            case 'expandrow':
              ganttObj.expandByID(Number(record.ganttProperties.taskId))
              break
            case 'hidecols':
              ganttObj.hideColumn(args.column.headerText)
              break
            case 'timeoff':
              self.gantt().menuAddTimeOff(args)
              break
            case 'quarantine':
              self.gantt().menuAddQuarantine(args)
              break
            case 'validate':
              self.gantt().menuValidate(args)
              break
            case 'resavecalloff':
              self.gantt().menuResaveCallOff(args)
              break
            case 'addBelow': {
              const params = Object.assign({}, args.rowData.taskData)
              delete params.id
              delete params.dependency
              delete params.baseline_start
              delete params.baseline_finish
              params.task_name = 'New Task'
              params.is_calloff = 0
              params.role_id = null
              params.discipline_id = null
              self.storeSchedule(params).then(response => {
                ganttObj.editSettings.newRowPosition = 'Below'
                ganttObj.addRecord(response, 'Below', record.index)
              })
              break
            }
            case 'addCopy': {
              const params = Object.assign({}, args.rowData.taskData)
              delete params.id
              delete params.baseline_start
              delete params.baseline_finish
              params.is_calloff = 0
              params.task_name = params.task_name + ' (copy)'
              self.storeSchedule(params).then(response => {
                ganttObj.editSettings.newRowPosition = 'Below'
                ganttObj.addRecord(response, 'Below', record.index)
              })
              break
            }
            case 'addChild': {
              const params = Object.assign({}, args.rowData.taskData)
              delete params.id
              delete params.baseline_start
              delete params.baseline_finish
              params.parent_id = args.rowData.id
              params.is_calloff = 0
              params.role_id = null
              params.discipline_id = null
              const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
              params.task_name = 'New Child Task'
              self.storeSchedule(params).then(response => {
                ganttObj.editSettings.newRowPosition = 'Child'
                ganttObj.addRecord(response)
              })
              break
            }
            default:
              break
          }
        },
        contextMenuOpen: function (args) {
          var record = args.rowData
          if (args.type !== 'Header') {
            if (!record.hasChildRecords) {
              args.hideItems.push('Collapse the Row')
              args.hideItems.push('Expand the Row')
            } else {
              if (record.expanded) {
                args.hideItems.push('Expand the Row')
              } else {
                args.hideItems.push('Collapse the Row')
              }
            }
          }
        },
        menuValidate: function (args) {
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
          const selectedRows = ganttObj.selectionModule.getSelectedRecords()
          selectedRows.forEach(element => {
            if (element.taskData.calloff_status_id === 0) { // DELETED
              ganttObj.deleteRecord(element)
            } else if (element.taskData.calloff_status_id === 2) { // CHANGED
              element.taskData.calloff_status_id = 1
              element.taskData.baseline_start = null
              element.taskData.baseline_finish = null
              ganttObj.updateRecordByID(element.taskData)
            }
          })
        },
        menuResaveCallOff: function (args) {
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
          const selectedRows = ganttObj.selectionModule.getSelectedRecords()
          const callOffTasks = ganttObj.dataSource.filter(element => element.calloff_id === selectedRows[0].calloff_id)
          const params = callOffTasks.map(element => {
            const item = {}
            item.id = element.id
            item.start_date = element.start_date
            item.finish_date = element.finish_date
            return item
          })
          self.updateBatchSchedules(params)
        },
        menuAddTimeOff: function (args) {
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
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
              duration: self.getSetTimeOffDuration(element.taskData),
              start_date: newStartDate,
              dependency: element.taskData.id + 'FS'
            }
            self.storeSchedule(timeoff).then(response => {
              ganttObj.editSettings.newRowPosition = 'Below'
              ganttObj.addRecord(response)
            })
          })
        },
        menuAddQuarantine: function (args) {
          const ganttObj = document.getElementById(self.objectID).ej2_instances[0]
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
          self.storeSchedule(quarantine).then(response => {
            ganttObj.editSettings.newRowPosition = 'Above'
            ganttObj.addRecord(response)
          })
        }
      }
    }
  }
}
