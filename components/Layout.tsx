import { ReactNode } from 'react'

import styled from '@emotion/styled'

type Props = {
  children?: ReactNode
}

const IndexPage = ({ children }: Props) => {

  return (
    <Container>

      <Body>
        <Content>{children}</Content>

      </Body>

    </Container>
  )

}

const Container = styled.div`
`

const Body = styled.div`
width: 100%;
height: 100vh;
max-width: 640px;
margin: auto;
background: #F2F2F2;
box-sizing: border-box;
`

const Content = styled.div`
padding: 6px 6px;
`

export default IndexPage
