import { ReactNode } from 'react'

import styled from '@emotion/styled'

type Props = {
    name?: string
    type?: string
    onClick?: (e) => void
}

const IndexPage = ({ name, type, onClick }: Props) => {

    return (
        <Switch>
            <input name={name || ''} type={type || 'radio'} onClick={onClick ? onClick : null} />
            <span></span>
        </Switch>
    )

}

const Switch = styled.label`
position: relative;
display: inline-block;
width: 64px;
height: 34px;

input { 
    opacity: 0;
    width: 0;
    height: 0;
}

span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border: 2px solid #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
}
  
span:before {
    position: absolute;
    content: "";
    height: 27px;
    width: 27px;
    left: -2px;
    background-color: white;
    border: 2px solid #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
}

input:checked + span {
    background-color: #9BC802;
}

input:focus + span {
box-shadow: 0 0 1px #9BC802;
}

input:checked + span:before {
-webkit-transform: translateX(26px);
-ms-transform: translateX(26px);
transform: translateX(26px);
}
`

export default IndexPage
