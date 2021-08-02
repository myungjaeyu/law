import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Stats from '../../components/Stats'
import { useCallback, useEffect, useState } from 'react'

const DynamicCarousel: any = dynamic(
    () => import('react-spring-3d-carousel'),
    { ssr: false }
)

const cases = [
    { id: 0, name: '사이버 언어폭력', src: '사이버_언어폭력', text: '모두가 볼 수 있는 인터넷, 핸드폰 문자 서비스 등을 통해 욕설, 거친 언어, 인신 공격적 발언을 남기는 행위는 사이버 언어폭력이며 모욕죄에 해당한다.' },
    { id: 1, name: '사이버 명예훼손', src: '사이버_명예훼손', text: '모두가 볼 수 있는 인터넷, SNS 등에 사람의 명예를 훼손시킬만한 사실을 공개하는 경우 사이버 명예훼손 죄에 해당한다. 이때 공개한 내용이 사실이거나 거짓이어도 모두 명예훼손으로 처벌받을 수 있다.' },
    { id: 2, name: '사이버 스토킹', src: '사이버_스토킹', text: '상대방에게 반복적으로 공포감, 불안감을 유발하는 이메일이나 쪽지를 보내거나 블로그, SNS 등에 방문하여 댓글 혹은 좋아요를 눌러 관찰하고 있음을 알리는 행위는 사이버 스토킹으로 처벌받을 수 있다.' },
    { id: 3, name: '사이버 성폭력', src: '사이버_성폭력', text: '성적인 묘사 혹은 성적 비하 발언, 성차별적 욕설 등 성적 불쾌감을 느낄 수 있는 내용을 인터넷이나 핸드폰을 통해 많은 사람들이 볼 수 있는 곳에 공개하거나 음란한 동영상, 사진을 퍼뜨리는 행위는 사이버 성폭력으로 처벌받을 수 있다.' },
    { id: 4, name: '신상정보 유출', src: '신상정보_유출', text: '모두가 볼 수 있는 공간에 개인의 사생활을 언급하거나 신상정보에 해당하는 내용을 퍼뜨리는 행위는 개인정보 보호법에 따라 처벌받을 수 있다. 신상정보에는 이름이나 거주지, 재학 중인 학교, 사진 등이 포함된다.' },
    { id: 5, name: '사이버 따돌림', src: '사이버_따돌림', text: '인터넷이나 SNS 등에서 한 사람을 따돌리거나 안티 활동을 하는 행위는 사이버 따돌림으로 판단한다.' },
    { id: 6, name: '사이버 갈취', src: '사이버_갈취', text: '사이버 머니, 스마트폰 데이터, 게임 아이템 등을 강제로 뺏은 행위는 절도죄로 처벌받을 수 있다.' },
    { id: 7, name: '사이버 강요', src: '사이버_강요', text: '인터넷이나 핸드폰을 이용해 상대방이 원치 않는 행동을 하도록 협박하는 것은 사이버 강요에 해당한다.' }
]

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
z-index: 2;
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