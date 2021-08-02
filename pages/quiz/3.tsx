import styled from '@emotion/styled'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Collapse } from 'react-collapse'

import Stats from '../../components/Stats'
import Switch from '../../components/Switch'

const cases = [
    {
        id: 1,
        name: '학교폭력예방 및 대책에 관한 법률',
        data: [
            {
                id: 1,
                name: '학교폭력예방법 제 17조',
                text: `
학교폭력대책심의원회는 피해학생의 보호와 가해학생의 선도 및 교육을 위해 다음 조치 중 하나 혹은 하나 이상의 조치를 하도록 학교장에게 요청해야 한다. 단, 퇴학처분은 의무교육과정을 마치지 못했다면 가해학생에게 퇴학처분을 적용할 수 없다.

①  피해학생에 대한 사과문 제출
②  피해학생 및 신고 · 고발 학생에 대한 접촉, 협박 및 보복행위의 금지
③  학교에서의 봉사
④  사회봉사
⑤  학내외 전문가에 의한 특별 교육이수 또는 심리치료
⑥  출석정지
⑦  학급 교체
⑧  전학
⑨  퇴학 처분
`
            }
        ]
    },
    {
        id: 2,
        name: '형법',
        data: [
            {
                id: 1,
                name: '권리행사를 방해하는 죄 | 형법 제324조 1항',
                text: `폭행 또는 협박으로 사람의 권리행사를 방해하거나 해야 할 의무가 없는 일을 하게 강요한 자는 5년 이하의 징역 또는 3천만원 이하의 벌금에 처한다.`
            },
            {
                id: 2,
                name: '명예에 관한 죄 | 형법 제307조 1항',
                text: `다른 사람이 볼 수 있는 곳에 있는 사실 그대로를 알려서 사람의 명예를 훼손한 자는 2년 이하의 징역 또는 500만원 이하의 벌금에 처한다.`
            },
            {
                id: 3,
                name: '명예에 관한 죄 | 형법 제307조 2항',
                text: `다른 사람이 알 수 있도록 사실이 아닌 내용을 알려서 사람의 명예를 훼손한 자는 5년 이하의 징역 또는 1천만원 이하의 벌금에 처한다.`
            },
            {
                id: 4,
                name: '명예에 관한 죄 | 형법 제311조',
                text: `다른 사람이 볼 수 있는 곳에서 사람을 모욕한 자는 1년 이하의 징역 또는 200만원 이하의 벌금에 처한다.`
            },
            {
                id: 5,
                name: '절도와 강도의 죄 | 형법 제329조',
                text: `다른 사람의 돈이나 물건 등 재물을 빼앗은 자는 6년 이하의 징역 또는 1천만원 이하의 벌금에 처한다.`
            }
        ]
    },
    {
        id: 3,
        name: '정보통신망 이용촉진 및 정보보호 등에 관한 법률',
        data: [
            {
                id: 1,
                name: '정보통신망법 제70조 1항',
                text: `사람을 비방할 목적으로 다른 사람이 볼 수 있는 정보통신망에 사실을 드러내어 사람의 명예를 훼손한 자는 3년 이하의 징역 또는 3천만원 이하의 벌금에 처한다.`
            },
            {
                id: 2,
                name: '정보통신망법 제70조 2항',
                text: `사람을 비방할 목적으로 다른 사람이 볼 수 있는 정보통신망에 거짓의 사실을 드러내어 사람의 명예를 훼손한 자는 7년 이하의 징역 또는 5천만원 이하의 벌금에 처한다.`
            },
            {
                id: 3,
                name: '정보통신망법 제74조',
                text: `
다음에 해당하는 자는 1년 이하의 징역 또는 1천만원 이하의 벌금에 처한다.

① 음란한 부호 · 문언 · 음향 · 화상 또는 영상을 배포 · 판매 임대하거나 모두가 볼 수 있는 곳에 공개한 자 
*  이모티콘, 자음, 모음, 초성, 댓글, 사진, 그림, 음성 파일, 동영상 등을 포함한다. 
② 공포심이나 불안감을 유발하는 부호 · 문언 · 음향 · 화상 또는 영상을 반복적으로 상대방에게 보낸 자
`
            }
        ]
    },
    {
        id: 4,
        name: '경범죄 처벌법',
        data: [
            {
                id: 1,
                name: '경범죄 처벌법 제3조 1항',
                text: '다른 사람에게 지속적으로 접근하거나 직접적인 만남 또는 교제를 요구하는 자,  다른 사람을 지켜보거나 따라다니며 괴롭히는 자, 잠복하여 기다리리는 자는 다른 사람을 지속적으로 괴롭혔다고 판단하여 10만원 이하의 벌금에 처한다.'
            }
        ]
    },
    {
        id: 5,
        name: '개인정보 보호법',
        data: [
            {
                id: 1,
                name: '개인정보 보호법  제71조',
                text: `
다음에 해당하는 자는 5년 이하의 징역 또는 5천만원 이하의 벌금에 처한다.
① 상대방의 동의를 받지 않고 개인정보와 신상을 수집하거나 다른 사람에게 제공한 자 
② 상대방의 개인정보와 신상을 개인정보를 돈을 벌기 위해 또는 기타 다른 부정한 목적으로 제공받은 자
③ 법정 대리인의 동의를 받지 아니하거나 법정 대리인이 동의하였는지를 확인하지 않고 만 14세 미만인 아동의 개인정보를 수집한 자
④ 다른 사람의 개인정보 또는 신상을 훼손하거나 변경 및 유출한 자
`
            },
        ]
    },
    {
        id: 6,
        name: '성폭력범죄의 처벌 등에 관한 특례법',
        data: [
            {
                id: 1,
                name: '성폭력처벌법 제13조',
                text: '자신 또는 다른 사람의 성적 욕망을 유발하거나 만족시킬 목적으로 전화, 우편, 컴퓨터, 그 밖의 통신매체를 통하여 성적 수치심이나 혐오감을 일으키는 말, 음향, 글, 그림, 영상 또는 물건을 상대방에게 보낸 사람은 2년 이하의 징역 또는 2천만원 이하의 벌금에 처한다.'
            },
            {
                id: 2,
                name: '성폭력처벌법 제14조 1항',
                text: '카메라나 그 밖에 이와 유사한 기능을 갖춘 기계장치를 이용하여 성적 욕망 또는 수치심을 유발할 수 있는 사람의 신체를 촬영 대상자의 의사에 반하여 촬영한 자는 7년 이하의 징역 또는 5천만원 이하의 벌금에 처한다.'
            },
            {
                id: 3,
                name: '성폭력처벌법 제14조의 2 1항',
                text: '유포를 목적으로 사람의 얼굴ㆍ신체 또는 음성을 대상으로 한 촬영물ㆍ영상물 또는 음성물을 성적 욕망 또는 수치심을 유발할 수 있는 형태로 편집ㆍ합성 또는 가공한 자는 5년 이하의 징역 또는 5천만원 이하의 벌금에 처한다.'
            }
        ]
    },
]

const IndexPage = () => {

    const [collapses, setCollapses] = useState([])
    const [checks, setChecks] = useState([])
    const [hints, setHints] = useState([])

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

    const handleCheck = (checked, id, subId) => {

        const key = `${id}-${subId}`

        if (checked) {

            setChecks([
                ...checks,
                {
                    key,
                    id,
                    subId
                }
            ])

        } else {

            setChecks(checks.filter(e => e.key !== key))

        }

    }

    useEffect(() => {

        setCollapses(cases.map((e) => ({
            id: e.id,
            opend: false
        })))

        setHints([0, 1, 2])

    }, [])

    return (
        <div>
            <Header>
                <HeaderItemPadding>
                    <Link passHref href='/quiz/2'>
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

            <Stats type={3} />

            <View>
                <ViewBox>
                    <ViewTitle>- 선택한 법률 -</ViewTitle>

                    {checks.map((e, i) => <ViewCheckText key={i}>
                        <ViewCheckIcon src='/icons/check-circle-regular.svg' /> {cases.find(x => x.id === e.id).data.find(x => x.id === e.subId).name}
                    </ViewCheckText>)}

                    {hints.slice(checks.length).map((e) => <ViewCheckText key={e}>
                        <ViewCheckIcon src='/icons/check-circle-regular.svg' />
                        <ViewCheckHint />
                    </ViewCheckText>)}

                </ViewBox>
            </View>

            <LawGroup>

                {cases.map((x) => <Law key={x.id}>

                    <LawHeader checked={getChecked(x.id)} onClick={() => handleOpend(x.id)}>
                        <LawTitle>{x.name}</LawTitle>
                        <LawIconBox>
                            <LawIcon src={`/icons/angle-${getOpend(x.id) ? 'down' : 'left'}-solid_${getChecked(x.id) ? 'w' : 'g'}.svg`}></LawIcon>
                        </LawIconBox>
                    </LawHeader>

                    <LawCollapse isOpened={getOpend(x.id)}>
                        {x.data.map((y) => <LawSub key={y.id}>

                            <LawSubHeader>
                                <LawSubTitle>{y.name}</LawSubTitle>
                                <LawToggleBox>

                                    <Switch name='incidentId' type='checkbox' onClick={({ target: { checked } }) => handleCheck(checked, x.id, y.id)} />

                                </LawToggleBox>
                            </LawSubHeader>
                            <LawContent>{y.text}</LawContent>

                        </LawSub>)}
                    </LawCollapse>

                </Law>)}

            </LawGroup>

        </div>
    )
}

const LawGroup = styled.div``
const Law = styled.div``

type LawHeaderProps = {
    checked?: boolean
}

const LawHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 18px;
padding: 6px 16px;
border-top: 1.5px solid #F1F1F1;
background: #fff;
color: #000;
cursor: pointer;

${({ checked }: LawHeaderProps) => checked ? 'border-top: 1.5px solid #9BC802; background: #9BC802; color: #fff;' : ''}
`
const LawTitle = styled.div``
const LawIconBox = styled.div``
const LawIcon = styled.img`
width: 25px;
height: 25px;
`
const LawCollapse = styled(Collapse)``
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
min-height: 160px;
`

const ViewBox = styled.div`
width: 95%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: auto;
`

const ViewTitle = styled.div`
font-weight: 500;
margin-bottom: 8px;
`

const ViewCheckText = styled.div`
color: #565656;
margin-bottom: 4px;
`

const ViewCheckHint = styled.div`
display: inline-block;
width: 140px;
border-bottom: 1px dashed #565656;
margin-left: 6px;
`

const ViewCheckIcon = styled.img`
display: inline-block;
width: 16px;
`

export default IndexPage