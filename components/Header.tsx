import styled from '@emotion/styled'
import Link from 'next/link'
import { media } from '../config/styles'

type Props = {
    link: string
}

const IndexPage = ({ link }: Props) => {

    return (
        <Container>
            <ItemPadding>
                <Link passHref href={link}>
                    <BackIcon src='/icons/angle-left-solid_w.svg' />
                </Link>
            </ItemPadding>
            <ItemPadding>
                <TitleBox>
                    <Title>상태 메시지</Title>

                </TitleBox>
            </ItemPadding>
            <ItemPadding />

        </Container>
    )

}

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 45px;
margin-bottom: 16px;
margin: auto;
background: #504D5D;
color: #fff;

${media.phone} {
    height: 65px;
}
`

const ItemPadding = styled.div`
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
font-weight: 700;
`

const BackIcon = styled.img`
width: 16px;
cursor: pointer;
padding-left: 16px;
`

export default IndexPage
