import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Stats from '../../components/Stats'
import { useCallback, useEffect, useState } from 'react'

import { case_quiz2 } from '../../utils/assets'

const DynamicCarousel: any = dynamic(
    () => import('react-spring-3d-carousel'),
    { ssr: false }
)

const cases = case_quiz2

const IndexPage = () => {

    const router = useRouter()

    const [slideId, setSlideId] = useState(0)
    const [slides, setSlides] = useState([])

    const handleSlideNext = useCallback(() => {

        let id = slideId === cases.length - 1 ? 0 : slideId + 1

        setSlideId(id)

    }, [slideId])

    const handleSlidePrev = useCallback(() => {

        let id = slideId === 0 ? cases.length - 1 : slideId - 1

        setSlideId(id)

    }, [slideId])

    const handleNextPage = useCallback(() => {

        router.push('/quiz/3')

    }, [router, slideId])

    useEffect(() => {

        setSlides(cases.map((e, i) => ({
            key: `${e.id}`,
            content: <img src={`/images/D_사건_유형_이미지/${e.src}.png`} alt={`type_${e.id}`} />
        })))

    }, [])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/quiz/1'>
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
                {cases.find((e) => e.id === slideId).text}
            </CarouselDescription>

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
width: 24px;
padding: 0 8px;
`

const CarouselTitle = styled.div`
font-size: 16px;
font-weight: 500;
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
padding: 6px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;
`

export default IndexPage