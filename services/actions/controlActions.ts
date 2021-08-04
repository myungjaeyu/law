import { Data } from '../../types/data'
import { getLocalStorage } from '../../utils/control'

export const INIT_STORAGE = '[CONTROL] INIT_STORAGE'
export const SAVE_STORAGE = '[CONTROL] SAVE_STORAGE'
export const SET_NAME = '[CONTROL] SET_NAME'
export const SET_CASE = '[CONTROL] SET_CASE'
export const SET_INCIDENT = '[CONTROL] SET_INCIDENT'
export const SET_LAWS = '[CONTROL] SET_LAWS'
export const SET_PENAL = '[CONTROL] SET_PENAL'

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

        const data: Data = getLocalStorage()

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

export const setControlLaws = (laws: string) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_INCIDENT, payload: {
                laws
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}

export const setControlPenal = (penal: string) => async (dispatch: any) => {
    try {

        dispatch({
            type: SET_PENAL, payload: {
                penal
            }
        })

    } catch (error) {

        dispatch({ type: FAIL_CONTROL })

    }
}