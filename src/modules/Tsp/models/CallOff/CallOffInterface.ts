import { IModel } from 'src/app/models/ModelInterface'
import { ISep } from 'src/modules/Sep/models/Sep/SepInterface'

export interface ICallOff extends IModel {
  location_id: number | undefined
  client_id: number | undefined
  phase_id: number | undefined
  status_id: number | undefined
  project_name: string | undefined

  sep_id: number | undefined
  project_scope: string | undefined
  requestor: string | undefined | null
  focal_point: number | undefined | null
  rig_contractor: string | undefined | null
  rig_name: string | undefined | null
  sap_customer_no: string | undefined | null
  cost_centre: string | undefined | null
  line_item: string | undefined | null
  po_number: string | undefined | null
  wbs: string | undefined | null
  well_name: string | undefined | null
  well_number: string | undefined | null
  procedure_number: string | undefined | null
  field_location: string | undefined | null
  work_scope: string | undefined | null
  requirements: string | undefined | null
  created_by: string | undefined
  updated_by: string | undefined
  contract_number: string | undefined | null
  demands: any[]
  sep: ISep | undefined
}
