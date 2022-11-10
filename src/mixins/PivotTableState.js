import {
  CalculatedField,
  ConditionalFormatting,
  DrillThrough,
  ExcelExport,
  FieldList,
  GroupingBar,
  NumberFormatting,
  PDFExport,
  PivotChart,
  PivotView,
  PivotViewComponent,
  Toolbar,
  VirtualScroll,
} from '@syncfusion/ej2-vue-pivotview'

PivotView.Inject(DrillThrough)
PivotView.Inject(GroupingBar)
PivotView.Inject(FieldList)
PivotView.Inject(CalculatedField)
PivotView.Inject(Toolbar)
PivotView.Inject(ExcelExport)
PivotView.Inject(PivotChart)
PivotView.Inject(VirtualScroll)

PivotView.Inject(ConditionalFormatting)
PivotView.Inject(NumberFormatting)
PivotView.Inject(PDFExport)

export default {
  data() {
    return {}
  },
  components: {
    'ejs-pivotview': PivotViewComponent,
  },
}
