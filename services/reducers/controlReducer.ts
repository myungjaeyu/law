import {
    INIT_STORAGE,
    SAVE_STORAGE,
    SET_NAME,
    SET_CASE,
    SET_INCIDENT,
    SET_LAWS,
    SET_PENAL,
    FAIL_CONTROL
} from '../actions/controlActions'

import { Data, Case, Incident } from '../../types/data'

import { setLocalStorage, initialData } from '../../utils/control'

type InitialState = {
    data: Data
    laws: string[]
    penal: string
}

const initialState: InitialState = {
    data: initialData,
    laws: [],
    penal: ''
}

const controlReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INIT_STORAGE:
            return { ...initialState, data: action.payload.data }
        case SAVE_STORAGE:

            const caseId = state.data.caseId
            const incidentId = state.data.incidentId

            const savedData = state.data.cases.reduce((acc, cur: Case) => {

                if (cur.id === caseId) {

                    cur.incidents = cur.incidents.reduce((acc, cur: Incident) => {

                        if (cur.id === incidentId) cur.done = true

                        acc.push(cur)
                        return acc
                    }, [])

                }

                acc.push(cur)
                return acc
            }, [])

            const apply_data = {
                ...state.data,
                caseId: 0,
                incidentId: 0,
                data: savedData
            }

            setLocalStorage(apply_data)

            return { ...state, data: apply_data }
        case SET_NAME:

            const apply_name_data = { ...state.data, name: action.payload.name }

            setLocalStorage(apply_name_data)

            return { ...state, data: apply_name_data }
        case SET_CASE:

            const apply_case_data = { ...state.data, caseId: action.payload.caseId }

            setLocalStorage(apply_case_data)

            return { ...state, data: apply_case_data }
        case SET_INCIDENT:

            const apply_incident_data = { ...state.data, incidentId: action.payload.incidentId }

            setLocalStorage(apply_incident_data)

            return { ...state, data: apply_incident_data }
        case SET_LAWS:
            return { ...state, laws: action.payload.laws }
        case SET_PENAL:
            return { ...state, penal: action.payload.penal }
        case FAIL_CONTROL:
            return { ...state }
        default:
            return { ...state }
    }
}

export default controlReducer