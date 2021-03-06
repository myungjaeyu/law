import styled from '@emotion/styled'
import Modal from 'react-modal'

type Props = {
    opend: boolean
    text: string
    onOk: (e) => void
    onCancel: (e) => void
    okText?: string
    cancelText?: string
}

const IndexPage = ({ opend, text, onOk, onCancel, okText, cancelText }: Props) => {

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
            maxWidth: '250px',
            paddingBottom: '0'
        },
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: '3'
        }
    }

    return (
        <Modal
            isOpen={opend}
            onRequestClose={onCancel}
            style={customStyles}
        >
            <Description>
                {text}
            </Description>

            <ButtonGroup>
                <ModalButton onClick={onCancel}>
                    {cancelText || '취소'}
                </ModalButton>
                <ModalButton onClick={onOk}>
                    {okText || '확인'}
                </ModalButton>
            </ButtonGroup>
        </Modal>
    )

}

const Description = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: #868686;
font-size: 14px;
text-align: center;
letter-spacing: .2px;
min-height: 45px;
white-space: pre-wrap;
word-wrap: break-word;
`

const ButtonGroup = styled.div`
display: flex;
justify-content: center;
margin-top: 16px;
border-top: 1px solid rgba(0,0,0,.1)
`

const ModalButton = styled.div`
text-align: center;
width: 50%;
cursor: pointer;
padding-top: 8px;
padding-bottom: 14px;

&:nth-child(1) {
    border-right: 1px solid rgba(0,0,0,.1);
}
`

export default IndexPage
