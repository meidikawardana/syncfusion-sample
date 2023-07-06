import { IModel } from 'src/app/models/ModelInterface'

export interface ISel extends IModel {
    order: number | undefined
    sel_header_id: number | undefined
    category_id: number | undefined
    pn: string | undefined | null
    description: string | undefined | null
    quantity: number | undefined | null
    srp_id: number | undefined | null
    work_instruction: string | undefined | null
    release_status_id: number | undefined | null
    comments: string | undefined | null
    equipment: number | undefined | null
    ownership_id: number | undefined | null
    need_date: Date | undefined | null
    wbs: string | undefined | null
    execution_status_id: number | undefined | null
    flag: string | undefined | null
    where_used: string | undefined | null
    service_order: number | undefined | null
    updated_by: string | undefined | null
    planned_year: number | undefined | null
    planned_week: number | undefined | null
    etm: number | undefined | null
    etm_item: number | undefined | null
    sales_order: string | undefined | null
    client_pn: string | undefined | null
    custom1: string | undefined | null
    custom2: string | undefined | null
}
