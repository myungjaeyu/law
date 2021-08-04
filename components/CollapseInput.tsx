import styled from '@emotion/styled'

type Props = {
    placeholder: string
    onChange: (e) => void
}

const IndexPage = ({ placeholder, onChange }: Props) => {

    return (
        <Container>

            <Option>
                <OptionText>
                    <OptionIcon src='/icons/check-circle-regular.svg' />
                </OptionText>
                <OptionInputBox>
                    <Input placeholder={placeholder} onChange={onChange} />
                </OptionInputBox>
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

const OptionInputBox = styled.div`
width: 90%;
margin-left: 4px;
`

const Input = styled.input`
width: 100%;
padding: 8px;
color: #565656;
background: #D8D8D8;
border-radius: 12px;
border: 1px solid #D8D8D8;
outline: none;
font-size: 16px;

&::placeholder {
    color: #a2a2a2;
}
`


export default IndexPage
