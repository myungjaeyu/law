import styled from '@emotion/styled'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Collapse } from 'react-collapse'

import Stats from '../../components/Stats'
import Switch from '../../components/Switch'

import { case_quiz3 } from '../../utils/assets'

const cases = case_quiz3

const IndexPage = () => {

    const [collapses, setCollapses] = useState([])
    const [checks, setChecks] = useState([])
    const [hints, setHints] = useState([])

    const getOpend = (id) => {

        const collapse = collapses.find((e) => e.id === id)

        return collapse ? collapse.opend : false

    }

    const getChecked = (id) => {

        const isChecked = checks.find((e) => e.id === id)

        return isChecked

    }

    const handleOpend = (id) => {

        const newCollapses = collapses.reduce((acc, cur) => {


            if (cur.id === id) cur.opend = !cur.opend

            acc.push(cur)

            return acc

        }, [])

        setCollapses(newCollapses)

    }

    const handleCheck = (checked, id, subId) => {

        const key = `${id}-${subId}`

        if (checked) {

            setChecks([
                ...checks,
                {
                    key,
                    id,
                    subId
                }
            ])

        } else {

            setChecks(checks.filter(e => e.key !== key))

        }

    }

    useEffect(() => {

        setCollapses(cases.map((e) => ({
            id: e.id,
            opend: false
        })))

        setHints([0, 1, 2])

    }, [])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/quiz/2'>
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

            <Stats type={3} />

            <View>
                <ViewBox>
                    <ViewTitle>- 선택한 법률 -</ViewTitle>

                    {checks.map((e, i) => <ViewCheckText key={i}>
                        <ViewCheckIcon src='/icons/check-circle-regular.svg' /> {cases.find(x => x.id === e.id).data.find(x => x.id === e.subId).name}
                    </ViewCheckText>)}

                    {hints.slice(checks.length).map((e) => <ViewCheckText key={e}>
                        <ViewCheckIcon src='/icons/check-circle-regular.svg' />
                        <ViewCheckHint />
                    </ViewCheckText>)}

                </ViewBox>
            </View>

            <LawGroup>

                {cases.map((x) => <Law key={x.id}>

                    <LawHeader checked={getChecked(x.id)} onClick={() => handleOpend(x.id)}>
                        <LawTitle>{x.name}</LawTitle>
                        <LawIconBox>
                            <LawIcon src={`/icons/angle-${getOpend(x.id) ? 'down' : 'left'}-solid_${getChecked(x.id) ? 'w' : 'g'}.svg`}></LawIcon>
                        </LawIconBox>
                    </LawHeader>

                    <LawCollapse isOpened={getOpend(x.id)}>
                        {x.data.map((y) => <LawSub key={y.id}>

                            <LawSubHeader>
                                <LawSubTitle>{y.name}</LawSubTitle>
                                <LawToggleBox>

                                    <Switch name='incidentId' type='checkbox' onClick={({ target: { checked } }) => handleCheck(checked, x.id, y.id)} />

                                </LawToggleBox>
                            </LawSubHeader>
                            <LawContent>{y.text}</LawContent>

                        </LawSub>)}
                    </LawCollapse>

                </Law>)}

            </LawGroup>

        </div>
    )
}

const LawGroup = styled.div``
const Law = styled.div``

type LawHeaderProps = {
    checked?: boolean
}

const LawHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 18px;
padding: 6px 16px;
border-top: 1.5px solid #F1F1F1;
background: #fff;
color: #000;
cursor: pointer;

${({ checked }: LawHeaderProps) => checked ? 'border-top: 1.5px solid #9BC802; background: #9BC802; color: #fff;' : ''}
`
const LawTitle = styled.div``
const LawIconBox = styled.div``
const LawIcon = styled.img`
width: 25px;
height: 25px;
`
const LawCollapse = styled(Collapse)``
const LawSub = styled.div`
padding: 8px 16px;
`

const LawSubHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 6px;
`
const LawSubTitle = styled.div`
color: #565656;
font-size: 20px;
`

const LawToggleBox = styled.div``
const LawContent = styled.div`
color: #5E5B69;
white-space: pre-wrap;
word-wrap: break-word;
line-height: 170%;
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
min-height: 160px;
`

const ViewBox = styled.div`
width: 95%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: auto;
`

const ViewTitle = styled.div`
font-weight: 500;
margin-bottom: 8px;
`

const ViewCheckText = styled.div`
color: #565656;
margin-bottom: 4px;
`

const ViewCheckHint = styled.div`
display: inline-block;
width: 140px;
border-bottom: 1px dashed #565656;
margin-left: 6px;
`

const ViewCheckIcon = styled.img`
display: inline-block;
width: 16px;
`

export default IndexPage