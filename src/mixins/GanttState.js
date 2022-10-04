import {
  Gantt,
  GanttComponent,
  ColumnsDirective,
  ColumnDirective,
  ContextMenu,
  DayMarkers,
  Edit,
  Filter,
  Sort,
  Selection,
  ExcelExport,
  Reorder,
  Resize,
  RowDD,
  Toolbar,
  VirtualScroll
} from '@syncfusion/ej2-vue-gantt'

Gantt.Inject(ContextMenu)
Gantt.Inject(DayMarkers)
Gantt.Inject(Edit)
Gantt.Inject(Filter)
Gantt.Inject(Sort)
Gantt.Inject(Selection)
Gantt.Inject(ExcelExport)
Gantt.Inject(Reorder)
Gantt.Inject(Resize)
Gantt.Inject(RowDD)
Gantt.Inject(Toolbar)
Gantt.Inject(VirtualScroll)

export default {
  data () {
    return { }
  },
  provide: {
    gantt: [
      ContextMenu,
      Edit,
      DayMarkers,
      Filter,
      Sort,
      Selection,
      ExcelExport,
      Reorder,
      Resize,
      RowDD,
      Toolbar,
      VirtualScroll
    ]
  },
  components: {
    'ejs-gantt': GanttComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  }
}
