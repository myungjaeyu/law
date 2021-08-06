import styled from '@emotion/styled'

import Link from 'next/link'

import Stats from '../../components/Stats'
import Collapse from '../../components/Collapse'
import CollapseOption from '../../components/CollapseOption'
import { Range } from 'react-range'

import { people_list, young_penalty, law_right } from '../../utils/assets'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { setControlPenal } from '../../services/actions/controlActions'

const IndexPage = () => {

    const { caseId, incidentId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId
    }))

    const dispatch = useDispatch()

    const router = useRouter()

    const [defendantName, setDefendantName] = useState('')
    const [penalty, setPanalty]: any = useState({})
    const [isFine, setIsFine] = useState(false)

    const [prison, setPrison] = useState(0)
    const [fine, setFine] = useState(0)

    const [isSchoolLaw, setIsSchoolLaw] = useState(false)
    const [isPenalLaw, setIsPenalLaw] = useState(false)

    const [isHighlightBorder, setIsHighlightBorder] = useState(true)

    const [collapses, setCollapses] = useState({
        young: {
            opend: false
        },
        penal: {
            opend: true
        },
        fine: {
            opend: true
        }
    })

    const handleCaseDefendantName = (id, subId) => {

        const caseInfo = people_list.find(e => e.id === id)

        const defendant = caseInfo.data.find(e => e.id === subId)

        setDefendantName(defendant.name)

    }

    const handleCheck = useCallback((checked, id) => {

        if (checked) {

            setPanalty(young_penalty.find(e => e.id === id))

            setIsHighlightBorder(false)

        }

        young_penalty.find(e => e.id === id)

    }, [penalty])

    const handleOpend = useCallback((key) => {

        setCollapses({
            ...collapses,
            [key]: {
                opend: !collapses[key].opend
            }
        })

    }, [collapses])

    const handlePrison = useCallback((values) => {

        setPrison(values[0])

        if (isFine) {
            setIsFine(false)
            setFine(0)
        }

        if (!penalty.name) {

            if (isHighlightBorder && values[0] > 0) setIsHighlightBorder(false)

            if (values[0] === 0 && !isHighlightBorder) setIsHighlightBorder(true)

        }

    }, [prison, isFine, penalty, isHighlightBorder])


    const handleFine = useCallback((values) => {

        setFine(values[0])

        if (!isFine) {
            setIsFine(true)
            setPrison(0)
        }

        if (!penalty.name) {

            if (isHighlightBorder && values[0] > 0) setIsHighlightBorder(false)

            if (values[0] === 0 && !isHighlightBorder) setIsHighlightBorder(true)

        }

    }, [fine, isFine, penalty, isHighlightBorder])

    const handleNextPage = useCallback(() => {

        if (!isHighlightBorder) {

            router.push('/quiz/5')

            dispatch(setControlPenal(`${penalty.name ? penalty.name : ''}${!!(penalty.name && (prison || fine)) ? ', ' : ''}${!!prison ? `징역 ${prison}개월` : ''}${!!fine ? `벌금 ${fine}만원` : ''}`))

        }

    }, [dispatch, router, penalty, prison, fine, isHighlightBorder])

    useEffect(() => {

        if (caseId && incidentId) {

            handleCaseDefendantName(caseId, incidentId)

            const caseInfo = law_right.find((e) => e.id === caseId)

            const _raw = caseInfo.data.find((e) => e.id === incidentId)

            setIsSchoolLaw(!!_raw.right.find(e => e === '학교폭력예방법 제 17조'))

            setIsPenalLaw(!!_raw.right.filter(e => e != '학교폭력예방법 제 17조').length)

        }

    }, [caseId, incidentId])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/quiz/3'>
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

            <Stats type={4} />

            <View>
                <ViewBox>

                    <PenaltyTitle>
                        <PenaltyIcon src='/images/E_기타_이미지/판결_아이콘.png' /> 판결!
                    </PenaltyTitle>
                    <PenaltyText>
                        피고 [<PenaltyHighlight>{defendantName}</PenaltyHighlight>] 에게
                    </PenaltyText>
                    <PenaltyText>[<PenaltyHighlight bordered={isHighlightBorder}>
                        {penalty.name && penalty.name}
                        {!!(penalty.name && (prison || fine)) && ', '}
                        {!!prison && `징역 ${prison}개월`}
                        {!!fine && `벌금 ${fine}만원`}
                    </PenaltyHighlight>]를 선고한다.</PenaltyText>

                </ViewBox>
            </View>

            {isSchoolLaw && <Collapse
                title={'학교폭력'}
                checked={!!penalty.name}
                opend={collapses.young.opend}
                onOpen={() => handleOpend('young')}
            >
                {young_penalty.map(e =>
                    <CollapseOption
                        key={e.id}
                        title={e.name}
                        name='penalty'
                        type='radio'
                        onClick={({ target: { checked } }) => handleCheck(checked, e.id)}
                    />
                )}

            </Collapse>}

            {isPenalLaw && <Collapse
                title={'징역'}
                checked={!!prison}
                opend={true}
            >

                <Panalty>
                    <PanaltyRange>

                        <PanaltyRangeLabel>
                            {prison} 개월
                        </PanaltyRangeLabel>

                        <PanaltyRangeBox>

                            <Range
                                step={1}
                                min={0}
                                max={100}
                                values={[prison]}
                                onChange={handlePrison}
                                renderTrack={({ props, children }) => <RangeTrack selected={!!prison} {...props} style={{ ...props.style }}>{children}</RangeTrack>}
                                renderThumb={({ props }) => <RangeThumb {...props} style={{ ...props.style }} />}
                            />

                        </PanaltyRangeBox>

                    </PanaltyRange>
                </Panalty>

            </Collapse>}

            {isPenalLaw && <Collapse
                title={'벌금'}
                checked={!!fine}
                opend={true}
            >

                <Panalty>
                    <PanaltyRange>

                        <PanaltyRangeLabel>
                            {fine} 만원
                        </PanaltyRangeLabel>

                        <PanaltyRangeBox>

                            <Range
                                step={1}
                                min={0}
                                max={100}
                                values={[fine]}
                                onChange={handleFine}
                                renderTrack={({ props, children }) => <RangeTrack selected={!!fine} {...props} style={{ ...props.style }}>{children}</RangeTrack>}
                                renderThumb={({ props }) => <RangeThumb {...props} style={{ ...props.style }} />}
                            />

                        </PanaltyRangeBox>

                    </PanaltyRange>
                </Panalty>

            </Collapse>}

            <Center>
                <Button disabled={isHighlightBorder} onClick={handleNextPage}>다음</Button>
            </Center>

        </div>
    )
}

const PanaltyRange = styled.div`
min-height: 100px;
display: flex;
align-items: center;
`
const PanaltyRangeLabel = styled.div`
width: 30%;
font-weight: 700;
`

const PanaltyRangeBox = styled.div`
width: 100%;
padding: 0 16px;
`

type RangeTrackProps = {
    selected?: boolean
}

const RangeTrack = styled.div`
height: 6px;
width: 100%;
background-color: #fff;
border: 2px solid #ccc;
border-radius: 14px;

${({ selected }: RangeTrackProps) => selected ? `background-color: #9BC802; border: 2px solid #9BC802;` : ''}
`

const RangeThumb = styled.div`
height: 42px;
width: 42px;
background-color: #fff;
border: 2px solid #ccc;
border-radius: 50%;
outline: none;
`

const PenaltyTitle = styled.div`
color: #9BC802;
font-size: 26px;
font-weight: 700;
display: flex;
align-items: center;
margin-bottom: 8px;
`

const PenaltyIcon = styled.img`
display: inline-block;
width: 30px;
margin-right: 4px;
`

const PenaltyText = styled.div`
font-size: 18px;
line-height: 170%;
`

type PenaltyHighlightProps = {
    bordered?: boolean
}

const PenaltyHighlight = styled.span`
color: #9BC802;
font-weight: 700;
min-width: 120px;

${({ bordered }: PenaltyHighlightProps) => bordered ? 'display: inline-block; border-bottom: 1px solid #9BC802;' : ''}
`

const Panalty = styled.div`
padding: 8px 16px;

border-top: 1px solid rgba(0,0,0,0.08);
`

const PenaltyOption = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

const PenaltyOptionIcon = styled.img`
display: inline-block;
width: 18px;
`

const PenaltyOptionText = styled.div`
color: #565656;
font-size: 18px;
`

const PenaltyOptionSwitchBox = styled.div``

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

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 24px;
padding-bottom: 32px;
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