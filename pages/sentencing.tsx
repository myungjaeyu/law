import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { media } from '../config/styles'

import { useDispatch, useSelector } from 'react-redux'
import { saveControlStorage } from '../services/actions/controlActions'
import { useEffect } from 'react'

import { case_list } from '../utils/assets'

const IndexPage = () => {

    const { name, caseId, incidentId, laws, penal } = useSelector((state: any) => ({
        name: state.control.data.name,
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId,
        laws: state.control.laws,
        penal: state.control.penal
    }))

    const dispatch = useDispatch()

    const router = useRouter()

    const handleCapture = () => {
        alert('log')
    }

    const handleNextPage = () => {

        router.push('/info/3')

        dispatch(saveControlStorage())

    }

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

            <Card>
                <Label>법률근거1</Label>
                <Text>학교폭력 예방법 제 17조</Text>
            </Card>

            <Card>
                <Label>판결</Label>
                <Text>
                    {
                        `피고 B반 학생 3명에
피해학생 및 신고고발 학생에 대한 접촉, 협박 및 보복 행위의 금지를 내린다
`}
                </Text>
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
font-weight: 500;
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
padding: 16px 0;
font-size: 18px;
`
const Label = styled.div`
height: fit-content;
text-align: right;
font-weight: 500;
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

export default IndexPage