import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

import { colors, theme } from './styles';

const MyResponsiveBar = ({ data }) => (

    <ResponsiveBar
        data={data}
        keys={['Responsável Técnico','Administrador 1','Administrador 2',]}
        indexBy="Mês"
        margin={{ top: 5, right: 50, bottom: 50, left: 60 }}
        padding={0.93}
        innerPadding={2}
        colors={colors}
        theme={theme}
        gridYValues={3}
        defs={[
            {
                id: 'dots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderRadius={3}
        borderColor={{ theme: 'grid.line.stroke' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
        }}
        axisLeft={{
            tickSize: 0,
            tickValues: 3,
            tickPadding: 9,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -60
        }}
        enableLabel={false}
        labelSkipWidth={22}
        labelSkipHeight={22}
        labelTextColor={'#9D9D9C'}
        animate={true}
        motionStiffness={80}
        motionDamping={15}
    />

)

export default MyResponsiveBar;
