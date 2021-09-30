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

const IndexPage = () => {

    const router = useRouter()

    const { caseId, incidentId } = useSelector((state: any) => ({
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId
    }))

    const dispatch = useDispatch()

    const [title, setTitle] = useState('')

    const [slideId, setSlideId] = useState(0)
    const [slides, setSlides] = useState([])
    const [opendModal, setOpendModal] = useState(false)
    const [isRight, setIsRight] = useState(false)

    const handleSlideNext = useCallback(() => {

        let id = slideId === case_quiz2.length - 1 ? 0 : slideId + 1

        setSlideId(id)

        setTitle(case_quiz2.find((e) => e.id === id).name)

    }, [slideId])

    const handleSlidePrev = useCallback(() => {

        let id = slideId === 0 ? case_quiz2.length - 1 : slideId - 1

        setSlideId(id)

        setTitle(case_quiz2.find((e) => e.id === id).name)

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

        setSlides(case_quiz2.map((e, i) => ({
            key: `${e.id}`,
            content: <img src={`/images/D/${e.src}.png`} alt={`type_${e.id}`} />
        })))

        animateScroll.scrollToBottom()

        setTitle(case_quiz2.find((e) => e.id === 0).name)

    }, [])

    return (
        <div>
            <Header link={'/quiz/1'} />

            <Stats type={2} />

            <CarouselTitle>
                {title}
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

            <CarouselDescription visible={0 === slideId}>모두가 볼 수 있는 인터넷, 핸드폰 문자 서비스 등을 통해 욕설, 거친 언어, 인신 공격적 발언을 남기는 행위는 사이버 언어폭력이며 모욕죄에 해당한다.</CarouselDescription>
            <CarouselDescription visible={1 === slideId}>모두가 볼 수 있는 인터넷, SNS 등에 사람의 명예를 훼손시킬만한 사실을 공개하는 경우 사이버 명예훼손 죄에 해당한다. 이때 공개한 내용이 사실이거나 거짓이어도 모두 명예훼손으로 처벌받을 수 있다.</CarouselDescription>
            <CarouselDescription visible={2 === slideId}>상대방에게 반복적으로 공포감, 불안감을 유발하는 이메일이나 쪽지를 보내거나 블로그, SNS 등에 방문하여 댓글 혹은 좋아요를 눌러 관찰하고 있음을 알리는 행위는 사이버 스토킹으로 처벌받을 수 있다.</CarouselDescription>
            <CarouselDescription visible={3 === slideId}>성적인 묘사 혹은 성적 비하 발언, 성차별적 욕설 등 성적 불쾌감을 느낄 수 있는 내용을 인터넷이나 핸드폰을 통해 많은 사람들이 볼 수 있는 곳에 공개하거나 음란한 동영상, 사진을 퍼뜨리는 행위는 사이버 성폭력으로 처벌받을 수 있다.</CarouselDescription>
            <CarouselDescription visible={4 === slideId}>모두가 볼 수 있는 공간에 개인의 사생활을 언급하거나 신상정보에 해당하는 내용을 퍼뜨리는 행위는 개인정보 보호법에 따라 처벌받을 수 있다. 신상정보에는 이름이나 거주지, 재학 중인 학교, 사진 등이 포함된다.</CarouselDescription>
            <CarouselDescription visible={5 === slideId}>인터넷이나 SNS 등에서 한 사람을 따돌리거나 안티 활동을 하는 행위는 사이버 따돌림으로 판단한다.</CarouselDescription>
            <CarouselDescription visible={6 === slideId}>사이버 머니, 스마트폰 데이터, 게임 아이템 등을 강제로 뺏은 행위는 절도죄로 처벌받을 수 있다.</CarouselDescription>
            <CarouselDescription visible={7 === slideId}>인터넷이나 핸드폰을 이용해 상대방이 원치 않는 행동을 하도록 협박하는 것은 사이버 강요에 해당한다.</CarouselDescription>

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

type CarouselDescriptionProps = {
    visible: boolean
}

const CarouselDescription = styled.div`
color: #5E5B69;
padding-top: 16px;
line-height: 170%;
width: 85%;
min-height: 140px;
margin: auto;
display: none;

${({ visible }: CarouselDescriptionProps) => visible ? 'display: block;': ''}
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