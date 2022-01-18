const colors = [ "#8AD68E", "#53B7B9", "#0C5456" ];

const theme = {
    axis: {
        legend: {
            textColor: "#eee",
            fontSize: "10px",
            tickColor: "#eee",
        }
    },
    grid: {
        line: {
            stroke: "#C5C5C5",
            strokeDasharray: 10,
        },
    },
    labels:{
        text: {
            fill: "#dedede", 
            fontSize: 11, fontFamily: "Roboto, sans-serif", color: "#dedede"
        }
    }
};

export {colors, theme};