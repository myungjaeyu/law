import styled from '@emotion/styled'

import { useCallback, useState } from 'react'

import Link from 'next/link'

import Stats from '../../components/Stats'
import Collapse from '../../components/Collapse'
import CollapseCard from '../../components/CollapseCard'

import { useRouter } from 'next/router'

import { to_recovery } from '../../utils/assets'

const IndexPage = () => {

    const router = useRouter()

    const [opend, setOpend] = useState(true)
    const [checked, setChecked] = useState(false)

    const handleOpend = useCallback(() => {

        setOpend(!opend)

    }, [opend])

    const handleCheck = () => {

        const elem: HTMLInputElement = window.document.querySelector('input[name="recovery"]:checked')

        setChecked(!!elem)

    }

    const handleNextPage = useCallback(() => {

        router.push('/sentencing')

    }, [router])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/quiz/4'>
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

            <Stats type={5} />

            <Collapse
                title={'원고가 일상을 회복할 수 있는 방법을 선택'}
                checked={checked}
                opend={opend}
                onOpen={handleOpend}
            >

                {to_recovery.map((e) =>
                    <CollapseCard
                        key={e.id}
                        name={'recovery'}
                        type={'checkbox'}
                        title={e.title}
                        description={`"${e.description}"`}
                        onClick={handleCheck}
                    />)}
            </Collapse>

            <Center>
                <Button onClick={handleNextPage}>다음</Button>
            </Center>

        </div>
    )
}

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

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 24px;
padding-bottom: 32px;
`

const Button = styled.div`
background: #9BC802;
color: #fff;
padding: 6px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;
`

export default IndexPage