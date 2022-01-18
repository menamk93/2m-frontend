import React, { useEffect }  from 'react';
import { ResponsiveLine  } from '@nivo/line';
import { withStyles } from '@material-ui/core';
import styles from './styles';


const dataDefault  = [
  {
    "data": [
      {x: "2020-03-23 09:56:42", y: "0"},
      {x: "2020-03-23 09:56:45", y: "0"},
      {x: "2020-03-23 10:05:50", y: "0"},
      {x: "2020-03-23 10:10:54", y: "0"},
      {x: "2020-03-23 11:56:54", y: "0"},
      {x: "2020-03-23 12:56:54", y: "0"},
      {x: "2020-03-23 13:56:54", y: "0"},
    ]
  }
]
const MyResponsiveLine = ({data, limiar, legend, dateInterval }) => {

  const [period, setPeriod] = React.useState('every 2 hour');
  const [format, setFormat] = React.useState('%b %d - %H:%MH');

  React.useEffect(() => {
    handleChangeInterval(dateInterval)
  },[dateInterval]);
  const handleChangeInterval = (value) => {
    if(value == 'today'){
      setPeriod('every 2 hour');
      setFormat('%H:%M');
    }
    else if(value == 'threeDays'){
      setPeriod('every 1 day');
      setFormat('%b %d');
    }
    else {
      setPeriod('every 1 day');
      setFormat('%b %d');
    }
  }

  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ 
          type: 'time',
          format: '%Y-%m-%d %H:%M:%S',
          precision: 'minute',
        }}
        yScale={{ type: 'linear', min: 0, max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        yFormat={{}}
        xFormat="time:%Y-%m-%d %H:%M:%S"
        axisBottom={{
            orient: 'bottom',
            tickSize: 0,
            tickPadding: 15,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle',
            format: format,
            tickValues: period,
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 0,
            tickPadding: 18,
            tickRotation: 0,
            legend: legend,
            legendOffset: -51,
            legendPosition: 'middle',
            tickValues: 5, 
        }}
        markers={[
            {   
                axis: 'y',
                value: limiar,
                lineStyle: { stroke: '#9D9D9C', strokeDasharray: '6, 3', strokeWidth: 1, },
                legend: 'Ideal',
                legendPosition:'right',
                legendOrientation: 'horizontal',
            },
            {
                axis: 'y',
                value: 0,
                lineStyle: { stroke: '#9D9D9C', strokeWidth: 1 },
                legend: '',
                legendOrientation: 'vertical',
            },
        ]}
        
        enableGridX={false}
        enableGridY={false}
        colors={['#0C5456']}
        enablePoints={false}
        pointSize={10}
        pointBorderWidth={1}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        areaBlendMode="multiply"
        areaBaselineValue={200}
        areaOpacity={0}
        useMesh={true}
        sliceTooltip
        tooltip={({ point }) => {
          return (
            <div >
              <div
                  style={{
                      background: '#0C5456',
                      padding: '9px 12px',
                      borderRadius: '3px'
                  }}
              >
                <div style={{color:'white'}}>{point.data.y} {legend}</div>
              </div>
              <div style={{
                  margin:'auto',
                  justifySelf:'center',
                  width: 0,
                  height: 0,
                  borderWidth:10,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '10px solid #0C5456',
                
                }} ></div>
            </div>
          )
         }}
        theme={theme}
    />
  )
}

MyResponsiveLine.defaultProps = {
    limiar: 50,
    legend: '',
    data: dataDefault,
    dateInterval: 'today',
}

const theme = {
  background: '#fff',
  axis: {
    fontSize: "12px",
    ticks: {
      line: {
        stroke: "#555555"
      },
      text: {
        fill: "#9D9D9C"
      }
    },
    legend: {
      text: {
        fill: "#0C5456",
        fontFamily: 'hind',
        fontWeight: '500',
        
      }
    }
  },
};


export default withStyles(styles)(MyResponsiveLine)