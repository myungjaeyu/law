import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { case_list, case_quiz2 } from '../utils/assets'

const descriptions = [
    '',
    '해결하고 싶은 사건카드를 선택하세요',
    '사건카드와 관련된 사건유형을 선택하세요',
    '사건유형과 관련된 법률을 선택하세요',
    '피고에게 처벌을 내려주세요',
    '피고의 일상 회복을 위한 의견을 적어보세요'
]

type Props = {
    type: number
}

const IndexPage = ({ type }: Props) => {

    const { caseId, incidentId, incidentTypeId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId,
        incidentTypeId: state.control.data.incidentTypeId
    }))

    const router = useRouter()

    const [status, setStatus] = useState([
        { id: 1, text: '', label: '사건카드', is_proceeding: true },
        { id: 2, text: '', label: '사건유형', is_proceeding: false },
        { id: 3, text: '', label: '법률', is_proceeding: false },
        { id: 4, text: '', label: '양형선고', is_proceeding: false },
        { id: 5, text: '', label: '일상회복', is_proceeding: false }
    ])

    const handleClick = (id) => {

    }

    useEffect(() => {

        setStatus(status.reduce((acc, cur) => {

            if (cur.id < type) {

                switch (cur.id) {
                    case 1:
                        if (incidentId) {
                            let _name = case_list.find((e) => e.id === caseId).name

                            if (_name === '상태메세지') {
                                _name = '상태\n메세지'
                            }

                            cur.text = `${_name} ${_name.length === 4 ? '\n' : ''}${incidentId}`

                        }
                        break
                    case 2:
                        cur.text = case_quiz2.find(e => e.id === incidentTypeId).name
                        cur.text = cur.text.replace('사이버', '사이버\n')
                        break
                    case 3:
                        cur.text = '법률'
                        break
                    case 4:
                        cur.text = '판결'
                        break
                    default: break
                }

            }

            cur.is_proceeding = cur.id === type

            acc.push(cur)

            return acc
        }, []))


    }, [type, caseId, incidentId])

    return (
        <Container>

            <Center>
                <Description>{descriptions[type]}</Description>
            </Center>

            <CardGroup>

                {status.map((e) =>
                    <CardBox key={e.id}>
                        <CardContent>
                            <Card onClick={() => handleClick(e.id)}>
                                <CardBadge disabled={!e.text && !e.is_proceeding}>{e.id}</CardBadge>
                                <CardText proceed={e.is_proceeding} ><div>{e.is_proceeding ? '진행중' : e.text}</div></CardText>
                                <CardImg src={`/images/E_기타_이미지/Box_${e.is_proceeding ? 'Proceeding' : e.text ? 'Activate' : 'Disabled'}.png`} />
                            </Card>

                            <CardArrowBox>
                                <CardArrow src='/images/E_기타_이미지/Arrow.png' />
                            </CardArrowBox>

                        </CardContent>

                        <CardLabel>{e.label}</CardLabel>

                    </CardBox>
                )}

            </CardGroup>

        </Container>
    )
}

const Container = styled.div`
background: #fff;
padding-bottom: 16px;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

const Description = styled.div`
font-weight: 700;
margin-top: 16px;
`

const CardGroup = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
margin-top: 16px;
`

const CardBox = styled.div`
width: 20%;
`

const CardContent = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const Card = styled.div`
width: 80%;
position: relative;
`

const CardImg = styled.img`
width: 100%;
`

type CardBadgeProps = {
    disabled: boolean
}


const CardBadge = styled.div`
position: absolute;
top: -8px;
right: -8px;
background: #4DA1CC;
border: 3px solid #fff;
font-size: 14px;
color: #fff;
border-radius: 100px;
width: 20px;
height: 20px;
text-align: center;

${({ disabled }: CardBadgeProps) => disabled ? 'background: #D0D0D0; color: #fff;' : ''}
`

type CardTextProps = {
    proceed: boolean
}

const CardText = styled.div`
width: 100%;
position: absolute;
text-align: center;
font-size: 12px;
color: #fff;
top: 35%;
white-space: pre-wrap;
word-wrap: break-word;
line-height: 130%;

display: flex;
justify-content: center;

div {
    width: 90%;
}

${({ proceed }: CardTextProps) => proceed ? 'color: #4DA1CC;' : ''}
`

const CardLabel = styled.div`
text-align: center;
padding-right: 20%;
font-size: 12px;
color: #8B8B8B;
`

const CardArrowBox = styled.div`
width: 13%;
padding: 2%;
`

const CardArrow = styled.img`
width: 100%;
`

export default IndexPage