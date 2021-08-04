import styled from '@emotion/styled'

import Switch from './Switch'

type Props = {
    title: string
    description: string
    name: string
    type: string
    onClick: (e: any) => void
}

const IndexPage = ({ title, description, name, type, onClick }: Props) => {

    return (
        <Container>

            <Option>
                <OptionText>
                    <OptionTitle>{title}</OptionTitle>
                    <OptionDescription>{description}</OptionDescription>

                </OptionText>
                <OptionSwitchBox>
                    <Switch
                        name={name}
                        type={type}
                        onClick={onClick}
                    />
                </OptionSwitchBox>
            </Option>

        </Container>
    )

}

const Container = styled.div`
padding: 8px 16px;

border-top: 1px solid rgba(0,0,0,0.08);
`

const Option = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`

const OptionText = styled.div``

const OptionTitle = styled.div`
font-size: 18px;
font-weight: 700;
margin-bottom: 6px;
`

const OptionDescription = styled.div`
font-size: 16px;
color: #565656;
`

const OptionSwitchBox = styled.div``


export default IndexPage
