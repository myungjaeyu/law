import styled from '@emotion/styled'

import { useCallback, useState, useEffect } from 'react'

import Link from 'next/link'

import Stats from '../../components/Stats'
import Collapse from '../../components/Collapse'
import CollapseCard from '../../components/CollapseCard'
import FixedCard from '../../components/FixedCard'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { to_recovery } from '../../utils/assets'
import { media } from '../../config/styles'

const recovery_titles = [
    '개인 심리치료 지원',
    '주변의 도움',
    '법적 지원',
    '경제적 지원',
    '사이버 폭력 흔적 삭제'
]

const IndexPage = () => {

    const { caseId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId
    }))

    const router = useRouter()

    const [checked, setChecked] = useState(false)

    const handleCheck = () => {

        const elem: HTMLInputElement = window.document.querySelector('input[name="recovery"]:checked')

        setChecked(!!elem)

    }

    const handleNextPage = useCallback(() => {

        router.push('/sentencing')

    }, [router])

    useEffect(() => {

        window.document.body.style.overflow = 'hidden'

        return () => {

            window.document.body.style.overflow = 'visible'

        }
    })

    return (
        <Container>
            <FixedCard>
                <Header>
                    <HeaderItemPadding>
                        <Link passHref href='/quiz/4'>
                            <BackIcon src='/icons/angle-left-solid_w.svg' />
                        </Link>
                    </HeaderItemPadding>
                    <HeaderItemPadding>
                        <TitleBox>
                            <Title>상태 메시지</Title>

                        </TitleBox>
                    </HeaderItemPadding>
                    <HeaderItemPadding />

                </Header>

                <Stats type={5} />
            </FixedCard>

            <Collapse
                title={'원고가 일상을 회복할 수 있는 방법을 선택'}
                checked={checked}
                opend={true}
            >

                {caseId && to_recovery.find(e => e.id === caseId).data.map((e, i) =>
                    <CollapseCard
                        key={e.id}
                        name={'recovery'}
                        type={'radio'}
                        title={recovery_titles[i]}
                        description={`"${e.name}"`}
                        onClick={handleCheck}
                    />)}
            </Collapse>

            <Center>
                <Button onClick={handleNextPage}>다음</Button>
            </Center>

        </Container>
    )
}

const Container = styled.div`
height: 100vh;
overflow-x: hidden;
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
font-weight: 700;
`

const BackIcon = styled.img`
width: 16px;
cursor: pointer;
padding-left: 16px;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 24px;
padding-bottom: 92px;

${media.phone} {
    padding-bottom: 32px;
}
`

const Button = styled.div`
background: #9BC802;
color: #fff;
padding: 8px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;
`

export default IndexPage