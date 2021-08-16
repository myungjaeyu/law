import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { useEffect, useState, useCallback } from 'react'

import Stats from '../../components/Stats'
import Switch from '../../components/Switch'
import Collapse from '../../components/Collapse'
import Alert from '../../components/Alert'
import Confirm from '../../components/Confirm'
import FixedCard from '../../components/FixedCard'
import Header from '../../components/Header'

import { useDispatch, useSelector } from 'react-redux'

import { case_quiz3, law_right } from '../../utils/assets'
import { setControlLaws } from '../../services/actions/controlActions'
import { media } from '../../config/styles'

const cases = case_quiz3

const IndexPage = () => {

    const router = useRouter()

    const { caseId, incidentId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId
    }))

    const dispatch = useDispatch()

    const [collapses, setCollapses] = useState([])
    const [checks, setChecks] = useState([])
    const [hints, setHints] = useState([])
    const [opendVerifyModal, setOpendVerifyModal] = useState(false)
    const [opendConfirmModal, setOpendConfirmModal] = useState(false)
    const [isRight, setIsRight] = useState(false)
    const [isSimilar, setIsSimilar] = useState(false)
    const [selectedSimilarLaw, setSelectedSimilarLaw] = useState({})
    const [selectedSimilarLawTarget, setSelectedSimilarLawTarget] = useState(null)

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

    const handleCheck = (target, targetName, id, subId) => {

        let verifyType = 0
        const key = `${id}-${subId}`

        if (target.checked) {

            const caseInfo = law_right.find((e) => e.id === caseId)

            const _raw = caseInfo.data.find((e) => e.id === incidentId)

            if (_raw.right.find((e) => e === targetName)) {

                verifyType = 1
                setIsRight(true)

            } else if (_raw.similar.find((e) => e === targetName)) {

                verifyType = 2
                setIsSimilar(true)

            } else {

                setIsRight(false)
                setIsSimilar(false)

            }

            if (verifyType === 0) {

                target.checked = false

            } else {

                const currentLaw = {
                    key,
                    id,
                    subId
                }



                if (verifyType === 1) {
                    setChecks([...checks, { ...currentLaw }])
                } else {

                    setSelectedSimilarLaw(currentLaw)
                    setSelectedSimilarLawTarget(target)

                    target.checked = false

                }

            }

            setOpendVerifyModal(true)

        } else {

            setChecks(checks.filter(e => e.key !== key))

        }

    }

    const closedVerifyModal = () => {
        setOpendVerifyModal(false)
        setIsRight(false)
        setIsSimilar(false)
    }

    const handleVerifyOk = useCallback(() => {

        closedVerifyModal()

    }, [])

    const handleVerifySimilarOk = useCallback(() => {

        if (selectedSimilarLaw) {

            setChecks([
                ...checks,
                { ...selectedSimilarLaw }
            ])

            selectedSimilarLawTarget.checked = true

            closedVerifyModal()

        }

    }, [checks, selectedSimilarLaw, selectedSimilarLawTarget])

    const handleVerifySimilarCancel = useCallback(() => {

        closedVerifyModal()

    }, [])

    const handleNextPage = useCallback(() => {

        if (hints.length <= checks.length) {

            const laws = checks.map((e) => cases.find(x => x.id === e.id).data.find(x => x.id === e.subId).name)

            dispatch(setControlLaws(laws))

            router.push('/quiz/4')

        } else {

            if (checks.length) {

                setOpendConfirmModal(true)

            }

        }

    }, [dispatch, router, hints, checks])

    const handleConfirmOk = useCallback(() => {

        setOpendConfirmModal(false)

    }, [router, dispatch])

    const handleConfirmCancel = useCallback(() => {

        setOpendConfirmModal(false)

        const laws = checks.map((e) => cases.find(x => x.id === e.id).data.find(x => x.id === e.subId).name)

        dispatch(setControlLaws(laws))

        router.push('/quiz/4')

    }, [dispatch, router, checks])

    useEffect(() => {

        setCollapses(cases.map((e) => ({
            id: e.id,
            opend: false
        })))

        if (caseId && incidentId) {

            const caseInfo = law_right.find((e) => e.id === caseId)

            const _raw = caseInfo.data.find((e) => e.id === incidentId)

            setHints(_raw.right)

        }

    }, [caseId, incidentId])

    useEffect(() => {

        window.document.body.style.overflow = 'hidden'

        return () => {

            window.document.body.style.overflow = 'visible'

        }
    })

    return (
        <Container>
            <FixedCard>
                <Header link={'/quiz/2'} />

                <Stats type={3} />
            </FixedCard>

            <View>
                <ViewBox>
                    <ViewTitle>- 선택한 법률 -</ViewTitle>

                    <ViewCheckCard>

                        <ViewCheckPaddingCard />

                        <ViewCheckContentCard>

                            {checks.map((e, i) => <ViewCheckText key={i}>
                                <ViewCheckIcon src='/icons/check-circle-regular.svg' /> {cases.find(x => x.id === e.id).data.find(x => x.id === e.subId).name}
                            </ViewCheckText>)}

                            {hints.slice(checks.length).map((e) => <ViewCheckText key={e}>
                                <ViewCheckIcon src='/icons/check-circle-regular.svg' />
                                <ViewCheckHint />
                            </ViewCheckText>)}

                        </ViewCheckContentCard>

                    </ViewCheckCard>

                </ViewBox>
            </View>

            <LawGroup>

                {cases.map((x) => <Collapse
                    title={x.name}
                    key={x.id}
                    checked={getChecked(x.id)}
                    opend={getOpend(x.id)}
                    onOpen={() => handleOpend(x.id)}
                >
                    {x.data.map((y) => <LawSub key={y.id}>

                        <LawSubHeader>
                            <LawSubTitle>{y.name}</LawSubTitle>
                            <LawToggleBox>

                                <Switch name='incidentId' type='checkbox' onClick={({ target }) => handleCheck(target, y.name, x.id, y.id)} />

                            </LawToggleBox>
                        </LawSubHeader>
                        <LawContent>{y.text}</LawContent>

                    </LawSub>)}

                </Collapse>)}

            </LawGroup>

            <Center>
                <Button disabled={!checks.length} onClick={handleNextPage}>다음</Button>
            </Center>

            {!isSimilar ? <Alert
                opend={opendVerifyModal}
                text={isRight ? '정확한 법률 근거를 찾았습니다.' : '부적절한 법률 근거입니다. 다시 선택하십시오.'}
                onOk={handleVerifyOk}
            /> :
                <Confirm
                    opend={opendVerifyModal}
                    text='보다 정확한 법률로 처벌할 수 있습니다. 다시 검토하시겠습니까?'
                    onOk={handleVerifySimilarOk}
                    onCancel={handleVerifySimilarCancel}
                    okText='아니요'
                    cancelText='예'
                />}

            <Confirm
                opend={opendConfirmModal}
                text={'피고를 처벌할 법륜 근거가 더 있습니다. 이대로 판결 하시겠습니까?'}
                onOk={handleConfirmOk}
                onCancel={handleConfirmCancel}
                okText='아니요'
                cancelText='예'
            />

        </Container>
    )
}

const Container = styled.div`
height: 100vh;
overflow-x: hidden;
`

const LawGroup = styled.div``

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

const View = styled.div`
background: #fff;
margin-top: 8px;
padding: 24px 0 28px;
`

const ViewBox = styled.div`
width: 95%;
display: flex;
flex-direction: column;
margin: auto;
`

const ViewTitle = styled.div`
font-weight: 700;
margin-bottom: 8px;
text-align: center;
`

const ViewCheckCard = styled.div`
display: flex;
`

const ViewCheckPaddingCard = styled.div`
width: 20%;
`

const ViewCheckContentCard = styled.div`
width: 80%;
`

const ViewCheckText = styled.div`
color: #565656;
margin-bottom: 4px;
`

const ViewCheckHint = styled.div`
display: inline-block;
width: 80%;
max-width: 340px;
border-bottom: 1px dashed #565656;
margin-left: 6px;
`

const ViewCheckIcon = styled.img`
display: inline-block;
width: 16px;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 32px;

padding-bottom: 92px;

${media.phone} {
    padding-bottom: 32px;
}
`

type ButtonProps = {
    disabled?: boolean
}

const Button = styled.div`
background: #9BC802;
color: #fff;
padding: 8px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;

${({ disabled }: ButtonProps) => `${disabled && 'background: #BABABA;' || ''}`}
`

export default IndexPage