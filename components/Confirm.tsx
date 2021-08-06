import styled from '@emotion/styled'
import Modal from 'react-modal'

type Props = {
    opend: boolean
    text: string
    onOk: (e) => void
    onCancel: (e) => void
}

const IndexPage = ({ opend, text, onOk, onCancel }: Props) => {

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
                    취소
                </ModalButton>
                <ModalButton onClick={onOk}>
                    확인
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
letter-spacing: .2px;
min-height: 45px;
`

const ButtonGroup = styled.div`
display: flex;
justify-content: center;
margin-top: 16px;
padding-top: 8px;
border-top: 1px solid rgba(0,0,0,.1)
`

const ModalButton = styled.div`
text-align: center;
width: 50%;
cursor: pointer;

&:nth-child(1) {
    border-right: 1px solid rgba(0,0,0,.1);
}
`

export default IndexPage
