// @ts-ignore
import React, { useContext, useMemo } from 'react'
import { ThemeContext } from 'styled-components'
import { keyBy } from 'lodash'
import { ResponsiveMarimekko, CustomLayerProps } from '@nivo/marimekko'
import { useTheme } from '@nivo/core'
// @ts-ignore
import { keys } from 'core/constants'
// @ts-ignore
import { useI18n } from 'core/i18n/i18nContext'
import { ToolsExperienceMarimekkoToolData } from './types'

export const MARGIN = {
    top: 40,
    bottom: 40,
    left: 160,
}
export const ROW_HEIGHT = 40

/**
 * Create a map of tool experience keys for easier access.
 */
const experienceKeys = keyBy(keys.tools.keys, 'id')

/**
 * In order to create a diverging chart (<– negative | positive –>),
 * we have to use negative and positive values, that's why we're using
 * this formatter, also to add a `%` sign to values.
 */
const valueFormatter = (value: number) => `${Math.abs(Math.round(value))}%`

/**
 * Add a shadow behind each tool bars.
 */
const ShadowsLayer = ({ data }: CustomLayerProps<ToolsExperienceMarimekkoToolData>) => {
    return null
}

/**
 * Extra layer to add tool names.
 */
const ToolsLabels = ({ data }: CustomLayerProps<ToolsExperienceMarimekkoToolData>) => {
    const theme = useTheme()

    return (
        <g>
            {data.map((datum) => (
                <g key={datum.id} transform={`translate(-160, ${datum.y + datum.height / 2})`}>
                    <text style={theme.axis.ticks.text}>{datum.id}</text>
                </g>
            ))}
        </g>
    )
}

interface ToolsExperienceMarimekkoChartProps {
    data: ToolsExperienceMarimekkoToolData[]
}

export const ToolsExperienceMarimekkoChart = (props: ToolsExperienceMarimekkoChartProps) => {
    const { translate } = useI18n()

    const dimensions = useMemo(
        () => [
            {
                id: translate(experienceKeys.not_interested.label),
                value: experienceKeys.not_interested.id,
            },
            {
                id: translate(experienceKeys.would_not_use.label),
                value: experienceKeys.would_not_use.id,
            },
            {
                id: translate(experienceKeys.interested.label),
                value: experienceKeys.interested.id,
            },
            {
                id: translate(experienceKeys.would_use.label),
                value: experienceKeys.would_use.id,
            },
        ],
        [translate]
    )

    const theme = useContext(ThemeContext) as any

    const colors = useMemo(
        () => [
            theme.colors.ranges.tools.not_interested,
            theme.colors.ranges.tools.would_not_use,
            theme.colors.ranges.tools.interested,
            theme.colors.ranges.tools.would_use,
        ],
        [theme]
    )

    return (
        <ResponsiveMarimekko<ToolsExperienceMarimekkoToolData>
            margin={MARGIN}
            axisTop={{
                format: valueFormatter,
            }}
            axisBottom={{
                format: valueFormatter,
            }}
            id="tool"
            value="awareness"
            valueFormat={valueFormatter}
            data={props.data}
            dimensions={dimensions}
            theme={theme.charts}
            colors={colors}
            enableGridX
            enableGridY={false}
            offset="diverging"
            layout="horizontal"
            animate={false}
            innerPadding={3}
            layers={['grid', 'axes', ShadowsLayer, ToolsLabels, 'bars']}
        />
    )
}
