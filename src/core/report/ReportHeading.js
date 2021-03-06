import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { mq, spacing, fontSize, fontWeight, color } from 'core/theme'
import { bigElements, smallElements } from 'core/components/LogoElements'
import sampleSize from 'lodash/sampleSize'
import sample from 'lodash/sample'
import random from 'lodash/random'
import { useInView } from 'react-intersection-observer'
import colors from 'core/theme/colors'

const buffer = 0.2
const bufferPercent = buffer * 100

export function useForceUpdate() {
    const [, setTick] = useState(0)
    const update = useCallback(() => {
        setTick((tick) => tick + 1)
    }, [])
    return update
}

export default ({ children }) => {
    const [part1, part2] = children.split('|')

    const forceUpdate = useForceUpdate()

    const { ref, inView, entry } = useInView({
        /* Optional options */
        rootMargin: `-${bufferPercent}% 0% -${bufferPercent}% 0%`,
        threshold: 0,
        triggerOnce: true,
    })

    return (
        <Heading
            className="Heading Logo__Container"
            onClick={() => {
                forceUpdate()
            }}
        >
            <LogoElements className="LogoElements">
                {sampleSize(bigElements, 2).map((Component, i) => (
                    <LogoElementWrapperBig
                        className="Logo__Element__Wrapper"
                        key={i}
                        scale={random(0.6, 0.8)}
                        top={random(0, 30)}
                        left={random(45, 50)}
                    >
                        <Component
                            animated={true}
                            triggerAnimation={inView}
                            delay={300 + i * 300}
                        />
                    </LogoElementWrapperBig>
                ))}
                {sampleSize(smallElements, 1).map((Component, i) => (
                    <LogoElementWrapperSmall
                        className="Logo__Element__Wrapper"
                        key={i}
                        scale={random(0.8, 1.2)}
                        top={sample([random(10, 30), random(60, 80)])}
                        left={random(40, 50)}
                    >
                        <Component
                            animated={true}
                            triggerAnimation={inView}
                            delay={900 + i * 300}
                        />
                    </LogoElementWrapperSmall>
                ))}
            </LogoElements>
            <HeadingContents className="LogoContents" ref={ref}>
                <Part1>{part1.trim()}</Part1> <Part2>{part2.trim()}</Part2>
            </HeadingContents>
        </Heading>
    )
}

const Heading = styled.h2`
    text-align: center;
    width: 100vw;
    font-weight: ${fontWeight('bold')};
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    overflow-y: visible !important;
    @media ${mq.small} {
        font-size: 2.4rem;
        margin: ${spacing(1)} 0;
        margin-left: calc(50% - 50vw);
        padding: 0 ${spacing()};
    }
    @media ${mq.mediumLarge} {
        font-size: ${fontSize('huge')};
        margin: ${spacing(4)} 0;
        margin-left: calc(50% - 50vw);
        padding: 0 ${spacing(2)};
    }
`

const LogoElements = styled.div`
    @media ${mq.small} {
        display: none;
    }
    /* position: absolute !important; */
    /* opacity: 0.7; */
`

const LogoElementWrapper = styled.div`
    transform: scale(${({ scale }) => scale});
    top: ${({ top }) => top}%;
    left: ${({ left }) => left}%;
    position: absolute;
    .tilde {
        color: ${colors.pink};
    }
    .stripe,
    .blob {
        background: ${colors.pink};
    }
`

const LogoElementWrapperBig = styled(LogoElementWrapper)``
const LogoElementWrapperSmall = styled(LogoElementWrapper)`
    /* z-index: 2; */
`

const HeadingContents = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
    z-index: 1;
    position: relative;
    @media ${mq.mediumLarge} {
        cursor: pointer;
    }
`

const Part = styled.span`
    /* color: ${color('link')}; */
    /* color: ${colors.blue}; */

    text-shadow: 4px 4px 0px ${colors.blue};
    /* display: block; */
    /* padding: 5px 15px; */
    /* line-height: 1; */
    /* position: relative; */
    /* background: ${colors.pink}; */
`

const Part1 = styled(Part)`
    @media ${mq.mediumLarge} {
        margin-bottom: ${spacing()};
    }
    /* left: -${spacing(6)}; */
`

const Part2 = styled(Part)`
    /* right: -${spacing(6)}; */
`
