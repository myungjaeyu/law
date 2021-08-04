import styled from '@emotion/styled'

import Switch from './Switch'

type Props = {
    title: string
    name: string
    type: string
    onClick: (e: any) => void
}

const IndexPage = ({ title, name, type, onClick }: Props) => {

    return (
        <Container>

            <Option>
                <OptionText>
                    <OptionIcon src='/icons/check-circle-regular.svg' /> {title}
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

const OptionIcon = styled.img`
display: inline-block;
width: 18px;
`

const OptionText = styled.div`
color: #565656;
font-size: 18px;
`

const OptionSwitchBox = styled.div``


export default IndexPage
