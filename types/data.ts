export type Incident = {
    id: number
    done: boolean
}

export type Case = {
    id: number
    incidents: Incident[]
}

export type Data = {
    name: string
    caseId: number,
    incidentId: number,
    cases: Case[]
}