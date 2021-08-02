import styled from '@emotion/styled'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { animateScroll } from 'react-scroll'

import Stats from '../../components/Stats'
import Switch from '../../components/Switch'

const cases = {
    messages: [
        {
            id: 1, name: '악성댓글', data: [
                { id: 1, name: '사건카드 1', text: '신기해는 이평범의 사진에 “성형수술했어?”라는 댓글을 달았고 이평범이 반박하자 자신의 SNS에 이평범의 1년 전 사진과 현재 사진을 대조해 게시했다.' },
                { id: 2, name: '사건카드 2', text: '이평범은 신기해에게 사진을 내려달라고 했지만, 신기해는 1년 전 본인이 직접 찍은 사진이라며 내리기를 거부했다.' },
                { id: 3, name: '사건카드 3', text: '신기해는 ‘이평범의 과거 사진을 구합니다’라는 제목으로 누구나 볼 수 있는 인터넷 게시판에 이평범의 개인정보(졸업한 학교, 사는 곳, SNS 주소 등)를 공개했다.' },
                { id: 4, name: '사건카드 4', text: '이평범은 자신의 SNS에 올린 사진을 삭제했으나, 신기해는 이평범이 업로드한 SNS 게시글과 댓글 등을 캡쳐 해놓았고 이를 학급 단체 채팅방에 공유했다.' },
                { id: 5, name: '사건카드 5', text: '이평범의 개인정보가 공개되면서, 이평범을 모르는 사람들이 ‘성괴 맞네!’, ‘귀척’ 등의 메시지를 지속적으로 보냈다.' }
            ]
        },
        {
            id: 2, name: '익명', data: [

                { id: 1, name: '사건카드 1', text: '김공책은 한연필이 여자친구를 구한다는 메시지와 함께 SNS 주소를 게시하였다.' },
                { id: 2, name: '사건카드 2', text: '박필통은 한연필 SNS 주소를 확인하고 만나자는 메시지를 보냈고, “관심없다”는 답변에도 지속적으로 만나자는 메시지를 보냈다.' },
                { id: 3, name: '사건카드 3', text: '김공책은 한연필과의 대화 중 일부를 편집하여 “세인중학교 한연필 인성 논란”이라는 게시글과 함께 이미지를 올렸다.' },
                { id: 4, name: '사건카드 4', text: '익명 게시판을 이용하는 사용자 30여 명은 김공책이 올린 게시글에 ‘좋아요’를 누르며, 본인들의 SNS로 공유했다.' },
                { id: 5, name: '사건카드 5', text: '익명 게시판을 이용하는 사용자 2명은 한연필 SNS에서 한연필 사진을 다운로드 받아 게시하면서 “이 얼굴로 여친을 구한다고?”, “제정신임?” 등 게시글을 작성했다.' }
            ]
        },
        {
            id: 3, name: '기프티콘', data: [
                { id: 1, name: '사건카드 1', text: '김바둑은 김영희에게 일주일 후에 현금으로 줄 테니 편의점에서 사용할 수 있는 기프티콘을 구매해달라고 지속적으로 요구했다. 김영희는 본인이 사용하겠다고 거짓말을 해서 부모님께 기프티콘 구입을 요청했고, 구입한 기프티콘을 김바둑에게 전송했다. 김바둑은 일주일 후에 주겠다는 약속을 지키지 않았고 한꺼번에 주겠다며 추가 전송을 요구했다.' },
                { id: 2, name: '사건카드 2', text: '김영희, 김바둑과 같은 반인 친구 3명은 김영희가 김바둑에게 기프티콘을 전송하는 것을 보고 김영희에게 자신들에게도 기프티콘을 보내라고 요구했다. 김영희가 김바둑을 포함한 총 4인에게 전달한 기프티콘의 금액은 한 달 동안 100,000원 이상이었다.' },
                { id: 3, name: '사건카드 3', text: '김영희가 기프티콘 전송을 거부하자 김바둑은 김영희와의 1:1 채팅방에서 ‘비겁해’, ‘쪼잔해’, ‘의리없어’ 등의 메시지를 한 달 동안 수시로 보냈다.' },
                { id: 4, name: '사건카드 4', text: '김바둑과 김바둑의 친구 3인은 김영희가 결제 거부 의사를 밝히면서 그룹채팅방을 만들어 김영희를 초대해 조롱하는 말을 남겼고 김영희가 채팅방을 나가면 반복적으로 초대했다.' },
                { id: 5, name: '사건카드 5', text: '김바둑과 친구들은 김영희가 전송한 기프티콘으로 편의점에서 간식을 사먹으면서 개인 SNS에 김영희를 암시하는 단어와 함께 #호구 등과 같은 단어를 해시태그했다.' }
            ]
        },
        {
            id: 4, name: '사진', data: [
                { id: 1, name: '사건카드 1', text: '장사과는 김멜론이 체육 시간을 앞두고 탈의하는 장면을 핸드폰 카메라로 촬영하고 오픈 채팅방에 신상정보와 함께 공유했다.' },
                { id: 2, name: '사건카드 2', text: '오픈 채팅방에 있던 56명 중 일부는 받은 사진을 지인들에게 공유하며, 모욕적인 이야기를 나눴다.' },
                { id: 3, name: '사건카드 3', text: '오픈 채팅방에 있던 이포도는 김멜론의 사진을 다른 사진과 합성하여, 모두가 볼 수 있는 SNS에 ‘#누드 체육복’이라는 해시태그와 함께 게시하였다.' },
                { id: 4, name: '사건카드 4', text: '이포도는 오픈 채팅방에서 확보한 신상정보를 토대로 김멜론의 등하교 시간에 맞춰서 “사진을 유포하겠다”는 SNS 메시지를 보냈다.' },
                { id: 5, name: '사건카드 5', text: '박자몽은 오픈 채팅방에서 공유받은 김멜론의 사진을 채팅앱의 프로필 사진으로 게시했다.' }
            ]
        },
        {
            id: 5, name: '상태메세지', data: [
                { id: 1, name: '사건카드 1', text: '강부장과 같은 반인 B반 학생 3명은 강부장의 사진을 자신들의 메신저 프로필 사진으로 교체하면서 따돌림을 주도했다.' },
                { id: 2, name: '사건카드 2', text: '김대리는 상태 메시지를 "우리반 ㅇㄸ 10130", "ㄱㅂㅈ" 등으로 설정했다.' },
                { id: 3, name: '사건카드 3', text: 'B반 학생 2명은 다른 학급 친구들에게 ‘강부장을 인싸로 만들자’는 이야기를 하며, 굴욕사진을 프로필 사진으로 설정할 것을 강요하였다.' },
                { id: 4, name: '사건카드 4', text: 'B반에는 강부장의 사진을 프로필 사진으로 설정하는 문화가 생겨 너도나도 강부장의 사진을 몰래 찍기 시작했다. 강부장은 사진이 찍히고 있는 걸 전혀 몰랐고 자신이 모르는 사이에 찍힌 사진들이 B반 친구들의 프로필 사진으로 걸리는 것을 보며 불안과 공포감을 호소했다.' },
                { id: 5, name: '사건카드 5', text: 'B반 학생 1명은 강부장의 사진을 다른 학교 학생들과 함께 있는 단체 채팅방에 게시했다. 사진 속의 강부장은 교복을 입고 있었기 때문에 학교와 이름이 금방 채팅방에서 언급되었다.' },
            ]
        },
        {
            id: 6, name: '주작', data: [
                { id: 1, name: '사건카드 1', text: '양스타 채널의 구독자인 이독자는 양스타의 공식 SNS 계정이 아닌 비공식 SNS 계정을 알고 싶어졌다. 이독자는 양스타의  영상 속에 잠시 스친 교복을 보고 학교를 추측해서 비공식 계정을 발견하고 업로드된 모든 사진에 ‘크리에이터 양스타 맞죠?’라는 댓글을 달아 불안감을 조성했다.' },
                { id: 2, name: '사건카드 2', text: '이독자는 양스타의 비공식 계정을 살펴보다가 방송에 출연했던 고양이가 길냥이가 아니라 양스타가 오래 전부터 길러온 고양이라는 걸 알게 되었다. 이독자는 양스타의 SNS에서 고양이와 함께 찍은 셀카를 캡처해서 ‘주작 방송한 크리에이터 신상공개’라는 제목으로 인터넷 게시판에 올렸다.' },
                { id: 3, name: '사건카드 3', text: '이독자의 ‘주작 방송한 크리에이터 신상공개’ 게시물은 조회 수가 폭증했고 게시물에는 수많은 댓글이 달렸다. 그중 대다수는 ‘이 세상에서 없어져라’와 같은 폭력적인 댓글이 대다수였다.' },
                { id: 4, name: '사건카드 4', text: '크리에이터 박영상은 양스타를 퇴출시켜야 한다는 내용으로 영상을 만들어 공개했으며 영상 안에는 양스타의 이름과 학교, 사는 곳 등이 반복적으로 등장했다.' },
                { id: 5, name: '사건카드 5', text: '크리에이터 박영상은 양스타에게 ‘영상을 내려줄테니 돈을 보내라.’, ‘직접 만나주면 삭제하겠다’ 등의 DM을 보냈고 양스타는 거절했지만 DM 보내기를 멈추지 않았다.' }
            ]
        }
    ],
    plaintiff: [
        { id: 1, name: '악성댓글', src: '악성댓글' },
        { id: 2, name: '익명', src: '익명' },
        { id: 3, name: '기프티콘', src: '기프티콘' },
        { id: 4, name: '사진', src: '사진' },
        { id: 5, name: '상태메세지', src: '상태메세지' },
        { id: 6, name: '주작', src: '주작' }
    ],
    defendant: [
        {
            id: 1,
            name: '악성댓글',
            incidents: [
                { id: 1, src: '악성댓글/피고카드_11' },
                { id: 2, src: '악성댓글/피고카드_12' },
                { id: 3, src: '악성댓글/피고카드_13' },
                { id: 4, src: '악성댓글/피고카드_14' },
                { id: 5, src: '악성댓글/피고카드_15' }
            ]
        },
        {
            id: 2,
            name: '익명',
            incidents: [
                { id: 1, src: '익명/피고카드_21' },
                { id: 2, src: '익명/피고카드_22' },
                { id: 3, src: '익명/피고카드_23' },
                { id: 4, src: '익명/피고카드_24' },
                { id: 5, src: '익명/피고카드_25' }
            ]
        },
        {
            id: 3,
            name: '기프티콘',
            incidents: [
                { id: 1, src: '기프티콘/피고카드_6' },
                { id: 2, src: '기프티콘/피고카드_7' },
                { id: 3, src: '기프티콘/피고카드_8' },
                { id: 4, src: '기프티콘/피고카드_9' },
                { id: 5, src: '기프티콘/피고카드_10' }
            ]
        },
        {
            id: 4,
            name: '사진',
            incidents: [
                { id: 1, src: '사진/피고카드_16' },
                { id: 2, src: '사진/피고카드_17' },
                { id: 3, src: '사진/피고카드_18' },
                { id: 4, src: '사진/피고카드_19' },
                { id: 5, src: '사진/피고카드_20' }
            ]
        },
        {
            id: 5,
            name: '상태메세지',
            incidents: [
                { id: 1, src: '상태메세지/피고카드_1' },
                { id: 2, src: '상태메세지/피고카드_2' },
                { id: 3, src: '상태메세지/피고카드_3' },
                { id: 4, src: '상태메세지/피고카드_4' },
                { id: 5, src: '상태메세지/피고카드_5' }
            ]
        },
        {
            id: 6,
            name: '주작',
            incidents: [
                { id: 1, src: '주작/피고카드_26' },
                { id: 2, src: '주작/피고카드_27' },
                { id: 3, src: '주작/피고카드_28' },
                { id: 4, src: '주작/피고카드_29' },
                { id: 5, src: '주작/피고카드_30' }
            ]
        }
    ]
}

const IndexPage = () => {

    const [caseId, setCaseId] = useState(0)
    const [incidentId, setIncidentId] = useState(0)
    const [messages, setMessages]: any = useState([])
    const [plaintiff, setPlaintiff]: any = useState({})
    const [defendant, setDefendant]: any = useState({})

    const setCaseIncident = (incidentId) => {

        const caseInfo = cases.defendant.find(e => e.id === caseId)

        const incidentInfo = caseInfo.incidents.find(e => e.id === incidentId)

        const data = {
            plaintiff: cases.plaintiff.find(e => e.id === caseId),
            defendant: incidentInfo
        }

        setIncidentId(incidentId)
        setPlaintiff(data.plaintiff)
        setDefendant(data.defendant)

        animateScroll.scrollToTop()
    }

    const setCaseMessages = (caseId) => {
        setCaseId(caseId)
        setMessages(cases.messages.find(e => e.id === caseId).data)
    }

    useEffect(() => {

        setCaseMessages(1)

    }, [])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/info/3'>
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

            <Stats type={1} />

            <View>
                {!!(caseId && incidentId) && <ViewBox>

                    <ViewContent>
                        <ViewImg src={`/images/B_원고_이미지/${plaintiff.src}.png`} />
                        <ViewLabel>원고</ViewLabel>
                    </ViewContent>

                    <ViewContent>
                        <ViewImg src={`/images/C_피고_이미지/${defendant.src}.png`} />
                        <ViewLabel>피고</ViewLabel>
                    </ViewContent>

                </ViewBox>}
            </View>

            <IncidentGroup>

                {messages.map((e, i) => <Incident key={i}>

                    <IncidentContent>
                        <IncidentTitle>{e.name}</IncidentTitle>
                        <IncidentDescription>{e.text}</IncidentDescription>
                    </IncidentContent>

                    <IncidentRadioBox>

                        <Switch name='incidentId' type='radio' onClick={() => setCaseIncident(e.id)} />

                    </IncidentRadioBox>


                </Incident>)}

            </IncidentGroup>

        </div>
    )
}

const IncidentGroup = styled.div``

const Incident = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-bottom: 3px solid #E7E8E7;
`

const IncidentContent = styled.div`
padding: 6px 16px;
`

const IncidentTitle = styled.div`
font-size: 18px;
font-weight: 500;
`

const IncidentDescription = styled.div`
color: #5E5B69;
font-size: 15px;
line-height: 150%;
padding-top: 4px;
`

const IncidentRadioBox = styled.div`
text-align: right;
padding-right: 12px;
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

const View = styled.div`
background: #fff;
margin-top: 8px;
padding: 24px 0 6px;
box-shadow: 0 3px 3px 0 rgba(0,0,0,0.1);
min-height: 321px;
`

const ViewBox = styled.div`
width: 95%;
display: flex;
justify-content: center;
margin: auto;
`

const ViewContent = styled.div`
padding: 16px;
`

const ViewImg = styled.img`
width: 100%;
`

const ViewLabel = styled.div`
font-weight: 500;
text-align: center;
color: #5E5B69;
`

export default IndexPage