import styled from '@emotion/styled'
import { useCallback, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useDispatch, useSelector } from 'react-redux'
import { setControlName } from '../../services/actions/controlActions'

import LoadImage from '../../components/LoadImage'
import { case_list, case_quiz2, people_list } from '../../utils/assets'

const IndexPage = () => {

  const { _name } = useSelector((state: any) => ({
    _name: state.control.data.name
  }))

  const dispatch = useDispatch()

  const inputRef = useRef(null)

  const router = useRouter()

  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const changeName = useCallback(({ target: { value } }) => {

    setName(value)

  }, [name])

  const goNextPage = (name) => {

    dispatch(setControlName(name))

    router.push('/info/3')

  }

  const handleEnter = useCallback(({ key }) => {

    if (key === 'Enter') {

      if (!name) {
        setError('이름을 입력해주세요!')
        return
      }

      goNextPage(name)

    }

  }, [router, name])

  const handleNextPage = useCallback(() => {

    if (!name) {
      setError('이름을 입력해주세요!')
      return
    }

    goNextPage(name)

  }, [router, name])

  useEffect(() => {

    setName(_name)

    inputRef.current.focus()

  }, [_name])

  return (
    <div>

      <Header>
        <HeaderItemPadding>
          <Link passHref href='/'>
            <BackIcon src='/icons/angle-left-solid.svg' />
          </Link>
        </HeaderItemPadding>
        <HeaderItemPadding>
          <Title>판사 등록</Title>
        </HeaderItemPadding>
        <HeaderItemPadding />
      </Header>

      <Center>
        <MainLogo src='/images/E/Logo2.png' />
      </Center>

      <Center>
        <Description>판사의 이름을 입력하고 판결을 시작하세요</Description>
      </Center>

      <Center>
        <Input
          ref={inputRef}
          value={name}
          placeholder='이름을 입력하세요'
          onChange={changeName}
          onKeyPress={handleEnter}
        />
      </Center>
      <Center>
        <Error>{error ? error : ''}</Error>
      </Center>

      <Center>
        <Button disabled={!name} onClick={handleNextPage}>다음</Button>
      </Center>

      <Footer>
        <ImgPadding>
          <img src='/images/E/a.png' />
        </ImgPadding>

        <ImgPadding>
          <img src='/images/E/d.png' />
        </ImgPadding>
      </Footer>

      {case_list.map((e, i) => <LoadImage key={i} src={`/images/A/${e.src}.png`} />)}
      {case_quiz2.map((e, i) => <LoadImage key={i} src={`/images/D/${e.src}.png`} />)}
      {people_list.map((e, i) => <LoadImage key={i} src={`/images/F/${e.src}.png`} />)}

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
width: 33.3%;
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
width: 60%;
margin: auto;
margin-top: 16px;
`

const Center = styled.div`
width: 100%;
display: flex;
justify-content: center;
`

const Button = styled.div`
background: #F3A968;
color: #fff;
padding: 8px 12px;
width: 120px;
text-align: center;
border-radius: 16px;
cursor: pointer;

${({ disabled }: ButtonProps) => `${disabled && 'background: #BABABA;' || ''}`}
`

const Input = styled.input`
border-radius: 16px;
border: 3px solid #E8BC75;
text-align:center;
font-size: 18px;
color: #E8BC75;
padding: 6px;
outline: 0;
-webkit-appearance: none;

&::placeholder {
  color: #E8BC75;
}

`

const Error = styled.div`
font-size: 14px;
color: #EF5350;
height: 45px;
padding-top: 6px;
`

const Description = styled.div`
color: #868686;
font-size: 14px;
letter-spacing: .2px;
margin-top: 16px;
margin-bottom: 16px;
`

const Footer = styled.div`
padding: 16px 8%;

img { width: 90%; }

`

const ImgPadding = styled.div`
width: 50%;
display: inline-block;

&:nth-child(2) img {
  margin-bottom: 14px;
}

`

export default IndexPage