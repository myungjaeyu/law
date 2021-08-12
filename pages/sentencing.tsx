import styled from '@emotion/styled'
import Link from 'next/link'
import { useRouter } from 'next/router'
import TextareaAutosize from 'react-textarea-autosize'
import { useScreenshot } from 'use-react-screenshot'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { media } from '../config/styles'

import Alert from '../components/Alert'

import { useDispatch, useSelector } from 'react-redux'
import { saveControlStorage } from '../services/actions/controlActions'
import { useCallback, useEffect, useState, useRef } from 'react'

import { case_list, people_list } from '../utils/assets'
import { isEndWithConsonant } from '../utils/text'

const shareLink = 'https://law.vercel.app'
const popupOptions = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no'

const IndexPage = () => {

    const { name, caseId, incidentId, laws, penal } = useSelector((state: any) => ({
        name: state.control.data.name,
        caseId: state.control.data.caseId,
        incidentId: state.control.data.incidentId,
        laws: state.control.data.laws,
        penal: state.control.data.penal
    }))

    const dispatch = useDispatch()

    const inputRef = useRef(null)

    const captureRef = useRef(null)
    const imageRef = useRef(null)
    const [image, takeScreenshot] = useScreenshot()

    const router = useRouter()

    const [defendantName, setDefendantName] = useState('')
    const [review, setReview] = useState('')
    const [alertText, setAlertText] = useState('')

    const handleCapture = useCallback(async () => {

        if (!review) {

            setAlertText('소감문을 작성해주세요')

            inputRef.current.focus()

            return
        }

        const base64 = await takeScreenshot(captureRef.current)

        imageRef.current.href = base64
        imageRef.current.download = `디지털시민법정_${new Date().valueOf()}.jpg`

        imageRef.current.click()

    }, [review, inputRef, captureRef, imageRef, image])

    const handleReview = useCallback(({ target: { value } }) => {

        setReview(value)

    }, [review])

    const handleCaseDefendantName = (id, subId) => {

        const caseInfo = people_list.find(e => e.id === id)

        const defendant = caseInfo.data.find(e => e.id === subId)

        setDefendantName(defendant.name)

    }

    const handleNextPage = useCallback(() => {

        if (!image) {
            setAlertText('판결문을 저장해주세요')

            inputRef.current.focus()

            return
        }

        router.push('/info/3')

        dispatch(saveControlStorage())

    }, [image])

    const handleShare = (url) => {
        window.open(url, '', popupOptions)
    }

    const handleCopy = () => {
        setAlertText('링크를 복사하였습니다')
    }

    useEffect(() => {

        if (caseId && incidentId) {

            handleCaseDefendantName(caseId, incidentId)

        }

    }, [caseId, incidentId])

    useEffect(() => {

        if ((window as any).Kakao) {

            setTimeout(() => {

                (window as any).Kakao.Link.createScrapButton({
                    container: '#kakao-share',
                    requestUrl: shareLink,
                })

                inputRef.current.focus()

            }, 500)

        }

    }, [inputRef])

    return (
        <div>
            <Capture ref={captureRef}>

                <Header>
                    <HeaderItemPadding>
                        <Link passHref href='/'>
                            <BackIcon src='/icons/angle-left-solid.svg' />
                        </Link>
                    </HeaderItemPadding>
                    <HeaderItemPadding>
                        <Title>판결문</Title>
                    </HeaderItemPadding>
                    <HeaderItemPadding />
                </Header>

                <Main>
                    <MainLogo src='/images/E_기타_이미지/판결_이미지.png' />
                </Main>

                <Card>
                    <Label>판사</Label>
                    <Text>{name}</Text>
                </Card>

                <Card>
                    <Label>사건</Label>
                    {!!caseId && <Text>{case_list.find(e => e.id === caseId).name} 사건카드{incidentId}</Text>}
                </Card>

                <Card>
                    <Label>사건유형</Label>
                    <Text>사이버 따돌림</Text>
                </Card>

                {laws.map((law, i) => <Card key={i}>
                    <Label>법률근거 {i + 1}</Label>
                    <Text>{law}</Text>
                </Card>)}

                <Card>
                    <Label>판결</Label>
                    <Text>
                        {`피고 ${defendantName}에 ${penal}${isEndWithConsonant(penal) ? '을' : '를'} 구형한다`}
                    </Text>
                </Card>

                <Card>
                    <Label style={{ paddingRight: '4px' }}>소감 한마디</Label>
                    <ReviewInput ref={inputRef} onChange={handleReview} placeholder='느낀점을 작성해주세요' spellCheck={false} />
                </Card>

            </Capture>

            <Center>
                <Button
                    onClick={handleCapture}
                >
                    판결문 저장
                </Button>

                <a ref={imageRef} download="filename.jpg" href={image} title="imagename" />

                <Alert
                    opend={!!alertText}
                    text={alertText}
                    onOk={() => { setAlertText('') }}
                />

                <Button
                    disabled={!image}
                    background={'#5B9BF9'}
                    onClick={handleNextPage}
                >
                    새로운 사건 판결
                </Button>
            </Center>

            <ShareCener>
                <ShareTitle>공유하기</ShareTitle>
                <ShareContent>
                    <ShareIcon id='kakao-share' src='icons/free-icon-kakao-talk.svg' />
                    <ShareIcon onClick={() => handleShare(`http://www.facebook.com/sharer.php?u=${shareLink}`)} src='/icons/facebook-square-brands.svg' />
                    <ShareIcon onClick={() => handleShare(`https://twitter.com/intent/tweet?url=${shareLink}`)} src='icons/twitter-square-brands.svg' />
                </ShareContent>
                <CopyToClipboard text={shareLink}>
                    <ShareButton onClick={handleCopy}>링크 복사하기</ShareButton>
                </CopyToClipboard>
            </ShareCener>

        </div>
    )
}

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 95%;
height: 45px;
margin-bottom: 16px;
margin: auto;
`

const HeaderItemPadding = styled.div`
width: 25%;

&:nth-child(2) {
  width: 50%;
}
`

const BackIcon = styled.img`
width: 16px;
cursor: pointer;
`

const Title = styled.div`
font-size: 20px;
font-weight: 700;
text-align: center;
`

const MainLogo = styled.img`
width: 65%;
margin: auto;
margin-top: 16px;
`

const Main = styled.div`
width: 100%;
display: flex;
justify-content: center;
margin-top: 8px;
margin-bottom: 16px;
border-bottom: 1px solid #ccc;
`

const Card = styled.div`
background: #fff;
display: flex;
width: 95%;
max-width: 550px;
margin: auto;
padding: 14px 0;
font-size: 18px;
`
const Label = styled.div`
height: fit-content;
text-align: right;
font-weight: 700;
color: #364B6C;
border-right: 1px solid #ccc;
margin-right: 8px;
padding-right: 8px;
width: 30%;

${media.phone} {
    width: 20%;
}
`

const Text = styled.div`
color: #5167A3;
padding-right: 8px;
white-space: pre-wrap;
word-wrap: break-word;
width: 70%;

${media.phone} {
    width: 80%
}
`

const Center = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

type ButtonProps = {
    background?: string
    disabled?: boolean
}

const Button = styled.div`
background: ${({ background }: ButtonProps) => background ? background : '#F3A968'};
color: #fff;
font-size: 18px;
padding: 8px 12px;
width: 160px;
text-align: center;
border-radius: 16px;
cursor: pointer;
margin-bottom: 12px;

${({ disabled }: ButtonProps) => `${disabled && 'background: #BABABA;' || ''}`}
`

const ReviewInput = styled(TextareaAutosize)`
color: #5167A3;
font-size: 18px;
border: none;
outline: none;
width: 70%;
padding: 0;

&::placeholder {
    color: #f54563;
}
`

const ShareCener = styled(Center)`
margin-top: 24px;
padding-bottom: 26px;
`

const ShareContent = styled(Center)`
flex-direction: row;
justify-content: space-around;
width: 30%;
margin: auto;
`

const ShareTitle = styled.div`
color: #818181;
margin-bottom: 8px;
font-size: 14px;
`

const ShareIcon = styled.img`
width: 25px;
cursor: pointer;
`

const ShareButton = styled.div`
border: 1px solid #818181;
color: #818181;
padding: .25rem .5rem;
line-height: 1.5;
border-radius: .2rem;
margin-top: 16px;
cursor: pointer;
font-size: 14px;
`

const Capture = styled.div`
background: #F2F2F2;
padding-bottom: 24px;
`

export default IndexPage