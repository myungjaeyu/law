import Head from 'next/head'
import axios from 'axios'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Alert from '../../components/Alert'

import { useDispatch, useSelector } from 'react-redux'
import { saveControlStorage } from '../../services/actions/controlActions'
import { useCallback, useEffect, useState } from 'react'

import urls from '../../config/apis'

const prod_host = 'http://dccainse.kr'
const host = process.env.NODE_ENV === 'production' ? prod_host : 'http://localhost:3000'

const shareLink = (id) => `${host}/sentencing/${id}`

const popupOptions = 'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no'

type DataProps = {
    id: string
    name: string
    incident: string
    incident_type: string
    basis: string
    judgement: string
    review: string
    thumbnail: string
    createAt: string
    updateAt: string
}

type IndexProps = {
    data: DataProps
}

const IndexPage = ({ data }: IndexProps) => {

    const { name } = useSelector((state: any) => ({
        name: state.control.data.name
    }))

    const dispatch = useDispatch()

    const router = useRouter()

    const [alertText, setAlertText] = useState('')

    const handleCapture = useCallback(() => {

        setAlertText('판결문이 이미지화되었습니다\n(판결문 이미지를 저장해주세요)')

    }, [])

    const handleNextPage = useCallback(() => {

        router.push(name ? '/info/3' : '/')

        dispatch(saveControlStorage())

    }, [name])

    const handleShare = (url) => {
        window.open(url, '', popupOptions)
    }

    const handleCopy = () => {
        setAlertText('링크를 복사하였습니다')
    }

    useEffect(() => {

        if ((window as any).Kakao && data) {

            setTimeout(() => {

                (window as any).Kakao.Link.createDefaultButton({
                    container: '#kakao-share',
                    objectType: 'feed',
                    content: {
                        title: '"디지털 시민법정"',
                        description: '디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!',
                        imageUrl: host + '/uploads/' + data.thumbnail,
                        link: {
                            webUrl: shareLink(data.id),
                            mobileWebUrl: shareLink(data.id)
                        },
                    },
                    buttons: [
                        {
                            title: '결과보기',
                            link: {
                                webUrl: shareLink(data.id),
                                mobileWebUrl: shareLink(data.id),
                            },
                        },
                        {
                            title: '나도하러가기',
                            link: {
                                webUrl: host,
                                mobileWebUrl: host,
                            },
                        },
                    ]
                })

            }, 500)

        }

    }, [data])

    return (
        <div>
            <Head>
                <meta name="robots" content="index,follow" />
                <meta name="googlebot" content="index,follow" />

                <title>"디지털 시민법정"</title>
                <meta name="description" content="디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!" />
                <meta name="keywords" content="law, 디지털시민법정" />

                <meta property="twitter:title" content='"디지털 시민법정"' />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content="디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!" />
                <meta property="twitter:image:src" content={host + '/uploads/' + data.thumbnail} />

                <meta property="og:title" content='"디지털 시민법정"' />
                <meta property="og:description" content="디지털 시민법정의 판사가 되어 사이버폭력 사건을 직접 판결해보세요!" />
                <meta property="og:image" content={host + '/uploads/' + data.thumbnail} />
                <meta property="og:image:alt" content="image_logo" />
                <meta property="og:image:width" content="800" />
                <meta property="og:image:height" content="600" />
            </Head>
            <CaptureImage src={'/uploads/' + data.thumbnail} alt='디지털시민법정' />

            <Center>
                <Button
                    onClick={handleCapture}
                >
                    판결문 저장
                </Button>

                <Alert
                    opend={!!alertText}
                    text={alertText}
                    onOk={() => { setAlertText('') }}
                />

                <Button
                    disabled={false}
                    background={'#5B9BF9'}
                    onClick={handleNextPage}
                >
                    새로운 사건 판결
                </Button>
            </Center>

            <ShareCener>
                <ShareTitle>공유하기</ShareTitle>
                <ShareContent>
                    <ShareIcon id='kakao-share' src='/icons/free-icon-kakao-talk.svg' />
                    <ShareIcon onClick={() => handleShare(`http://www.facebook.com/sharer.php?u=${shareLink(data.id)}`)} src='/icons/facebook-square-brands.svg' />
                    <ShareIcon onClick={() => handleShare(`https://twitter.com/intent/tweet?url=${shareLink(data.id)}`)} src='/icons/twitter-square-brands.svg' />
                </ShareContent>
                <CopyToClipboard text={shareLink(data.id)}>
                    <ShareButton onClick={handleCopy}>링크 복사하기</ShareButton>
                </CopyToClipboard>
            </ShareCener>

        </div>
    )
}

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

const CaptureImage = styled.img`
width: 100%;
`

export default IndexPage

export const getServerSideProps = async (context) => {

    const id = context.query.id

    const { data } = await axios.get(host + urls.getSentencing(id))

    return {
        props: {
            data
        }
    }
}