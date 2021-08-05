import { Data } from '../../types/data'
import { getLocalStorage } from '../../utils/control'

export const INIT_STORAGE = '[CONTROL] INIT_STORAGE'
export const SAVE_STORAGE = '[CONTROL] SAVE_STORAGE'
export const SET_NAME = '[CONTROL] SET_NAME'
export const SET_CASE = '[CONTROL] SET_CASE'
export const SET_INCIDENT = '[CONTROL] SET_INCIDENT'
export const SET_INCIDENT_TYPE = '[CONTROL] SET_INCIDENT_TYPE'
export const SET_LAW_TEXT = '[CONTROL] SET_LAW_TEXT'
export const SET_PENAL_TEXT = '[CONTROL] SET_PENAL_TEXT'

export const FAIL_CONTROL = '[CONTROL] FAIL_CONTROL'

export const initControlStorage = () => async (dispatch: any) => {
    try {

        const data: Data = getLocalStorage()

        dispatch({
            type: INIT_STORAGE, payload: {
                data
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const saveControlStorage = () => async (dispatch: any) => {
    try {

        dispatch({
            type: SAVE_STORAGE
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlName = (name: string) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_NAME, payload: {
                name
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlCase = (caseId: number) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_CASE, payload: {
                caseId
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlIncident = (incidentId: number) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_INCIDENT, payload: {
                incidentId
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlIncidentType = (incidentTypeId: number) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_INCIDENT_TYPE, payload: {
                incidentTypeId
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlLawText = (lawText: string) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_LAW_TEXT, payload: {
                lawText
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlPenalText = (penalText: string) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_PENAL_TEXT, payload: {
                penalText
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}