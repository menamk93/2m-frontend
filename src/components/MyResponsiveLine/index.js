import React from 'react';
import { withStyles } from '@material-ui/core';
import { ResponsiveLine } from '@nivo/line';
import styles from './styles';

const defaultData  = [
  {
    id: "input",
    data: [

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
const gradProps = {
  gradientUnits: 'userSpaceOnUse',
  x1: '0',
  y1: '0',
  x2: '0',
  y2:  '340',
};

const MyResponsiveLine = ({data, limiar, measure, dateInterval}) => {
  
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
    <>
    <ResponsiveLine
      series={{'color':'red'}}
      data={ data }  
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{ type: 'basis', min: 0, max: 'auto', stacked: true, reverse: false }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: format,
        tickValues: period,
        legendOffset: -12,
      }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d %H:%M:%S',
        precision: 'minute',
      }}
      xFormat="time:%Y-%m-%d %H:%M:%S"
      yScale={{
          type: 'linear',
          stacked: false
      }}
      axisLeft={{
          orient: 'left',
          tickSize: 0,
          tickPadding: 15,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
          tickValues: 8, 
      }}
     
      markers={[
      {   
          axis: 'y',
          value: limiar,
          lineStyle: { stroke: '#0C5456', strokeDasharray: '6, 3', strokeWidth: 1, },
          legend: 'Limite',
          legendPosition:'right',
          legendOrientation: 'horizontal',
      }
    ]}
      enableGridX={false}
      enableGridY={false}
      colors={['#53B7B9']}
      lineWidth={3}
      enablePoints={true}
      pointSize={20}
      pointColor={'transparent'}
      pointBorderWidth={0}
      pointBorderColor={{ from: 'serieColor' }}
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
              <div style={{color:'white'}}>{point.data.y}{measure}</div>
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
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={1}
      useMesh={true}
      layers={['grid' , 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends','markers']}
      enableCrosshair
      
  />
  <svg>
      <defs>
        <linearGradient id="someGradientId" {...gradProps} >
          <stop offset="1%" stopColor="#53B7B9" />
          <stop offset="100%" stopColor="#fff" />
        </linearGradient>
      </defs>
    </svg>
  </>
  )
}

MyResponsiveLine.defaultProps = {
    limiar: 2,
    legend: '',
    data: defaultData,
    measure: '%',
    dateInterval: 'today',
}

const theme = {
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


export default withStyles(styles)(MyResponsiveLine);