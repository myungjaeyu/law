import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { animateScroll } from 'react-scroll'

const toon_images = [
  { id: 1, src: '악성댓글' },
  { id: 2, src: '익명' },
  { id: 3, src: '기프티콘' },
  { id: 4, src: '사진' },
  { id: 5, src: '상태메세지' },
  { id: 6, src: '주작' }
]

const IndexPage = () => {

  const router = useRouter()

  const [type, setType] = useState(0)

  const [cases, setCases] = useState([
    { id: 1, name: '악성댓글', tick: 0, len: 5 },
    { id: 2, name: '익명', tick: 0, len: 5 },
    { id: 3, name: '기프티콘', tick: 0, len: 5 },
    { id: 4, name: '사진', tick: 0, len: 5 },
    { id: 5, name: '상태메세지', tick: 0, len: 5 },
    { id: 6, name: '주작', tick: 0, len: 5 }
  ])

  const handleSetType = useCallback((id) => {

    setType(id)

    animateScroll.scrollToBottom()

  }, [type])

  const handleNextPage = useCallback(() => {

    console.log(type)

    router.push('/')

  }, [router, type])

  return (
    <div>

      <Header>
        <HeaderItemPadding>
          <Link passHref href='/info/2'>
            <BackIcon src='/icons/angle-left-solid.svg' />
          </Link>
        </HeaderItemPadding>
        <HeaderItemPadding>
          <Title>사건 주제 선택</Title>
        </HeaderItemPadding>
        <HeaderItemPadding />
      </Header>

      <Center>
        <MainLogo src='/images/E_기타_이미지/Logo2.png' />
      </Center>

      <Center>
        <Description>해결하고 싶은 사건 주제를 선택하세요</Description>
      </Center>

      <ButtonGroup>

        {cases.map((e) =>
          <ButtonPadding key={e.id}>
            <Button
              disabled={e.id !== type}
              onClick={() => handleSetType(e.id)}
            >
              {e.name}<small>[{e.tick}/{e.len}]</small>
            </Button>
          </ButtonPadding>
        )}

      </ButtonGroup>

      {!!type && <Center>
        <ToonImg src={`/images/A_사건_주제_이미지/${toon_images.find(e => e.id === type).src}.png`} alt='toon_image' />
      </Center>}

      <Center>
        {!!type && <Button onClick={handleNextPage}>다음</Button>}
      </Center>

      <Footer></Footer>

    </div>
  )
}

type ButtonProps = {
  disabled?: boolean
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
font-weight: 500;
text-align: center;
`

const MainLogo = styled.img`
width: 60%;
margin: auto;
margin-top: 16px;
`

const ToonImg = styled.img`
width: 90%;
margin: 42px auto;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

const ButtonGroup = styled.div`
display: flex;
flex-wrap: wrap;
`

const ButtonPadding = styled.div`
width: 50%;
display: flex;
justify-content: center;
padding: 4px 0;
`

const Button = styled.div`
background: #F3A968;
color: #fff;
padding: 6px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;

small { font-size: 12px; }

${({ disabled }: ButtonProps) => `${disabled && 'background: #BABABA;' || ''}`}
`

const Description = styled.div`
color: #868686;
font-size: 14px;
letter-spacing: .2px;
margin-top: 16px;
margin-bottom: 16px;
`

const Footer = styled.div`
margin-top: 50px;
`

export default IndexPage