import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Grid,
  CommandColumn,
  ContextMenu,
  ColumnChooser,
  Edit,
  ExcelExport,
  Filter,
  ForeignKey,
  Freeze,
  Group,
  Page,
  PdfExport,
  Reorder,
  Resize,
  RowDD,
  Search,
  Selection,
  Sort,
  Toolbar
} from '@syncfusion/ej2-vue-grids'

Grid.Inject(CommandColumn)
Grid.Inject(ColumnChooser)
Grid.Inject(ContextMenu)
Grid.Inject(Edit)
Grid.Inject(ExcelExport)
Grid.Inject(Filter)
Grid.Inject(ForeignKey)
Grid.Inject(Freeze)
Grid.Inject(Group)
Grid.Inject(Page)
Grid.Inject(PdfExport)
Grid.Inject(Reorder)
Grid.Inject(Resize)
Grid.Inject(RowDD)
Grid.Inject(Search)
Grid.Inject(Selection)
Grid.Inject(Sort)
Grid.Inject(Toolbar)

export default {
  data () {
    return { }
  },
  provide: {
    grid: [
      CommandColumn,
      ContextMenu,
      ColumnChooser,
      Edit,
      ExcelExport,
      Filter,
      ForeignKey,
      Freeze,
      Group,
      Page,
      PdfExport,
      Reorder,
      Resize,
      RowDD,
      Search,
      Selection,
      Sort,
      Toolbar
    ]
  },
  // Methods to be removed in favor of the SyncfusionGrid boot file, after all legacy pages have been migrated
  methods: {
    addRecordToGrid (gridId, data) {
      this.$grid(gridId).add(data)
    },
    // addBatchRecordsToGrid (gridId, data) {
    //   this.$grid(gridId).batchAdd(data)
    // },
    updateRecordOnGrid (gridId, data) {
      this.$grid(gridId).update(data)
    },
    // updateBatchRecordsOnGrid (gridId, data) {
    //   this.$grid(gridId).batchUpdate(data)
    // },
    deleteRecordOnGrid (gridId, data) {
      this.$grid(gridId).delete(data)
    }
  },
  components: {
    'ejs-grid': GridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  }
}
