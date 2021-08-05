import { ReactNode } from 'react'

import { Collapse } from 'react-collapse'

import styled from '@emotion/styled'

type Props = {
    title: string
    children?: ReactNode
    checked?: boolean
    opend?: boolean
    onOpen?: () => void
}

const IndexPage = ({ title, children, checked, opend, onOpen }: Props) => {

    return (
        <div>
            <Header checked={checked} onClick={onOpen}>
                <Title>{title}</Title>
                {onOpen && <IconBox>
                    <Icon src={`/icons/angle-${opend ? 'down' : 'left'}-solid_${checked ? 'w' : 'g'}.svg`}></Icon>
                </IconBox>}
            </Header>

            <Collapse isOpened={opend}>

                {children}
            </Collapse>
        </div>
    )

}

type HeaderProps = {
    checked?: boolean
}

const Header = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 18px;
padding: 6px 16px;
border-top: 1.5px solid #F1F1F1;
background: #fff;
color: #000;
cursor: pointer;

${({ checked }: HeaderProps) => checked ? 'border-top: 1.5px solid #9BC802; background: #9BC802; color: #fff;' : ''}
`
const Title = styled.div`
font-weight: 700;
`
const IconBox = styled.div``
const Icon = styled.img`
width: 25px;
height: 25px;
`

export default IndexPage
