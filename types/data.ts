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
    cases: Case[]
}