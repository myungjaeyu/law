import { ReactNode, useEffect, useRef, useState } from 'react'

import styled from '@emotion/styled'

type Props = {
    children?: ReactNode
}

const IndexPage = ({ children }: Props) => {

    const contentEl = useRef(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {

        const handleResize = () => {

            setHeight(contentEl.current.clientHeight)

        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener("resize", handleResize)

    }, [contentEl])

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
max-width: 640px;
z-index: 3;
`

export default IndexPage

