import styled from '@emotion/styled'

import { useCallback, useEffect, useState } from 'react'

import Link from 'next/link'

import Stats from '../../components/Stats'
import Collapse from '../../components/Collapse'
import CollapseOption from '../../components/CollapseOption'
import CollapseInput from '../../components/CollapseInput'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { people_list, to_plaintiff } from '../../utils/assets'

const IndexPage = () => {

    const { caseId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId
    }))

    const router = useRouter()

    const [opend, setOpend] = useState(true)
    const [checked, setChecked] = useState(false)
    const [people, setPeople] = useState('')

    const handleCasePeopleImage = (id) => {

        const plaintiff = people_list.find(e => e.id === id)

        setPeople(plaintiff.src)

    }

    const handleOpend = useCallback(() => {

        setOpend(!opend)

    }, [opend])

    const handleCheck = ({ target: { checked } }) => {

        setChecked(checked)

    }

    const handleInput = ({ target: { value } }) => {

        const elem: HTMLInputElement = window.document.querySelector('input[name="send"]:checked')

        if (value && elem) {

            elem.checked = false

        }

        setChecked(value)

    }

    const handleNextPage = useCallback(() => {

        router.push('/quiz/7')

    }, [router])

    useEffect(() => {

        if (caseId) {

            handleCasePeopleImage(caseId)

        }

    }, [caseId])

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

            <View>
                <ViewBox>

                    <DefendantImg src={`/images/F_사람_이미지/${people}.png`} />

                </ViewBox>
            </View>

            <Collapse
                title={'원고에게 하고 싶은 말이 있나요?'}
                checked={checked}
                opend={opend}
                onOpen={handleOpend}
            >

                {to_plaintiff.map(e => <CollapseOption
                    title={e.name}
                    name='send'
                    type='radio'
                    onClick={handleCheck}
                />)}

                <CollapseInput
                    placeholder='직접 전달하고 싶은 말을 적어주세요'
                    onChange={handleInput}
                />

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
font-weight: 700;
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
padding: 24px 0 26px;
min-height: 110px;
`

const ViewBox = styled.div`
width: 90%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: auto;
`

const DefendantImg = styled.img`
width: 100%;
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
padding: 8px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;
`

export default IndexPage