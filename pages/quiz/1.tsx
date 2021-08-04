import styled from '@emotion/styled'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'

import Stats from '../../components/Stats'
import Switch from '../../components/Switch'

import { useDispatch, useSelector } from 'react-redux'
import { setControlIncident } from '../../services/actions/controlActions'

import { case_quiz1 } from '../../utils/assets'

const cases = case_quiz1

const IndexPage = () => {

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

        animateScroll.scrollToTop()

        dispatch(setControlIncident(incidentInfo.id))

    }

    const setCaseMessages = (caseId) => {
        setCasePlaintiff(caseId)
        setMessages(cases.messages.find(e => e.id === caseId).data)
    }

    useEffect(() => {

        if (caseId) {
            setCaseMessages(caseId)

            animateScroll.scrollToBottom()
        }

    }, [caseId])

    useEffect(() => {

        if (incidentId) {
            setCaseIncident(incidentId)
        }

    }, [incidentId])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/info/3'>
                        <BackIcon src='/icons/angle-left-solid_w.svg' />
                    </Link>
                </HeaderItemPadding>
                <HeaderItemPadding>
                    <TitleBox>
                        <Title>상태 메시지</Title>
                        <Timer>남은시간 [02:25] 판결 [5]</Timer>
                    </TitleBox>
                </HeaderItemPadding>
                <HeaderItemPadding />

            </Header>

            <Stats type={1} />

            <View>
                <ViewBox>

                    <ViewContent>
                        {!!caseId && <ViewImg src={`/images/B_원고_이미지/${plaintiff.src}.png`} />}
                        <ViewLabel>원고</ViewLabel>
                    </ViewContent>

                    <ViewContent>
                        {!!incidentId && <ViewImg src={`/images/C_피고_이미지/${defendant.src}.png`} />}
                        <ViewLabel>피고</ViewLabel>
                    </ViewContent>

                </ViewBox>
            </View>

            <IncidentGroup>

                {messages.map((e, i) => <Incident key={i}>

                    <IncidentContent>
                        <IncidentTitle>{e.name} {(incidents.find((y) => y.id === e.id).done) ? '(완료)' : ''}</IncidentTitle>
                        <IncidentDescription>{e.text}</IncidentDescription>
                    </IncidentContent>

                    <IncidentRadioBox>

                        <Switch defaultChecked={e.id === incidentId} name='incidentId' type='radio' onClick={() => setCaseIncident(e.id)} />

                    </IncidentRadioBox>


                </Incident>)}

            </IncidentGroup>

        </div>
    )
}

const IncidentGroup = styled.div``

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
font-weight: 500;
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

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 65px;
margin-bottom: 16px;
margin: auto;
background: #504D5D;
color: #fff;
`

const HeaderItemPadding = styled.div`
width: 25%;

&:nth-child(2) {
  width: 50%;
}
`

const TitleBox = styled.div`
text-align: center;
`

const Title = styled.div`
font-size: 22px;
font-weight: 500;
`

const Timer = styled.div`
color: #77757F;
font-size: 14px;
`

const BackIcon = styled.img`
width: 16px;
cursor: pointer;
padding-left: 16px;
`

const View = styled.div`
background: #fff;
margin-top: 8px;
padding: 24px 0 6px;
box-shadow: 0 3px 3px 0 rgba(0,0,0,0.1);
min-height: 321px;
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
font-weight: 500;
text-align: center;
color: #5E5B69;
`

export default IndexPage