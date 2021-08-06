import { Data } from '../types/data'

const CONTROL_STORAGE_KEY = 'law-control-key'

export const initialData: Data = {
    name: '',
    caseId: 0,
    incidentId: 0,
    incidentTypeId: 0,
    laws: [],
    penal: '',
    cases: [
        { id: 1, incidents: [{ id: 1, done: false }, { id: 2, done: false }, { id: 3, done: false }, { id: 4, done: false }, { id: 5, done: false }] },
        { id: 2, incidents: [{ id: 1, done: false }, { id: 2, done: false }, { id: 3, done: false }, { id: 4, done: false }, { id: 5, done: false }] },
        { id: 3, incidents: [{ id: 1, done: false }, { id: 2, done: false }, { id: 3, done: false }, { id: 4, done: false }, { id: 5, done: false }] },
        { id: 4, incidents: [{ id: 1, done: false }, { id: 2, done: false }, { id: 3, done: false }, { id: 4, done: false }, { id: 5, done: false }] },
        { id: 5, incidents: [{ id: 1, done: false }, { id: 2, done: false }, { id: 3, done: false }, { id: 4, done: false }, { id: 5, done: false }] },
        { id: 6, incidents: [{ id: 1, done: false }, { id: 2, done: false }, { id: 3, done: false }, { id: 4, done: false }, { id: 5, done: false }] }
    ]
}

export const getLocalStorage = () => {

    return JSON.parse(window.localStorage.getItem(CONTROL_STORAGE_KEY)) || initialData

}

export const setLocalStorage = (data) => {

    window.localStorage.setItem(CONTROL_STORAGE_KEY, JSON.stringify(data))

}