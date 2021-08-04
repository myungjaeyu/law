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
    caseId: number
    incidentId: number
    laws: string[]
    penal: string
}

const initialState: InitialState = {
    data: initialData,
    caseId: 0,
    incidentId: 0,
    laws: [],
    penal: ''
}

const controlReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INIT_STORAGE:
            return { ...initialState, data: action.payload.data }
        case SAVE_STORAGE:

            const caseId = state.caseId
            const incidentId = state.incidentId

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

            setLocalStorage(savedData)

            return { ...state }
        case SET_NAME:

            const data = { ...state.data, name: action.payload.name }

            setLocalStorage(data)

            return { ...state, data }
        case SET_CASE:
            return { ...state, caseId: action.payload.caseId }
        case SET_INCIDENT:
            return { ...state, incidentId: action.payload.incidentId }
        case SET_LAWS:
            return { ...state, laws: action.payload.laws }
        case SET_PENAL:
            return { ...state, laws: action.payload.penal }
        case FAIL_CONTROL:
            return { ...state }
        default:
            return { ...state }
    }
}

export default controlReducer