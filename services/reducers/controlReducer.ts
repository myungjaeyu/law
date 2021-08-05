import {
    INIT_STORAGE,
    SAVE_STORAGE,
    SET_NAME,
    SET_CASE,
    SET_INCIDENT,
    SET_INCIDENT_TYPE,
    SET_LAW_TEXT,
    SET_PENAL_TEXT,
    FAIL_CONTROL
} from '../actions/controlActions'

import { Data, Case, Incident } from '../../types/data'

import { setLocalStorage, initialData } from '../../utils/control'

type InitialState = {
    data: Data
}

const initialState: InitialState = {
    data: initialData
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
                incidentTypeId: 0,
                data: savedData
            }

            setLocalStorage(apply_data)

            return { ...state, data: apply_data }
        case SET_NAME:

            const apply_name_data = { ...state.data, name: action.payload.name }

            setLocalStorage(apply_name_data)

            return { ...state, data: apply_name_data }
        case SET_CASE:

            const apply_case_data = { ...state.data, caseId: action.payload.caseId, incidentId: 0 }

            setLocalStorage(apply_case_data)

            return { ...state, data: apply_case_data }
        case SET_INCIDENT:

            const apply_incident_data = { ...state.data, incidentId: action.payload.incidentId, incidentTypeId: 0 }

            setLocalStorage(apply_incident_data)

            return { ...state, data: apply_incident_data }
        case SET_INCIDENT_TYPE:

            const apply_incident_type_data = { ...state.data, incidentTypeId: action.payload.incidentTypeId, lawText: '' }

            setLocalStorage(apply_incident_type_data)

            return { ...state, data: apply_incident_type_data }
        case SET_LAW_TEXT:

            const apply_law_data = { ...state.data, lawText: action.payload.lawText, penalText: '' }

            setLocalStorage(apply_law_data)

            return { ...state, data: apply_law_data }
        case SET_PENAL_TEXT:

            const apply_penal_data = { ...state.data, penalText: action.payload.penalText }

            setLocalStorage(apply_penal_data)

            return { ...state, data: apply_penal_data }
        case FAIL_CONTROL:
            return { ...state }
        default:
            return { ...state }
    }
}

export default controlReducer