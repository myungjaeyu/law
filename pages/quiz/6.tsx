import styled from '@emotion/styled'

import { useCallback, useEffect, useState } from 'react'

import Stats from '../../components/Stats'
import Collapse from '../../components/Collapse'
import CollapseOption from '../../components/CollapseOption'
import CollapseInput from '../../components/CollapseInput'
import FixedCard from '../../components/FixedCard'
import Header from '../../components/Header'

import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { people_list, to_plaintiff } from '../../utils/assets'
import { media } from '../../config/styles'

const IndexPage = () => {

    const { caseId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId
    }))

    const router = useRouter()

    const [checked, setChecked] = useState(false)
    const [people, setPeople] = useState('')

    const handleCasePeopleImage = (id) => {

        const plaintiff = people_list.find(e => e.id === id)

        setPeople(plaintiff.src)

    }

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

    useEffect(() => {

        window.document.body.style.overflow = 'hidden'

        return () => {

            window.document.body.style.overflow = 'visible'

        }
    })

    return (
        <Container>
            <FixedCard>
                <Header link={'/quiz/5'} />

                <Stats type={5} />
            </FixedCard>

            <View>
                <ViewBox>

                    <DefendantImg src={`/images/F/${people}.png`} />

                </ViewBox>
            </View>

            <Collapse
                title={'원고에게 하고 싶은 말이 있나요?'}
                checked={checked}
                opend={true}
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

        </Container>
    )
}

const Container = styled.div`
height: 100vh;
overflow-x: hidden;
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