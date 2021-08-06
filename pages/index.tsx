import { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import Confirm from '../components/Confirm'
import { useRouter } from 'next/dist/client/router'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '18px',
    width: '80%',
    maxWidth: '250px'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
}

const IndexPage = () => {

  const router = useRouter()

  const [opendModal, setOpendModal] = useState(false);

  const handleOk = useCallback(() => {

    setOpendModal(false)

    router.push('/info/2')

  }, [router, opendModal])

  const handleCancel = useCallback(() => {

    setOpendModal(false)

  }, [opendModal])

  const handleNextPage = useCallback(() => {

    setOpendModal(true)

  }, [])

  return (
    <div>

      <Center>
        <MainLogo src='/images/E_기타_이미지/Logo.png' />
      </Center>

      <Center>
        <Button onClick={handleNextPage}>시작하기</Button>
      </Center>

      <Confirm
        opend={opendModal}
        text='지금부터 당신을 디지털 시민법정 판사로 임명합니다. 다양한 디지털 범죄를 판결해보세요'
        onOk={handleOk}
        onCancel={handleCancel}
      />

      <Footer>
        <ImgPadding>
          <img src='/images/E_기타_이미지/방송통신위원회.png' />
        </ImgPadding>

        <ImgPadding>
          <img src='/images/E_기타_이미지/한국정보화진흥원.png' />
        </ImgPadding>
      </Footer>

    </div>
  )
}

const MainLogo = styled.img`
      width: 80%;
      margin: auto;
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

      margin: 32px 0;
      `

const Description = styled.div`
color: #868686;
font-size: 14px;
letter-spacing: .2px;
`

const ButtonGroup = styled.div`
display: flex;
margin-top: 16px;
`

const ModalButton = styled.div`
text-align: center;
width: 50%;
cursor: pointer;

&:nth-child(1) {
  border-right: 1px solid rgba(0,0,0,.1);
}
`

const Footer = styled.div`
padding: 16px 8%;

img {width: 90%; }

`

const ImgPadding = styled.div`
width: 50%;
display: inline-block;

&:nth-child(2) img { margin-bottom: 14px; }
`

export default IndexPage