import { IModel } from 'src/app/models/ModelInterface'
import { ICallOff } from 'src/modules/Tsp/models/CallOff/CallOffInterface'
import { ISelHeader } from 'src/modules/Sel/models/SelHeader/SelHeaderInterface'

export interface ISep extends IModel {
  location_id: number | undefined
  description: string | undefined
  comments: string | undefined | null
  client_id: number | undefined
  project: string | undefined
  wbs: string | undefined | null
  status_id: number | undefined
  created_by: string | undefined
  updated_by: string | undefined
  contract_no: string | undefined | null
  customer_po_no: string | undefined | null
  ctr_no: string | undefined | null
  critical_success_factor: number | undefined | null
  tsp_required: boolean | undefined | null
  project_manager: number | undefined
  customer_service_coordinator: number | undefined | null
  engineer: number | undefined | null
  quality: number | undefined | null
  deliverables: string | undefined | null
  critical_services: string | undefined | null
  internal_focal_point: string | undefined | null
  external_focal_point: string | undefined | null
  internal_kom_participants: string | undefined | null
  external_kom_participants: string | undefined | null
  start_date: Date | undefined | null
  finish_date: Date | undefined | null
  tdrq_comments: string | undefined | null
  engineering_comments: string | undefined | null
  pmitp: string | undefined | null
  notifications_list: number | undefined | null
  moc_list: number | undefined | null
  moc_numbers: string | undefined | null
  quality_comments: string | undefined | null
  closeout_status: number | undefined | null
  npt_hours: number | undefined | null
  closeout_approval_status: number | undefined | null
  closeout_deliverables: string | undefined | null
  closeout_comments: string | undefined | null
  vor_numbers: string | undefined | null
  risk_register: string | undefined | null
  tdrq_numbers: string | undefined | null
  offshore_documents: string | undefined | null
  lead_tsp_name: string | undefined | null
  installation_engineer_name: string | undefined | null
  well_name: string | undefined | null
  lof_moc_number: string | undefined | null
  offshore_records_uploaded: number | undefined | null
  delivery_planner: number | undefined | null
  hse_incidents: number | undefined | null
  etm: [] | undefined | null
  phase_id: number | undefined
  is_iepci: boolean | undefined | null
  engineering_status_id: number | undefined | null
  sap_sold_to_party: string | undefined | null
  temp_files: string[] | undefined | null
  files: string[] | undefined | null
  sel_headers: ISelHeader[] | undefined | null
  calloffs: ICallOff[] | undefined | null
}
