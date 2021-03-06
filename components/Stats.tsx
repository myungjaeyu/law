import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { case_list, case_quiz2, case_quiz1 } from '../utils/assets'
import { media } from '../config/styles'

const descriptions = [
    '',
    '해결하고 싶은 사건카드를 선택하세요',
    '사건카드와 관련된 사건유형을 선택하세요',
    '사건유형과 관련된 법률을 선택하세요',
    '피고에게 처벌을 내려주세요',
    '일상회복을 위한 의견을 적어보세요'
]

type Props = {
    type: number
}

const IndexPage = ({ type }: Props) => {

    const { caseId, incidentId, incidentTypeId, laws, penal } = useSelector((state: any) => ({
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId,
        incidentTypeId: state.control.data.incidentTypeId,
        laws: state.control.data.laws,
        penal: state.control.data.penal
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

                        // const laws_data = laws.reduce((acc, cur) => {

                        //     switch (cur) {
                        //         case '학교폭력예방법 제 17조':
                        //             cur = '학교폭력예방법'
                        //             break
                        //         case '정보통신망법 제70조 1항':
                        //         case '정보통신망법 제70조 2항':
                        //         case '정보통신망법 제74조':
                        //             cur = '정보통신망법'
                        //             break
                        //         case '성폭력처벌법 제13조':
                        //         case '성폭력처벌법 제14조 1항':
                        //         case '성폭력처벌법 제14조의 2 1항':
                        //             cur = '성폭력처벌법'
                        //             break
                        //         default:
                        //             break
                        //     }

                        //     acc.push(cur)

                        //     return acc
                        // }, [])

                        cur.text = laws.join(', ')
                        break
                    case 4:
                        cur.text = penal
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

                {status.map((e, i) =>
                    <CardBox key={e.id}>
                        <CardContent>
                            <Card onClick={() => handleClick(e.id)}>
                                <CardBadge disabled={!e.text && !e.is_proceeding}>{e.id}</CardBadge>
                                <CardText proceed={e.is_proceeding} ><div>{e.is_proceeding ? '진행중' : e.text}</div></CardText>
                                <CardImg src={`/images/E/Box_${e.is_proceeding ? 'Proceeding' : e.text ? 'Activate' : 'Disabled'}.png`} />
                            </Card>

                            <CardArrowBox>
                                {status.length - 1 !== i && <CardArrow src='/images/E/Arrow.png' />}
                            </CardArrowBox>

                        </CardContent>

                        <CardLabel>{e.label}</CardLabel>

                    </CardBox>
                )}

            </CardGroup>

            <Text>
                {!!(caseId && incidentId) && case_quiz1.messages.find(e => e.id === caseId).data.find(e => e.id === incidentId).text}
            </Text>


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
font-size: 18px;
margin-top: 16px;
color: #4DA1CC;
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
width: 77%;
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
z-index: 1;
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
font-size: 11px;
color: #fff;
white-space: pre-wrap;
word-wrap: break-word;
line-height: 130%;

display: flex;
justify-content: center;
align-items: center;
height: 100%;

overflow: hidden;

div {
    width: 90%;
}

${({ proceed }: CardTextProps) => proceed ? 'color: #4DA1CC;' : ''}

${media.phone} {
    font-size: 12px;
}
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

const Text = styled.div`
color #fff;
color: #5E5B69;
font-size: 14px;
line-height: 170%;
padding: 4px 8px 0;
`

export default IndexPage