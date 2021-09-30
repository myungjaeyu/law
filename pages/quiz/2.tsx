import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { animateScroll } from 'react-scroll'

import Stats from '../../components/Stats'
import Alert from '../../components/Alert'
import Header from '../../components/Header'

import { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setControlIncidentType } from '../../services/actions/controlActions'

import { case_quiz2, incident_type_right } from '../../utils/assets'

const DynamicCarousel: any = dynamic(
    () => import('react-spring-3d-carousel'),
    { ssr: false }
)

const cases = case_quiz2

const IndexPage = () => {

    const router = useRouter()

    const { caseId, incidentId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId
    }))

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [slideId, setSlideId] = useState(0)
    const [slides, setSlides] = useState([])
    const [opendModal, setOpendModal] = useState(false)
    const [isRight, setIsRight] = useState(false)

    const handleSlideNext = useCallback(() => {

        let id = slideId === cases.length - 1 ? 0 : slideId + 1

        setSlideId(id)

        setTitle(cases.find((e) => e.id === id).name)
        setDescription(cases.find((e) => e.id === id).text)        

    }, [slideId])

    const handleSlidePrev = useCallback(() => {

        let id = slideId === 0 ? cases.length - 1 : slideId - 1

        setSlideId(id)

        setTitle(cases.find((e) => e.id === id).name)
        setDescription(cases.find((e) => e.id === id).text)

    }, [slideId])

    const handleNextPage = useCallback(() => {

        const caseInfo = incident_type_right.find((e) => e.id === caseId)

        const incident_right = caseInfo.data.find((e) => e.id == incidentId)

        const slideName = case_quiz2[slideId].name

        setOpendModal(true)
        setIsRight(incident_right.type === slideName)

    }, [router, slideId, caseId, incidentId, opendModal])

    const handleOk = useCallback(() => {

        setOpendModal(false)

        if (isRight) {

            dispatch(setControlIncidentType(slideId))

            router.push('/quiz/3')

        }

    }, [router, dispatch, isRight])

    useEffect(() => {

        setSlides(cases.map((e, i) => ({
            key: `${e.id}`,
            content: <img src={`/images/D/${e.src}.png`} alt={`type_${e.id}`} />
        })))

        animateScroll.scrollToBottom()

        setTitle(cases.find((e) => e.id === 0).name)
        setDescription(cases.find((e) => e.id === 0).text)

    }, [])

    return (
        <div>
            <Header link={'/quiz/1'} />

            <Stats type={2} />

            <CarouselTitle>
                {cases.find((e) => e.id === slideId).name}
            </CarouselTitle>

            <CarouselGroup>
                <CarouselBox>
                    <DynamicCarousel goToSlide={slideId} offsetRadius={2} slides={slides} />
                </CarouselBox>
                <CarouselControl>
                    <div onClick={handleSlidePrev}></div>
                    <div onClick={handleSlideNext}></div>
                </CarouselControl>
                <CarouselIndicateBox>
                    <CarouselIndicate src='/icons/arrow-alt-circle-left-regular.svg' />
                    <CarouselIndicate src='/icons/arrow-alt-circle-right-regular.svg' />
                </CarouselIndicateBox>
            </CarouselGroup>

            <CarouselStepGroup>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((e) => <CarouselStep key={e} selected={e === slideId} />)}
            </CarouselStepGroup>

            <CarouselDescription>
                {description}
            </CarouselDescription>

            <Center>
                <Button onClick={handleNextPage}>다음</Button>
            </Center>

            <Alert opend={opendModal} text={isRight ? '정확한 사건 유형을 찾았습니다.' : '사건유형을 다시 고르세요.'} onOk={handleOk} />

        </div>
    )
}

const CarouselGroup = styled.div`
position: relative;
overflow: hidden;
`

const CarouselIndicateBox = styled.div`
position: absolute;
top: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: space-between;
align-items: center;
z-index: 2;
`

const CarouselIndicate = styled.img`
width: 32px;
padding: 0 8px;
`

const CarouselTitle = styled.div`
font-size: 16px;
font-weight: 700;
text-align: center;
margin-top: 18px;
margin-bottom: 8px;
`

const CarouselBox = styled.div`
width: 50%;
height: 200px;
margin: 0 auto;
`

const CarouselControl = styled.div`
display: flex;
position: absolute;
width: 100%;
height: 100%;
top: 0;
z-index: 3;
cursor: pointer;

div{
    width: 50%;
}
`

const CarouselStepGroup = styled.div`
display: flex;
margin: auto;
margin-top: 24px;
width: 85%;
`

type CarouselStepProps = {
    selected?: boolean
}

const CarouselStep = styled.div`
width: 12.5%;
height: 6px;
background: #D5D5D5;

${({ selected }: CarouselStepProps) => selected ? 'background: #9BC802;' : ''}
`

const CarouselDescription = styled.div`
color: #5E5B69;
padding-top: 16px;
line-height: 170%;
width: 85%;
min-height: 140px;
margin: auto;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
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