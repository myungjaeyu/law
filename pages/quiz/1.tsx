import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { useEffect, useState, useCallback } from 'react'
import { animateScroll } from 'react-scroll'

import Stats from '../../components/Stats'
import Switch from '../../components/Switch'
import FixedCard from '../../components/FixedCard'
import Header from '../../components/Header'

import { useDispatch, useSelector } from 'react-redux'
import { setControlIncident } from '../../services/actions/controlActions'

import LoadImage from '../../components/LoadImage'
import { case_quiz1 } from '../../utils/assets'

const cases = case_quiz1

const IndexPage = () => {

    const router = useRouter()

    const { incidents, caseId, incidentId } = useSelector((state: any) => ({
        incidents: state.control.data.caseId ? state.control.data.cases.find(e => e.id === state.control.data.caseId).incidents : [],
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId
    }))

    const dispatch = useDispatch()

    const [messages, setMessages]: any = useState([])
    const [plaintiff, setPlaintiff]: any = useState({})
    const [defendant, setDefendant]: any = useState({})

    const setCasePlaintiff = (caseId) => {

        const data = cases.plaintiff.find(e => e.id === caseId)

        setPlaintiff(data)

    }

    const setCaseIncident = (incidentId) => {

        const caseInfo = cases.defendant.find(e => e.id === caseId)

        const incidentInfo = caseInfo.incidents.find(e => e.id === incidentId)

        setDefendant(incidentInfo)

        animateScroll.scrollToBottom()

        dispatch(setControlIncident(incidentInfo.id))

    }

    const setCaseMessages = (caseId) => {
        setCasePlaintiff(caseId)
        setMessages(cases.messages.find(e => e.id === caseId).data)
    }

    const handleNextPage = useCallback(() => {


        if (defendant.id) {
            router.push('/quiz/2')
        }

    }, [router, defendant])

    useEffect(() => {

        if (caseId) {
            setCaseMessages(caseId)

        }

    }, [caseId])

    useEffect(() => {

        if (incidentId) {
            setCaseIncident(incidentId)
        }

    }, [incidentId])

    return (
        <div>
            <FixedCard>
                <Header link={'/info/3'} />

                <Stats type={1} />
            </FixedCard>

            <IncidentGroup>

                {messages.map((e, i) => <Incident key={i}>

                    <IncidentContent>
                        <IncidentTitle>{e.name} {(incidents.find((y) => y.id === e.id).done) ? (<small>(완료)</small>) : ''}</IncidentTitle>
                        <IncidentDescription>{e.text}</IncidentDescription>
                    </IncidentContent>

                    <IncidentRadioBox>

                        <Switch defaultChecked={e.id === incidentId} name='incidentId' type='radio' onClick={() => setCaseIncident(e.id)} />

                    </IncidentRadioBox>


                </Incident>)}

            </IncidentGroup>

            <View>
                <ViewBox>

                    <ViewContent>
                        {!!caseId && <ViewImg src={`/images/B/${plaintiff.src}.png`} />}
                        <ViewLabel>원고</ViewLabel>
                    </ViewContent>

                    <ViewContent>
                        {!!incidentId && <ViewImg src={`/images/C/${defendant.src}.png`} />}
                        <ViewLabel>피고</ViewLabel>
                    </ViewContent>

                </ViewBox>
            </View>

            <Center>
                <Button disabled={!defendant.id} onClick={handleNextPage}>다음</Button>
            </Center>

            <LoadImage src='' />

        </div>
    )
}

const IncidentGroup = styled.div`
padding-top: 8px;
padding-bottom: 8px;
`

const Incident = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 3px solid #E7E8E7;
`

const IncidentContent = styled.div`
padding: 6px 16px;
`

const IncidentTitle = styled.div`
font-size: 18px;
font-weight: 700;
`

const IncidentDescription = styled.div`
color: #5E5B69;
font-size: 15px;
line-height: 170%;
padding-top: 4px;
`

const IncidentRadioBox = styled.div`
text-align: right;
padding-right: 12px;
`

const View = styled.div`
background: #fff;
margin-top: 8px;
padding: 24px 0 6px;
`

const ViewBox = styled.div`
width: 95%;
display: flex;
justify-content: center;
margin: auto;
`

const ViewContent = styled.div`
padding: 16px;
width: 55%;
margin-top: auto;

&:nth-child(2) {
    width: 45%;
}
`

const ViewImg = styled.img`
width: 100%;
`

const ViewLabel = styled.div`
font-weight: 700;
text-align: center;
color: #5E5B69;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 32px;
padding-bottom: 32px;
`

type ButtonProps = {
    disabled?: boolean
}

const Button = styled.div`
background: #9BC802;
color: #fff;
padding: 8px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;

${({ disabled }: ButtonProps) => `${disabled && 'background: #BABABA;' || ''}`}
`

export default IndexPage