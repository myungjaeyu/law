import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize'

import { media } from '../config/styles'

import { useDispatch, useSelector } from 'react-redux'
import { saveControlStorage } from '../services/actions/controlActions'
import { useEffect, useState } from 'react'

import { case_list, people_list } from '../utils/assets'
import { isEndWithConsonant } from '../utils/text'

const IndexPage = () => {

    const { name, caseId, incidentId, laws, penal } = useSelector((state: any) => ({
        name: state.control.data.name,
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId,
        laws: state.control.data.laws,
        penal: state.control.data.penal
    }))

    const dispatch = useDispatch()

    const router = useRouter()

    const [defendantName, setDefendantName] = useState('')

    const handleCapture = () => {
        alert('log')
    }

    const handleCaseDefendantName = (id, subId) => {

        const caseInfo = people_list.find(e => e.id === id)

        const defendant = caseInfo.data.find(e => e.id === subId)

        setDefendantName(defendant.name)

    }

    const handleNextPage = () => {

        router.push('/info/3')

        dispatch(saveControlStorage())

    }

    useEffect(() => {

        if (caseId && incidentId) {

            handleCaseDefendantName(caseId, incidentId)

        }

    }, [caseId, incidentId])

    return (
        <div>

            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/'>
                        <BackIcon src='/icons/angle-left-solid.svg' />
                    </Link>
                </HeaderItemPadding>
                <HeaderItemPadding>
                    <Title>판결문</Title>
                </HeaderItemPadding>
                <HeaderItemPadding />
            </Header>

            <Main>
                <MainLogo src='/images/E_기타_이미지/판결_이미지.png' />
            </Main>

            <Card>
                <Label>판사</Label>
                <Text>{name}</Text>
            </Card>

            <Card>
                <Label>사건</Label>
                {!!caseId && <Text>{case_list.find(e => e.id === caseId).name} 사건카드{incidentId}</Text>}
            </Card>

            <Card>
                <Label>사건유형</Label>
                <Text>사이버 따돌림</Text>
            </Card>

            {laws.map((law, i) => <Card key={i}>
                <Label>법률근거 {i + 1}</Label>
                <Text>{law}</Text>
            </Card>)}

            <Card>
                <Label>판결</Label>
                <Text>
                    {`피고 ${defendantName}에 ${penal}${isEndWithConsonant(penal) ? '을' : '를'} 구형한다`}
                </Text>
            </Card>

            <Card>
                <Label style={{ paddingRight: '4px' }}>소감</Label>
                <ReviewInput placeholder='소감문을 작성해주세요' spellCheck={false} />
            </Card>

            <Center>
                <Button
                    onClick={handleCapture}
                >
                    판결문 저장
                </Button>
                <Button
                    background={'#5B9BF9'}
                    onClick={handleNextPage}
                >
                    새로운 사건 판결
                </Button>
            </Center>

        </div>
    )
}

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 95%;
height: 45px;
margin-bottom: 16px;
margin: auto;
`

const HeaderItemPadding = styled.div`
width: 25%;

&:nth-child(2) {
  width: 50%;
}
`

const BackIcon = styled.img`
width: 16px;
cursor: pointer;
`

const Title = styled.div`
font-size: 20px;
font-weight: 700;
text-align: center;
`

const MainLogo = styled.img`
width: 65%;
margin: auto;
margin-top: 16px;
`

const Main = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-top: 8px;
margin-bottom: 16px;
border-bottom: 1px solid #ccc;
`

const Card = styled.div`
background: #fff;
display: flex;
width: 95%;
max-width: 550px;
margin: auto;
padding: 14px 0;
font-size: 18px;
`
const Label = styled.div`
height: fit-content;
text-align: right;
font-weight: 700;
color: #364B6C;
border-right: 1px solid #ccc;
margin-right: 8px;
padding-right: 8px;
width: 30%;

${media.phone} {
    width: 20%;
}
`

const Text = styled.div`
color: #5167A3;
padding-right: 8px;
white-space: pre-wrap;
word-wrap: break-word;
width: 70%;

${media.phone} {
    width: 80%
}
`

const Center = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin-top: 24px;
padding-bottom: 16px;
`

type ButtonProps = {
    background?: string
}

const Button = styled.div`
background: ${({ background }: ButtonProps) => background ? background : '#F3A968'};
color: #fff;
font-size: 18px;
padding: 8px 12px;
width: 160px;
text-align: center;
border-radius: 16px;
cursor: pointer;
margin-bottom: 12px;
`

const ReviewInput = styled(TextareaAutosize)`
color: #5167A3;
font-size: 18px;
border: none;
outline: none;
width: 70%;
padding: 0;
`

export default IndexPage