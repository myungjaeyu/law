import { ReactNode, useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'

import { useSelector } from 'react-redux'

type Props = {
    children?: ReactNode
}

const IndexPage = ({ children }: Props) => {


    const { incidentId } = useSelector((state: any) => ({
        incidentId: state.control.data.incidentId
    }))

    const contentEl = useRef(null)
    const [height, setHeight] = useState(0)

    const handleResize = () => {

        setTimeout(() => {
            setHeight(contentEl.current.clientHeight)
        }, 200)

    }

    useEffect(() => {

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener("resize", handleResize)

    }, [contentEl])

    useEffect(() => {

        handleResize()

    }, [incidentId])

    return (
        <Container height={height}>
            <Content ref={contentEl}>
                {children}
            </Content>
        </Container>
    )

}

type ContainerProps = {
    height: number
}
const Container = styled.div`
position: relative;
height: ${({ height }: ContainerProps) => height}px;
`

const Content = styled.div`
position: fixed;
width: 100%;
background: #F2F2F2;
max-width: 640px;
z-index: 3;
`

export default IndexPage

