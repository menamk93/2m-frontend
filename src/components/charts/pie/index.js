import React from 'react';
import {ResponsivePie}  from '@nivo/pie'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {styles, margin, colors} from './styles';


const MyResponsivePie = ({ data,total }) => (
    <div style={styles.root}>
        <Grid style={styles.overlay}>
            <Grid item >
                <Typography style={styles.insideGrid}>{total}</Typography>
            </Grid>
        </Grid>
        <ResponsivePie
            data={data}
            margin={margin}
            sortByValue={true}
            innerRadius={0.75}
            colors={ colors }
            borderColor={{ from: 'color' }}
            enableRadialLabels={false}
            enableSlicesLabels={false}
            slicesLabelsSkipAngle={0}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    translateX: 100,
                    itemWidth: 60,
                    itemHeight: 16,
                    itemsSpacing: 15,
                    itemTextColor: '#999',
                    itemFontFamily: 'hind',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
)

export default (MyResponsivePie);